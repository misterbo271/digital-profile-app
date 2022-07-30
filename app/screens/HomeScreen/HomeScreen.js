import React from 'react';
import {CBAvatar, CBContainer, CBIcon, CBText, CBView} from 'components';
import {appStyles} from 'configs/styles';

import Base from 'screens/Base';
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import colors from "configs/colors";
import IdentifyIcon from "screens/Profile/images/identifyIcon";
import dimens from "configs/dimens";
import {NotificationItem, NotificationSkeleton} from "screens/manage/item/NotificationItem";

const dataTest = [
    {"type" : "KeyNoti", "header": "Key Added", "message": "You added @bku key on 24/12/2000", "isRead": false },
    {"type" : "KeyClaim", "header": "Claim Added", "message": "You added @bku claim on 24/12/2000", "isRead": true },
    {"type" : "KeyClaim", "header": "Claim Added", "message": "You added @bku claim on 24/12/2000", "isRead": false },
    {"type" : "KeyNoti", "header": "Key Added", "message": "You added @bku key on 24/12/2000", "isRead": false }
]

export default class HomeScreen extends Base {

    renderEmployeeItem = ({item, index}) => {
        //const {loading} = EmployeeStore;
        const NotificationComp = NotificationItem;
        return <NotificationComp key={index} index={index} notification={item}/>;
    };

    render() {
        return (
            <CBContainer style={appStyles.container_profile}>
                <TouchableOpacity
                    style={{marginTop: 15}}
                    //onPress={this.onLoginNow}
                >
                    <View style={[appStyles.userInfo]}>
                        <View style={appStyles.mid}>
                                <Text style={[appStyles.fullName, {fontSize: dimens.xxxLargeText, marginTop: 5}]}>
                                    Good Morning!
                                </Text>

                            <View style={appStyles.subInformationContainer}>
                            </View>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <CBAvatar
                                size={81}
                                source={require('../../assets/images/avatar.png')}
                                containerStyle={{ borderRadius: 30}}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                <CBView style={{flex: 1, marginTop: 5}} define={'none'}>
                        <FlatList
                            style={{flex: 1}}
                            contentContainerStyle={{padding: 15}}
                            showsVerticalScrollIndicator={false}
                            keyboardDismissMode={'on-drag'}
                            keyboardShouldPersistTaps={'always'}
                            //refreshing={refreshing}
                            data={dataTest}
                            renderItem={this.renderEmployeeItem}
                            ItemSeparatorComponent={this.renderSeparator}
                            keyExtractor={this.keyExtractor}
                            onRefresh={this.onRefresh}
                        />
                </CBView>


            </CBContainer>
        );
    }
}
