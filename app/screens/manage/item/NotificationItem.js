import React, {useState, useRef} from 'react';
import {Animated} from 'react-native';
import {CBBadge, CBIcon, CBSkeleton, CBText, CBTouchableOpacity, CBView} from 'components';
import DateUtil from 'utils/DateUtil';
import CBUtil from 'utils/CBUtil';
import HTMLView from 'react-native-htmlview';
import {useTheme} from 'react-native-elements';
import {Swipeable} from 'react-native-gesture-handler';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import colors from "configs/colors";

const NotificationItem = React.memo(({index, notification, onPress}) => {
    const {theme} = useTheme();
    const htmlStyles = helpers('html', theme.colors.scheme);
    //const obj = CBUtil.convertNotificationType(notification?.type);

    const {title, sender, subject} = notification

    const swipeRight = (progress,dragX) =>{
        const scale = dragX.interpolate({
            inputRange:[-200,0],
            outputRange:[1,0.5],
            extrapolate:'clamp'
        })
        return(
            <Animated.View style={{backgroundColor: colors.badgeDarkColor, width:"35%", justifyContent:'center'}}>
                <CBIcon type={'ionicon'} name={'trash-outline'} color={'#FFFFFF'} size={28}/>
            </Animated.View>
        )
    }

    return (
        <Swipeable renderRightActions={swipeRight} rightThreshold={-200}>
            <Animated.View style={{flex:1, flexDirection:'row', alignItems:'center',backgroundColor:'white'}}>
                <CBTouchableOpacity key={index} style={[appStyles.item, {alignItems: 'flex-start'}]} define={'none'} onPress={onPress}>
                    {/*<CBView style={[appStyles.action, {borderRadius: 15, backgroundColor: theme.colors.accent}]} define={'none'}>*/}
                    {/*    <CBIcon type={'ionicon'} name={obj?.name} color={theme.colors.primary} size={20}/>*/}
                    {/*</CBView>*/}
                    <CBView style={{flex: 1, marginLeft: 15}} define={'none'}>
                        <CBText style={[appStyles.title, {marginTop: 5}]} define={'title'} numberOfLines={1} ellipsizeMode={'tail'}>{notification?.header}</CBText>
                        <HTMLView
                            style={{marginTop: 5}}
                            stylesheet={htmlStyles}
                            textComponentProps={{style: htmlStyles.p}}
                            value={`<p>${notification?.message}</p>`}
                        />
                        <CBView style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5}}>
                            <CBIcon type={'ionicon'} name={'ellipse'} color={notification?.isRead ? colors.blue : colors.red} size={6}/>
                        </CBView>
                    </CBView>
                    {/*{!notification?.isRead ? <CBBadge containerStyle={{position: 'absolute', top: 15, left: 15}} status={'error'}/> : null}*/}
                </CBTouchableOpacity>
            </Animated.View>
        </Swipeable>
    );
});

const NotificationSkeleton = React.memo(({index}) => {
    return (
        <CBSkeleton key={index} style={[{padding: 15}, {alignItems: 'flex-start'}]}>
            <CBView style={{position: 'absolute', top: 15, left: 15, width: 40, height: 40, borderRadius: 15}} define={'none'}/>
            <CBView style={{position: 'absolute', top: 15, right: 15, width: '20%', height: 10, borderRadius: 5, marginLeft: 35}} define={'none'}/>
            <CBView style={{width: '40%', height: 10, borderRadius: 5, marginLeft: 50}} define={'none'}/>
            <CBView style={{width: '60%', height: 20, borderRadius: 10, marginTop: 10, marginLeft: 50}} define={'none'}/>
            <CBView style={{width: '80%', height: 10, borderRadius: 5, marginTop: 10, marginLeft: 50}} define={'none'}/>
            <CBView style={{width: '70%', height: 8, borderRadius: 4, marginTop: 10, marginLeft: 50}} define={'none'}/>
            <CBView style={{width: '60%', height: 8, borderRadius: 4, marginTop: 10, marginLeft: 50}} define={'none'}/>
            <CBView style={{width: '25%', height: 8, borderRadius: 4, marginTop: 10, marginLeft: 50, alignSelf: 'flex-end'}} define={'none'}/>
        </CBSkeleton>
    );
});

export {NotificationItem, NotificationSkeleton};
