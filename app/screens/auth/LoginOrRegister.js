import React from 'react';
import {Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigation from 'screens/RootNavigation';
import {CBAction, CBButton, CBContainer, CBIcon, CBInput, CBRound, CBText, CBTouchableOpacity, CBTouchableWithoutFeedback, CBView} from 'components';
import CBConstant from 'constants/CBConstant';
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

export default class LoginOrRegister extends Base {

    validationSchema = yup.object({
        phoneNumber: yup.string()
            .matches(CBConstant.PHONE_NUMBER_REGEX_PATTERN, strings('error_valid_phone_number'))
            .required(strings('error_empty_phone_number'))
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoginWithSocial: true
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.keyboardDidShowSubscription = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
    }

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

    onBlur = () => {
        Keyboard.dismiss();
    };

    onClose = () => {
        RootNavigation.goBack();
    };

    submitViaPhone(param) {
        FirebaseAuth.clearOTP();
        FirebaseAuth.sendOTP(PhoneNumberUtil.insertCountryCode(param.countryCode, param.phoneNumber), true, true, (result) => {
            if (result) {
                RootNavigation.navigate('Verify', {
                    defaultParam: JsonUtil.buildDefaultParam(param)
                });
            }
        });
    }

    onNext = (values) => {
        this.submitViaPhone({
            countryCode: values.countryCode,
            phoneNumber: values.phoneNumber
        });
    };

    submitViaSocial(param) {
        FirebaseAuth.sendSocial(param, true, true, (result) => {
            if (result) {
                FirebaseAuth.verifySocial(result, true, true, (user) => {
                    if (user) {
                        console.log(`dctan :: ${JSON.stringify(user)}`);
                    }
                });
            }
        });
    }

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

    onLoginWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const {user, idToken} = await GoogleSignin.signIn();

            await AsyncStorage.multiSet([['@google_id', user.id], ['@google_token', idToken]]);

            this.submitViaSocial({
                name: 'Google',
                idToken: idToken
            });
        } catch (error) {
            console.log('error -> ' + JSON.stringify(error));
        }
    };

    onLoginWithApple = async () => {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
        });

        if (!appleAuthRequestResponse.identityToken) {
            throw 'Apple Sign-In failed - no identify token returned';
        }

        const {user, identityToken, nonce} = appleAuthRequestResponse;
        await AsyncStorage.multiSet([['@apple_id', user], ['@apple_token', identityToken]]);

        this.submitViaSocial({
            name: 'Apple',
            identityToken: identityToken,
            nonce: nonce
        });
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
        const {isLoginWithSocial} = this.state;
        return (
            <CBContainer>
                <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
                    <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 30}} define={'none'}>
                        <CBText style={[appStyles.heading, {marginTop: 60}]} define={'heading'}>{strings('text_title_login')}</CBText>
                        <CBText style={[appStyles.subtext, {marginTop: 5}]} define={'subtext'}>{strings('text_subtitle_login')}</CBText>
                        <Formik
                            initialValues={{countryCode: '+84', phoneNumber: ''}}
                            validationSchema={this.validationSchema}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={this.onNext}>
                            {
                                ({handleChange, handleSubmit, values, errors}) => (
                                    <>
                                        <CBInput
                                            containerStyle={{marginTop: 30}}
                                            placeholder={strings('placeholder_phone_number')}
                                            returnKeyType={'go'}
                                            keyboardType={'phone-pad'}
                                            autoCapitalize={'none'}
                                            maxLength={16}
                                            value={values.phoneNumber}
                                            errorMessage={errors.phoneNumber}
                                            onChangeText={handleChange('phoneNumber')}
                                            onSubmitEditing={handleSubmit}
                                        />
                                        <CBButton buttonStyle={[appStyles.button, {marginTop: 15}]} title={strings('button_next')} onPress={handleSubmit}/>
                                    </>
                                )
                            }
                        </Formik>
                        {isLoginWithSocial ? <>
                            <CBText style={[appStyles.subtext, {textAlign: 'center', marginTop: 30}]} define={'subtext'}>{strings('text_or_login')}</CBText>
                            <CBView style={[appStyles.row, {justifyContent: 'center', marginTop: 30}]} define={'none'}>
                                <CBRound style={{marginHorizontal: 7.5}} define={'border'} onPress={this.onLoginWithFacebook}>
                                    <CBIcon define={'icon'} type={'ionicon'} name={'logo-facebook'} size={25}/>
                                </CBRound>
                                <CBRound style={{marginHorizontal: 7.5}} define={'border'} onPress={this.onLoginWithGoogle}>
                                    <CBIcon define={'icon'} type={'ionicon'} name={'logo-google'} size={25}/>
                                </CBRound>
                                {appleAuth.isSupported ? <CBRound style={{marginHorizontal: 7.5}} define={'border'} onPress={this.onLoginWithApple}>
                                    <CBIcon define={'icon'} type={'ionicon'} name={'logo-apple'} size={25}/>
                                </CBRound> : null}
                            </CBView>
                        </> :  null}
                        <CBAction style={{alignSelf: 'center', marginTop: 30}} title={strings('action_terms_and_conditions')} onPress={this.onTermsAndConditions}/>
                    </CBView>
                </CBTouchableWithoutFeedback>
                <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: 5, left: 5}]} define={'none'} onPress={this.onClose}>
                    <CBIcon define={'icon'} type={'ionicon'} name={'close-outline'} size={30}/>
                </CBTouchableOpacity>
            </CBContainer>
        );
    }
}
