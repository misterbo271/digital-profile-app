import React from 'react';
import {useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CBIcon, CBTouchableOpacity, CBView} from 'components';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import dimens from 'configs/dimens';

import HomeScreen from 'screens/HomeScreen/HomeScreen';
import Course from 'screens/CourseScreen/Course';
import QRScan from 'screens/QRScan/QRScan';
import Certification from 'screens/Certification/Certification';
import Profile from 'screens/Profile/Profile';
import Login from 'screens/login/Login';

const Tab = createBottomTabNavigator();
const Home = () => {
    const scheme = useColorScheme();
    const shadowStyle = helpers('shadow', scheme);
    const backgroundColor = helpers('background', scheme);
    const primaryColor = helpers('primary', scheme);
    const iconColor = helpers('icon', scheme);
    const renderTabBarIcon = (name) => ({focused}) => {
        return (
            <CBView style={{position: 'absolute', top: 15}} define={'none'}>
                <CBIcon type={'material-community'} name={name} color={focused ? primaryColor : iconColor} size={28}/>
                <CBIcon type={'material-community'} name={'checkbox-blank-circle'} color={focused ? primaryColor : backgroundColor} size={6}/>
            </CBView>
        );
    };
    const renderCenterTabBarIcon = (name) => ({focused}) => {
        return (
            <CBTouchableOpacity style={[{position: 'absolute', top: -8}, {width: 48, height: 48, borderRadius: 22.5, backgroundColor: primaryColor}, {alignItems: 'center', justifyContent: 'center'}]} define={'none'}>
                <CBIcon type={'material-community'} name={name} size={25} color={'#FFFFFF'}/>
            </CBTouchableOpacity>
        );
    };
    return (
        <Tab.Navigator
            initialRouteName={'HomeScreen'}
            screenOptions={{
                lazy: true,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: [appStyles.shadow, shadowStyle, {
                    position: 'absolute',
                    bottom: dimens.bottomSpace,
                    height: 60,
                    backgroundColor: backgroundColor,
                    marginHorizontal: 15,
                    paddingHorizontal: 20,
                    borderTopWidth: 0,
                    borderRadius: 30
                }]
            }}>
            <Tab.Screen name={'HomeScreen'} component={HomeScreen} options={{headerShown: false, tabBarIcon: renderTabBarIcon('home-edit-outline')}}/>
            <Tab.Screen name={'Course'} component={Course} options={{headerShown: false, tabBarIcon: renderTabBarIcon('school-outline')}}/>
            <Tab.Screen name={'QRScan'} component={QRScan} options={{headerShown: false, tabBarIcon: renderCenterTabBarIcon('qrcode-scan')}}/>
            <Tab.Screen name={'Certification'} component={Certification} options={{headerShown: false, tabBarIcon: renderTabBarIcon('certificate-outline')}}/>
            <Tab.Screen name={'Profile'} component={Profile} options={{headerShown: false, tabBarIcon: renderTabBarIcon('account-circle-outline')}}/>
        </Tab.Navigator>
    );
};

export default Home;
