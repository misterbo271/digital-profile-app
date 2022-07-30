import React from 'react';
import {View} from 'react-native';
import {
    CBIcon,
    CBShadow,
    CBSkeleton,
    CBText,
    CBTouchableOpacity,
    CBView
} from 'components';
import {appStyles} from 'configs/styles';
import colors from "configs/colors";

const NotificationItem = React.memo(({index, notification, onPress, onPressPopup}) => {
    return (
        <CBShadow key={index} style={{backgroundColor: colors.white}}>
            <CBTouchableOpacity style={{padding: 15}} define={'none'}>
                <CBView key={index} define={'none'}>
                    <CBView style={[appStyles.item, {padding: 0, marginTop: 10}]} define={'none'}>
                        <CBText>{notification?.header}</CBText>
                    </CBView>
                    <CBView style={[appStyles.item, {padding: 0, marginTop: 10}]} define={'none'}>
                        <CBText>{notification?.message}</CBText>
                    </CBView>
                </CBView>
            </CBTouchableOpacity>
        </CBShadow>
    );
});

const NotificationSkeleton = React.memo(({index}) => {
    return (
        <CBShadow key={index} style={{backgroundColor: colors.white}}>
            <CBSkeleton style={{padding: 15}}>
                <View style={{width: '25%', height: 10, borderRadius: 4, marginTop: 10}}/>
                <View style={{width: '50%', height: 10, borderRadius: 10, marginTop: 15}}/>
                <View style={{width: '80%', height: 8, borderRadius: 10, marginTop: 15}}/>
                <View style={{width: '80%', height: 8, borderRadius: 10, marginTop: 15}}/>
                <View style={{width: 30, height: 30, borderRadius: 15, position: 'absolute', top: 10, right: 50}}/>
            </CBSkeleton>
        </CBShadow>
    );
});

export {NotificationItem, NotificationSkeleton};
