import React, {Component} from 'react';
import {Appearance, AppState, Linking, LogBox, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CBCache from 'caches/CBCache';
import CBConfig from 'configs/CBConfig';
import ConfigManager from 'controls/ConfigManager';
import CBNotificationHandler from 'handlers/CBNotificationHandler';
import CBDeeplinkHandler from 'handlers/CBDeeplinkHandler';
import {ThemeProvider} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import analytics from '@react-native-firebase/analytics';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import {ModalPortal} from 'react-native-modals';
import DeviceInfo from 'react-native-device-info';
import {Settings} from 'react-native-fbsdk-next';
import OneSignal from 'react-native-onesignal';
import {helpers} from 'configs/themes';
import {strings} from 'controls/i18n';
import colors from 'configs/colors';
import {configure} from 'mobx';

import DropdownAlert from 'react-native-dropdownalert';
import DropdownAlertHolder from './DropdownAlertHolder';
import DialogAlert from './DialogAlert';
import DialogAlertHolder from './DialogAlertHolder';

import {RootStack} from './Router';

const errorHandler = (e, isFatal) => {
    if (isFatal) {
        DialogAlertHolder.alert(strings('title_alert_crash'), strings('message_alert_crash'));
    } else {
        console.log(e);
    }
};

setJSExceptionHandler(errorHandler, !__DEV__);

setNativeExceptionHandler((errorString) => {
    DialogAlertHolder.alert(strings('title_alert_crash'), strings('message_alert_crash'));
});

LogBox.ignoreAllLogs(__DEV__);
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
]);

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '1067221269816-dppga34974mv72l966sdvdt1b8qbcaiu.apps.googleusercontent.com'
});

configure({
    enforceActions: 'never'
});

export default class App extends Component {

    constructor(props) {
        super(props);
        Settings.initializeSDK();
        this.navigationRef = React.createRef();
        this.routeNameRef = React.createRef();
        this.state = {
            theme: Appearance.getColorScheme(),
            appState: AppState.currentState,
            isSubscribed: false
        };
    }

    componentDidMount() {
        ConfigManager.execute();
        Promise.all([DeviceInfo.getDeviceName(), DeviceInfo.getManufacturer(), DeviceInfo.isEmulator()]).then(values => {
            CBCache.uniqueId = DeviceInfo.getUniqueId();
            CBCache.deviceId = escape(DeviceInfo.getDeviceId() || '');
            CBCache.deviceName = escape(values[0] || '');
            CBCache.manufacturer = escape(values[1] || '');
            CBCache.isEmulator = values[2] || false;
        });

        this.appearanceSubscription = Appearance.addChangeListener(this.handleAppThemeChange);

        this.unsubscribeNetwork = NetInfo.addEventListener(this.handleConnectivityChange);

        this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange);

        this.linkingSubscription = Linking.addEventListener('url', this.handleOpenUrl);
        Linking.getInitialURL().then((url) => {
            CBDeeplinkHandler.handleUrl(url);
        }).catch((error) => console.error('An error occurred', error));

        this.unsubscribeDynamicLinks = dynamicLinks().onLink(this.handleOpenDynamicUrl);
        dynamicLinks().getInitialLink().then((link) => {
            CBDeeplinkHandler.handleDynamicUrl(link?.url);
        }).catch((error) => console.error('An error occurred', error));

        this.unsubscribeMessaging = messaging().onMessage(async (remoteMessage) => {
            console.log('dctan :: ' + JSON.stringify(remoteMessage));
        });

        OneSignal.setLogLevel(6, 0);
        OneSignal.setAppId(CBConfig.ONE_SIGNAL_APP_ID);
        OneSignal.promptForPushNotificationsWithUserResponse(response => {
            console.log('Prompt response:', response);
        });
        OneSignal.setNotificationWillShowInForegroundHandler(this.onReceived);
        OneSignal.setNotificationOpenedHandler(this.onOpened);
        OneSignal.getDeviceState().then(async deviceState => {
            if (deviceState?.userId) await AsyncStorage.setItem('@os_token', deviceState?.userId);
            this.setState({
                isSubscribed: deviceState?.isSubscribed || false
            }, this.onLoaded);
        }).catch(this.onLoaded);
    }

    componentWillUnmount() {
        this.appearanceSubscription.remove();

        if (this.unsubscribeNetwork) this.unsubscribeNetwork();

        this.appStateSubscription.remove();

        this.linkingSubscription.remove();

        if (this.unsubscribeDynamicLinks) this.unsubscribeDynamicLinks();

        if (this.unsubscribeMessaging) this.unsubscribeMessaging();
    }

    handleAppThemeChange = (theme) => {
        this.setState({
            //theme: theme.colorScheme
            theme: Appearance.getColorScheme()
        });
    };

    handleConnectivityChange = (state) => {
        const {appState: action} = this.state;
        if (action === 'active') {
            const {isConnected} = state;
            if (!isConnected) {
                DropdownAlertHolder.alertWithType('error', strings('title_alert_no_internet'), strings('message_alert_no_internet'));
            }
        }
    };

    handleAppStateChange = (state) => {
        this.setState({appState: state});
    };

    handleOpenUrl = (event) => {
        CBDeeplinkHandler.handleUrl(event?.url);
    };

    handleOpenDynamicUrl = (link) => {
        CBDeeplinkHandler.handleDynamicUrl(link?.url);
    };

    onReceived = ({notification}) => {
        const {appState: action} = this.state;
        CBNotificationHandler.onReceived(action, notification);
    };

    onOpened = ({action, notification}) => {
        CBNotificationHandler.onClick(action, notification?.payload?.additionalData || notification?.additionalData);
    };

    onLoaded = () => {
        SplashScreen.hide();
    };

    onReady = () => {
        this.routeNameRef.current = this.navigationRef.current.getCurrentRoute().name;
    };

    onStateChange = async () => {
        const previousRouteName = this.routeNameRef.current;
        const currentRouteName = this.navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName
            });
        }
        this.routeNameRef.current = currentRouteName;
    };

    render() {
        const {theme} = this.state;
        const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';
        const statusBarColor = theme === 'dark' ? colors.statusBarDarkColor : colors.statusBarColor;
        return (
            <ThemeProvider theme={helpers('elements', theme)}>
                <StatusBar barStyle={barStyle} backgroundColor={statusBarColor}/>
                <NavigationContainer ref={this.navigationRef} onReady={this.onReady} onStateChange={this.onStateChange} theme={helpers('navigation', theme)} initialRouteName={'LoginOrReset'}>
                    <RootStack/>
                </NavigationContainer>
                <DropdownAlert ref={ref => DropdownAlertHolder.setDropdownAlert(ref)} inactiveStatusBarStyle={barStyle} inactiveStatusBarBackgroundColor={statusBarColor}/>
                <DialogAlert ref={ref => DialogAlertHolder.setDialogAlert(ref)} theme={theme}/>
                <ModalPortal/>
            </ThemeProvider>
        );
    }
}
