import React from 'react';
import {Platform, useColorScheme, View} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';
import colors from 'configs/colors';
import dimens from 'configs/dimens';

import LoginOrReset from "screens/auth/LoginOrReset";
import Home from 'screens/home/Home';
import Web from 'screens/Web';
import Empty from 'screens/Empty';
import Introduction from 'screens/auth/Introduction';
import LoginOrRegister from 'screens/auth/LoginOrRegister';
import AuthScreen from "screens/auth/AuthScreen";
import WalletSecurity from "screens/auth/WalletSecurity";
import ConfirmPassword from "screens/auth/ConfirmPassword";
import EmailSeedKey from "screens/auth/EmailSeedKey";
import Register from "screens/auth/Register";
import SRPLogin from "screens/auth/SRPLogin";
import Verify from 'screens/auth/Verify';
import ClaimDetail from "screens/ClaimScreen/ClaimDetail";

const Stack = createStackNavigator();
export const UserStack = () => {
    const scheme = useColorScheme();
    const textColor = scheme === 'dark' ? colors.primaryTextDarkColor : colors.primaryTextColor;
    const renderHeaderBackImage = (props) => {
        if (Platform.OS === 'android') {
            return <Ionicons name={'chevron-back-outline'} color={props.tintColor} size={25}/>;
        } else {
            return (
                <View style={[appStyles.action, {marginLeft: 5}]}>
                    <Ionicons name={'chevron-back-outline'} color={props.tintColor} size={25}/>
                </View>
            );
        }
    };
    return (
        <Stack.Navigator
            initialRouteName={'LoginOrReset'}
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                headerBackImage: renderHeaderBackImage,
                headerBackTitleVisible: false,
                headerTitleAllowFontScaling: false,
                headerBackAllowFontScaling: false,
                headerTitleAlign: 'center',
                headerTintColor: textColor,
                headerTitleStyle: {
                    fontSize: dimens.largeText,
                    fontFamily: 'GoogleSans-Regular'
                }
            }}>
            <Stack.Screen name={'LoginOrReset'} component={LoginOrReset} options={{headerShown: false}}/>
            <Stack.Screen name={'Home'} component={Home} options={{headerShown: false}}/>
            <Stack.Screen name={'Web'} component={Web} options={{title: strings('screen_web')}}/>
            <Stack.Screen name={'Empty'} component={Empty} options={{title: strings('screen_empty')}}/>
            <Stack.Screen name={'AuthScreen'} component={AuthScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS, headerShown: false}}/>
            <Stack.Screen name={'Register'} component={Register} options={{headerShown: false}}/>
            <Stack.Screen name={'WalletSecurity'} component={WalletSecurity} options={{headerShown: false}}/>
            <Stack.Screen name={'ConfirmPassword'} component={ConfirmPassword} options={{headerShown: false}}/>
            <Stack.Screen name={'EmailSeedKey'} component={EmailSeedKey} options={{headerShown: false}}/>
            <Stack.Screen name={'SRPLogin'} component={SRPLogin} options={{...TransitionPresets.ModalSlideFromBottomIOS, headerShown: false}}/>
            <Stack.Screen name={'Introduction'} component={Introduction} options={{...TransitionPresets.ModalSlideFromBottomIOS, headerShown: false}}/>
            <Stack.Screen name={'LoginOrRegister'} component={LoginOrRegister} options={{...TransitionPresets.ModalSlideFromBottomIOS, headerShown: false}}/>
            <Stack.Screen name={'Verify'} component={Verify} options={{headerShown: false}}/>
            <Stack.Screen name={'ClaimDetail'} component={ClaimDetail} options={{title: 'Claim Detail'}}/>
        </Stack.Navigator>
    );
};
