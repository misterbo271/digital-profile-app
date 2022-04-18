import React from 'react';
import {CBAction, CBButton, CBInput, CBCheckBox, CBView, CBContainer, CBText, CBTouchableWithoutFeedback, CBIcon, CBTouchableOpacity} from 'components';
import {appStyles} from 'configs/styles';
import Parse from "parse/react-native";
import Base from 'screens/Base';
import {Alert, Keyboard} from "react-native";
import RootNavigation from "screens/RootNavigation";
import {strings} from "controls/i18n";
import JsonUtil from "utils/JsonUtil";
import CBConstant from "constants/CBConstant";
import colors from "configs/colors";

export default class Register extends Base {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            password: ''
        }
    }

    onCreatePassword = async () => {
        const {password} = this.state;
        // Note that these values come from state variables that we've declared before
        const passwordValue = password;
        const usernameValue = 'test1';
        // Since the signUp method returns a Promise, we need to call it using await
        return await Parse.User.signUp(usernameValue, passwordValue)
            .then((createdUser) => {
                // Parse.User.signUp returns the already created ParseUser object if successful
                Alert.alert(
                    "Success!",
                    `User ${createdUser.get("password")} was successfully created!`
                );
                RootNavigation.navigate('WalletSecurity');
                return true;
            })
            .catch((error) => {
                // signUp can fail if any parameter is blank or failed an uniqueness check on the server
                Alert.alert("Error!", error.message);
                return false;
            });

        //RootNavigation.navigate('WalletSecurity');
    };

    handleSetPassword = (text) => {
        this.setState({
            password: text
        })
    }

    onBlur = () => {
        Keyboard.dismiss();
    };

    onClose = () => {
        RootNavigation.goBack();
    };

    onChecked = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    onWalletSecurity = () => {
        RootNavigation.navigate('WalletSecurity');
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
        const {checked, password} = this.state;
        const mnemonicWords = require('mnemonic-words');
        //console.log(`mienpv :: ${JSON.stringify(mnemonicWords)}`);
        return (
            <CBContainer>
                <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
                    <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 30}} define={'none'}>
                        <CBText style={[appStyles.heading_1, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_title_pcs_wallet')}</CBText>
                        <CBView style={[appStyles.row, {marginTop: 20, marginLeft: 18}]} define={'none'}>
                            <CBIcon type={'material-community'} name={'numeric-1-circle-outline'} color={colors.primaryColor} size={24}/>
                            <CBView style={[appStyles.stroke, {width: 110, backgroundColor: colors.disableGray, marginVertical: 5}]} define={'none'}/>
                            <CBIcon type={'material-community'} name={'numeric-2-circle-outline'} color={colors.disableGray} size={24}/>
                            <CBView style={[appStyles.stroke, {width: 110, backgroundColor: colors.disableGray, marginVertical: 5}]} define={'none'}/>
                            <CBIcon type={'material-community'} name={'numeric-3-circle-outline'} color={colors.disableGray} size={24}/>
                        </CBView>
                        <CBView style={[appStyles.row, {marginTop: 10}]} define={'none'}>
                            <CBText style={[appStyles.note_text, {color: colors.primaryColor}]}>{strings('text_create_password')}</CBText>
                            <CBText style={[appStyles.note_text, {marginLeft: 45, color: colors.disableGray}]}>{strings('text_wallet_security')}</CBText>
                            <CBText style={[appStyles.note_text, {marginLeft: 40, color: colors.disableGray}]}>{strings('text_confirm_srp')}</CBText>
                        </CBView>
                        <CBText style={[appStyles.title, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_create_password')}</CBText>
                        <CBText style={[appStyles.subtext, {marginTop: 10, alignSelf: 'center'}]} define={'subtext'}>{strings('text_note_password')}</CBText>
                        <CBInput
                            containerStyle={{marginTop: 30}}
                            placeholder={strings('placeholder_new_password')}
                            returnKeyType={'go'}
                            keyboardType={'phone-pad'}
                            autoCapitalize={'none'}
                            maxLength={16}
                            value={password}
                            //errorMessage={errors.phoneNumber}
                            onChangeText={(text) => this.handleSetPassword(text)}
                            //onSubmitEditing={handleSubmit}
                        />
                        <CBInput
                            containerStyle={{marginTop: 5}}
                            placeholder={strings('placeholder_confirm_new_password')}
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
                            <CBText style={{color: colors.red}}>* </CBText>
                            <CBText style={[appStyles.note_text]} define={'subtext'}>{strings('text_password_rule')}</CBText>
                        </CBView>
                        <CBView style={[appStyles.row, {marginTop: 115}]}>
                            <CBCheckBox
                                size={20}
                                checked={checked}
                                onPress={this.onChecked}
                            />
                            <CBText style={[appStyles.note_text, {marginTop: 5}]} define={'subtext'}>{strings('text_note')}</CBText>
                        </CBView>
                        <CBView style={appStyles.row}>
                            <CBText style={[appStyles.note_text, {marginTop: 5}]} define={'subtext'}>{strings('text_note_2')}</CBText>
                            <CBTouchableOpacity onPress={this.onTermsAndConditions}>
                                <CBText style={[appStyles.note_text, {color: colors.darkTurquoise, marginTop: 5}]}>{strings('text_more_information')}</CBText>
                            </CBTouchableOpacity>
                        </CBView>
                        <CBButton buttonStyle={[appStyles.button, {marginTop: 35}]} title={strings('text_create_password')} onPress={() => this.onCreatePassword()} />
                        <CBAction style={{alignSelf: 'center', marginTop: 30}} title={strings('action_terms_and_conditions')} onPress={this.onTermsAndConditions}/>
                    </CBView>
                </CBTouchableWithoutFeedback>
                <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: 5, left: 8}]} define={'none'} onPress={this.onClose}>
                    <CBIcon define={'icon'} type={'ionicon'} name={'arrow-back-outline'} size={26}/>
                </CBTouchableOpacity>
            </CBContainer>
        );
    }
}
