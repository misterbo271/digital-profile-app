import React from 'react';
import {Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigation from 'screens/RootNavigation';
import {
    CBAvatar,
    CBAction,
    CBButton,
    CBContainer,
    CBIcon,
    CBInput,
    CBRound,
    CBText,
    CBTouchableOpacity,
    CBTouchableWithoutFeedback,
    CBView,
    CBScrollView,
    CBResetWallet
} from 'components/index';
import CBConstant from 'constants/CBConstant';
import { Switch } from 'react-native-elements';
import FirebaseAuth from 'services/FirebaseAuth';
import PhoneNumberUtil from 'utils/PhoneNumberUtil';
import JsonUtil from 'utils/JsonUtil';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';

import {Formik} from 'formik';
import * as yup from 'yup';

import Base from 'screens/Base';
import dimens from "configs/dimens";
import EventTracker from "controls/EventTracker";

export default class LoginOrReset extends Base {

    // validationSchema = yup.object({
    //     phoneNumber: yup.string()
    //         .matches(CBConstant.PHONE_NUMBER_REGEX_PATTERN, strings('error_valid_phone_number'))
    //         .required(strings('error_empty_phone_number'))
    // });

    constructor(props) {
        super(props);
        this.cbResetWallet = React.createRef();
        this.state = {
            isLoginWithSocial: true
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.keyboardDidShowSubscription = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    };

    componentWillUnmount() {
        super.componentWillUnmount();
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
    };

    keyboardDidShow = () => {
        this.setState({
            isLoginWithSocial: false
        });
    };

    keyboardDidHide = () => {
        this.setState({
            isLoginWithSocial: true
        });
    };

    onLogin = () => {
        RootNavigation.navigate('Home');
        EventTracker.logEvent('screen_login_or_reset', {action: 'click_login'});
    };


    onBlur = () => {
        Keyboard.dismiss();
    };

    onClose = () => {
        RootNavigation.goBack();
    };

    // submitViaPhone(param) {
    //     FirebaseAuth.clearOTP();
    //     FirebaseAuth.sendOTP(PhoneNumberUtil.insertCountryCode(param.countryCode, param.phoneNumber), true, true, (result) => {
    //         if (result) {
    //             RootNavigation.navigate('Verify', {
    //                 defaultParam: JsonUtil.buildDefaultParam(param)
    //             });
    //         }
    //     });
    // }

    // onNext = (values) => {
    //     this.submitViaPhone({
    //         countryCode: values.countryCode,
    //         phoneNumber: values.phoneNumber
    //     });
    // };

    // submitViaSocial(param) {
    //     FirebaseAuth.sendSocial(param, true, true, (result) => {
    //         if (result) {
    //             FirebaseAuth.verifySocial(result, true, true, (user) => {
    //                 if (user) {
    //                     console.log(`dctan :: ${JSON.stringify(user)}`);
    //                 }
    //             });
    //         }
    //     });
    // }

    onLoginWithFacebook = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        await AsyncStorage.multiSet([['@facebook_id', data.userID], ['@facebook_token', data.accessToken]]);

        this.submitViaSocial({
            name: 'Facebook',
            accessToken: data.accessToken
        });
    };

    // onLoginWithGoogle = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const {user, idToken} = await GoogleSignin.signIn();
    //
    //         await AsyncStorage.multiSet([['@google_id', user.id], ['@google_token', idToken]]);
    //
    //         this.submitViaSocial({
    //             name: 'Google',
    //             idToken: idToken
    //         });
    //     } catch (error) {
    //         console.log('error -> ' + JSON.stringify(error));
    //     }
    // };
    //
    // onLoginWithApple = async () => {
    //     const appleAuthRequestResponse = await appleAuth.performRequest({
    //         requestedOperation: appleAuth.Operation.LOGIN,
    //         requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    //     });
    //
    //     if (!appleAuthRequestResponse.identityToken) {
    //         throw 'Apple Sign-In failed - no identify token returned';
    //     }
    //
    //     const {user, identityToken, nonce} = appleAuthRequestResponse;
    //     await AsyncStorage.multiSet([['@apple_id', user], ['@apple_token', identityToken]]);
    //
    //     this.submitViaSocial({
    //         name: 'Apple',
    //         identityToken: identityToken,
    //         nonce: nonce
    //     });
    // };

    //Bug cho nay
    onResetWallet = () => {
        const {theme} = this.context;
        this.cbResetWallet.current.show({});
    };

    onTermsAndConditions = () => {
        RootNavigation.navigate('Web', {
            title: strings('screen_terms_and_conditions'),
            defaultParam: JsonUtil.buildDefaultParam({
                uri: CBConstant.URI_TERMS_AND_CONDITIONS
            })
        });
    };

    render() {
        // const {isLoginWithSocial} = this.state;
        return (
            <CBScrollView>
                <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
                    <CBView style={{flex: 1, paddingVertical: 55, paddingHorizontal: 30}} define={'none'}>
                        <CBAvatar
                            size={100}
                            source={require('../../assets/images/fennec_chibi.jpeg')}
                            containerStyle={{marginTop: 20, marginLeft: dimens.widthScreen / 2 - 84, borderRadius: 30}}
                        />
                        <CBText style={[appStyles.heading_1, { marginTop: 50, alignSelf: 'center'}]}>{strings('text_welcome_back')}</CBText>
                        <CBText style={[appStyles.text, {marginTop: 20}]} define={'subtext'}>{strings('text_input_password')}</CBText>
                        <CBInput
                            containerStyle={{marginTop: 20}}
                            placeholder={strings('placeholder_confirm_password')}
                            returnKeyType={'go'}
                            keyboardType={'phone-pad'}
                            autoCapitalize={'none'}
                            maxLength={16}
                            //value={values.phoneNumber}
                            //errorMessage={errors.phoneNumber}
                            //onChangeText={handleChange('phoneNumber')}
                            //onSubmitEditing={handleSubmit}
                        />
                        <CBView style={appStyles.row}>
                            <CBText style={[appStyles.text, {marginTop: 20, marginRight: 165}]} define={'subtext'}>{strings('text_remember_me')}</CBText>
                            <Switch value={false} color="#27AE60" />
                        </CBView>
                        <CBButton buttonStyle={[appStyles.button, {marginTop: 90}]} title={strings('button_login')} onPress={this.onLogin}/>
                        <CBText style={[appStyles.text, {marginTop: 90, alignSelf: 'center'}]} define={'subtext'}>{strings('text_cannot_login_1')}</CBText>
                        <CBText style={[appStyles.text, {marginTop: 5, alignSelf: 'center'}]} define={'subtext'}>{strings('text_cannot_login_2')}</CBText>
                        <CBAction style={{alignSelf: 'center', marginTop: 15}} title={strings('action_reset_wallet')} onPress={this.onResetWallet}/>
                        <CBResetWallet ref={this.cbResetWallet}/>
                    </CBView>
                </CBTouchableWithoutFeedback>
                {/*<CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: 5, left: 5}]} define={'none'} onPress={this.onClose}>*/}
                {/*    <CBIcon define={'icon'} type={'ionicon'} name={'close-outline'} size={30}/>*/}
                {/*</CBTouchableOpacity>*/}
            </CBScrollView>
        );
    }
}
