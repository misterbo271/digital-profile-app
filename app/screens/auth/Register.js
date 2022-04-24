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
import EventTracker from "controls/EventTracker";
import dimens from "configs/dimens";
import mnemonicWords from "mnemonic-words";

export default class Register extends Base {

    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            checked: false,
            checkPassword: false,
            confirmWallet: false,
            password: '',
            srp: []
        }
    }

    onCreatePassword = async () => {
        const {password, rsp} = this.state;
        // Note that these values come from state variables that we've declared before
        const usernameValue = "test2";
        const passwordValue = password;
        const SRPValue = rsp;
        console.log(`mienpv :: ${JSON.stringify(SRPValue)}`);
        // Since the signUp method returns a Promise, we need to call it using await
        return await Parse.User.signUp(usernameValue, passwordValue, SRPValue)
            .then((createdUser) => {
                // Parse.User.signUp returns the already created ParseUser object if successful
                Alert.alert(
                    "Success!",
                    `User ${createdUser.get("username")} was successfully created!`
                );
                RootNavigation.navigate('Home');
                return true;
            })
            .catch((error) => {
                // signUp can fail if any parameter is blank or failed an uniqueness check on the server
                Alert.alert("Error!", error.message);
                return false;
            });
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

    onTabChange = (tab) => () => {
        this.setState({tab});
    };

    onConfirmPassword = () => {
        const mnemonicWords = require('mnemonic-words');
        let rand = [];
        for ( let i=0; i < 9; i++) {
            rand[i] = mnemonicWords[Math.floor(Math.random() * mnemonicWords.length)];
        }
        this.setState({
            checkPassword: true,
            rsp: rand
        })
    };

    onChecked = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    onHomeScreen = () => {
        RootNavigation.navigate('Home');
    };

    onTermsAndConditions = () => {
        RootNavigation.navigate('Web', {
            title: strings('screen_terms_and_conditions'),
            defaultParam: JsonUtil.buildDefaultParam({
                uri: CBConstant.URI_TERMS_AND_CONDITIONS
            })
        });
        EventTracker.logEvent('screen_register', {action: 'click_webview_terms_and_conditions'});
    };

    onExit = () => {
        RootNavigation.goBack();
    };

    onRaiseSRP = () => {
        const mnemonicWords = require('mnemonic-words');
        let rand = [];
        for(let i = 0; i < 9; i++) {
            rand = mnemonicWords[Math.floor(Math.random() * mnemonicWords.length)];
            this.setState({ rsp: this.state.rsp.push(rand) })
        }
    }

    render() {
        const {tab, checked, password, checkPassword, rsp} = this.state;
        return (
            <CBContainer>
                {tab === 0 ? <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
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
                    </CBView>
                </CBTouchableWithoutFeedback> : tab === 1 ?
                     checkPassword === false ? <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
                        <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 30}} define={'none'}>
                            <CBText style={[appStyles.heading_1, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_title_pcs_wallet')}</CBText>
                            <CBView style={[appStyles.row, {marginTop: 20, marginLeft: 18}]} define={'none'}>
                                <CBIcon type={'material-community'} name={'numeric-1-circle-outline'} color={colors.disableGray} size={24}/>
                                <CBView style={[appStyles.stroke, {width: 110, backgroundColor: colors.disableGray, marginVertical: 5}]} define={'none'}/>
                                <CBIcon type={'material-community'} name={'numeric-2-circle-outline'} color={colors.primaryColor} size={24}/>
                                <CBView style={[appStyles.stroke, {width: 110, backgroundColor: colors.disableGray, marginVertical: 5}]} define={'none'}/>
                                <CBIcon type={'material-community'} name={'numeric-3-circle-outline'} color={colors.disableGray} size={24}/>
                            </CBView>
                            <CBView style={[appStyles.row, {marginTop: 10}]} define={'none'}>
                                <CBText style={[appStyles.note_text, {color: colors.disableGray}]}>{strings('text_create_password')}</CBText>
                                <CBText style={[appStyles.note_text, {marginLeft: 45, color: colors.primaryColor}]}>{strings('text_wallet_security')}</CBText>
                                <CBText style={[appStyles.note_text, {marginLeft: 40, color: colors.disableGray}]}>{strings('text_confirm_srp')}</CBText>
                            </CBView>
                            <CBText style={[appStyles.title, { marginTop: 30}]} >{strings('text_confirm_password')}</CBText>
                            <CBText style={[appStyles.note_text, {marginTop: 10}]} define={'subtext'}>{strings('text_note_confirm_password')}</CBText>
                            <CBInput
                                containerStyle={{marginTop: 30}}
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
                        </CBView>
                    </CBTouchableWithoutFeedback> :
                         <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
                             <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 30}} define={'none'}>
                                 <CBText style={[appStyles.heading_1, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_title_pcs_wallet')}</CBText>
                                 <CBView style={[appStyles.row, {marginTop: 20, marginLeft: 18}]} define={'none'}>
                                     <CBIcon type={'material-community'} name={'numeric-1-circle-outline'} color={colors.disableGray} size={24}/>
                                     <CBView style={[appStyles.stroke, {width: 110, backgroundColor: colors.disableGray, marginVertical: 5}]} define={'none'}/>
                                     <CBIcon type={'material-community'} name={'numeric-2-circle-outline'} color={colors.primaryColor} size={24}/>
                                     <CBView style={[appStyles.stroke, {width: 110, backgroundColor: colors.disableGray, marginVertical: 5}]} define={'none'}/>
                                     <CBIcon type={'material-community'} name={'numeric-3-circle-outline'} color={colors.disableGray} size={24}/>
                                 </CBView>
                                 <CBView style={[appStyles.row, {marginTop: 10}]} define={'none'}>
                                     <CBText style={[appStyles.note_text, {color: colors.disableGray}]}>{strings('text_create_password')}</CBText>
                                     <CBText style={[appStyles.note_text, {marginLeft: 45, color: colors.primaryColor}]}>{strings('text_wallet_security')}</CBText>
                                     <CBText style={[appStyles.note_text, {marginLeft: 40, color: colors.disableGray}]}>{strings('text_confirm_srp')}</CBText>
                                 </CBView>
                                 <CBText style={[appStyles.title, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_protect_wallet2')}</CBText>
                                 <CBText style={[appStyles.title, { marginTop: 5, alignSelf: 'center'}]} >{strings('text_protect_wallet3')}</CBText>
                                 <CBText style={[appStyles.note_text, { fontSize: dimens.normalText, marginTop: 10, alignSelf: 'center'}]} >{strings('text_remind_srp')}</CBText>

                                 <CBView style={[appStyles.border, {marginTop: 15, borderColor: colors.disableGray, borderRadius: 4}]}>
                                     <CBView style={[appStyles.row, {padding: 10, marginLeft: 10, marginTop: 10}]}>
                                         <CBView style={[appStyles.border, {width: 130, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                         <CBText style={[appStyles.text, {padding: 6}]}>1. {rsp[0]}</CBText>
                                         </CBView>
                                         <CBView style={[appStyles.border, {width: 130, marginLeft: 20, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                             <CBText style={[appStyles.text, {padding: 6}]}>5. {rsp[4]}</CBText>
                                         </CBView>
                                     </CBView>
                                     <CBView style={[appStyles.row, {marginLeft: 10, padding: 10}]}>
                                         <CBView style={[appStyles.border, {width: 130, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                             <CBText style={[appStyles.text, {padding: 6}]}>2.{rsp[1]}</CBText>
                                         </CBView>
                                         <CBView style={[appStyles.border, {width: 130, marginLeft: 20, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                             <CBText style={[appStyles.text, {padding: 6}]}>6. {rsp[5]}</CBText>
                                         </CBView>
                                     </CBView>
                                     <CBView style={[appStyles.row, {marginLeft: 10, padding: 10}]}>
                                         <CBView style={[appStyles.border, {width: 130, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                             <CBText style={[appStyles.text, {padding: 6}]}>3. {rsp[2]}</CBText>
                                         </CBView>
                                         <CBView style={[appStyles.border, {width: 130, marginLeft: 20, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                             <CBText style={[appStyles.text, {padding: 6}]}>7. {rsp[6]}</CBText>
                                         </CBView>
                                     </CBView>
                                     <CBView style={[appStyles.row, {marginLeft: 10, padding: 10, marginBottom: 10}]}>
                                         <CBView style={[appStyles.border, { width: 130, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                             <CBText style={[appStyles.text, {padding: 6}]}>4. {rsp[3]}</CBText>
                                         </CBView>
                                         <CBView style={[appStyles.border, {width: 130, marginLeft: 20, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                             <CBText style={[appStyles.text, {padding: 6}]}>8. {rsp[7]}</CBText>
                                         </CBView>
                                     </CBView>
                                 </CBView>
                    </CBView>
                         </CBTouchableWithoutFeedback>: tab === 2 ?
                        <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
                            <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 30}} define={'none'}>
                                <CBText style={[appStyles.heading_1, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_title_pcs_wallet')}</CBText>
                                <CBView style={[appStyles.row, {marginTop: 20, marginLeft: 18}]} define={'none'}>
                                    <CBIcon type={'material-community'} name={'numeric-1-circle-outline'} color={colors.disableGray} size={24}/>
                                    <CBView style={[appStyles.stroke, {width: 110, backgroundColor: colors.disableGray, marginVertical: 5}]} define={'none'}/>
                                    <CBIcon type={'material-community'} name={'numeric-2-circle-outline'} color={colors.disableGray} size={24}/>
                                    <CBView style={[appStyles.stroke, {width: 110, backgroundColor: colors.disableGray, marginVertical: 5}]} define={'none'}/>
                                    <CBIcon type={'material-community'} name={'numeric-3-circle-outline'} color={colors.primaryColor} size={24}/>
                                </CBView>
                                <CBView style={[appStyles.row, {marginTop: 10}]} define={'none'}>
                                    <CBText style={[appStyles.note_text, {color: colors.disableGray}]}>{strings('text_create_password')}</CBText>
                                    <CBText style={[appStyles.note_text, {marginLeft: 45, color: colors.disableGray}]}>{strings('text_wallet_security')}</CBText>
                                    <CBText style={[appStyles.note_text, {marginLeft: 40, color: colors.primaryColor}]}>{strings('text_confirm_srp')}</CBText>
                                </CBView>
                                <CBText style={[appStyles.note_text, { fontSize: dimens.normalText, marginTop: 10, alignSelf: 'center'}]} >{strings('text_confirm_srp1')}</CBText>
                                <CBView style={[appStyles.border, {marginTop: 15, borderColor: colors.disableGray, borderRadius: 4}]}>
                                    <CBView style={[appStyles.row, {padding: 10, marginLeft: 10, marginTop: 10}]}>
                                        <CBView style={[appStyles.border, { width: 130, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                            <CBText style={[appStyles.text, {padding: 6}]}>Test</CBText>
                                        </CBView>
                                        <CBView style={[appStyles.border, {width: 130, marginLeft: 20, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                            <CBText style={[appStyles.text, {padding: 6}]}>Test</CBText>
                                        </CBView>
                                    </CBView>
                                    <CBView style={[appStyles.row, {marginLeft: 10, padding: 10}]}>
                                        <CBView style={[appStyles.border, {width: 130, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                            <CBText style={[appStyles.text, {padding: 6}]}>Test</CBText>
                                        </CBView>
                                        <CBView style={[appStyles.border, {width: 130, marginLeft: 20, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                            <CBText style={[appStyles.text, {padding: 6}]}>Test</CBText>
                                        </CBView>
                                    </CBView>
                                    <CBView style={[appStyles.row, {marginLeft: 10, padding: 10}]}>
                                        <CBView style={[appStyles.border, { width: 130, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                            <CBText style={[appStyles.text, {padding: 6}]}>Test</CBText>
                                        </CBView>
                                        <CBView style={[appStyles.border, {width: 130, marginLeft: 20, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                            <CBText style={[appStyles.text, {padding: 6}]}>Test</CBText>
                                        </CBView>
                                    </CBView>
                                    <CBView style={[appStyles.row, {marginLeft: 10, padding: 10, marginBottom: 10}]}>
                                        <CBView style={[appStyles.border, {width: 130, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                            <CBText style={[appStyles.text, {padding: 6}]}>Test</CBText>
                                        </CBView>
                                        <CBView style={[appStyles.border, {width: 130, marginLeft: 20, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                            <CBText style={[appStyles.text, {padding: 6}]}>Test</CBText>
                                        </CBView>
                                    </CBView>
                                </CBView>
                                <CBView style={[appStyles.row, { marginTop: 15}]}>
                                    <CBView style={[appStyles.border, {width: 110, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                        <CBText style={[appStyles.text, {padding: 6}]}>{rsp[3]}</CBText>
                                    </CBView>
                                    <CBView style={[appStyles.border, {width: 110, marginLeft: 5, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                        <CBText style={[appStyles.text, {padding: 6}]}>{rsp[1]}</CBText>
                                    </CBView>
                                    <CBView style={[appStyles.border, {width: 110, marginLeft: 5, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                        <CBText style={[appStyles.text, {padding: 6}]}>{rsp[7]}</CBText>
                                    </CBView>
                                </CBView>
                                <CBView style={[appStyles.row, { marginTop: 10}]}>
                                    <CBView style={[appStyles.border, {width: 110, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                        <CBText style={[appStyles.text, {padding: 6}]}>{rsp[2]}</CBText>
                                    </CBView>
                                    <CBView style={[appStyles.border, {width: 110, marginLeft: 5, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                        <CBText style={[appStyles.text, {padding: 6}]}>{rsp[5]}</CBText>
                                    </CBView>
                                    <CBView style={[appStyles.border, {width: 110, marginLeft: 5, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                        <CBText style={[appStyles.text, {padding: 6}]}>{rsp[6]}</CBText>
                                    </CBView>
                                </CBView>
                                <CBView style={[appStyles.row, {marginTop: 10, marginBottom: 10}]}>
                                    <CBView style={[appStyles.border, {width: 110,  borderColor: colors.primaryColor, borderRadius: 16}]}>
                                        <CBText style={[appStyles.text, {padding: 6}]}>{rsp[0]}</CBText>
                                    </CBView>
                                    <CBView style={[appStyles.border, {width: 110, marginLeft: 5, borderColor: colors.primaryColor, borderRadius: 16}]}>
                                        <CBText style={[appStyles.text, {padding: 6}]}>{rsp[4]}</CBText>
                                    </CBView>
                                </CBView>
                            </CBView>
                        </CBTouchableWithoutFeedback> : null}
                {tab !== 1 ? <CBView>
                    <CBButton disabled={checked === false ? true : false} buttonStyle={[appStyles.button, {marginLeft: 35, width: dimens.widthScreen / 1.2, marginTop: 50}]} title={tab === 0 ? strings('text_create_password') : strings('button_confirm') } onPress={tab === 0 ? this.onTabChange(1) : this.onCreatePassword} />
                </CBView> :
                    <CBView>
                        {checkPassword === false ? <CBButton buttonStyle={[appStyles.button, {marginLeft: 35, width: dimens.widthScreen / 1.2, marginTop: 50}]} title={ strings('button_confirm')} onPress={this.onConfirmPassword} /> : <CBButton buttonStyle={[appStyles.button, {marginLeft: 35, width: dimens.widthScreen / 1.2, marginTop: 50}]} title={ strings('button_confirm')} onPress={this.onTabChange(2)} /> }
                    </CBView>  }
                    <CBAction style={{alignSelf: 'center', marginTop: 30}} title={strings('action_terms_and_conditions')} onPress={this.onTermsAndConditions}/>
                <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: 5, left: 8}]} define={'none'} onPress={this.onClose}>
                    <CBIcon define={'icon'} type={'ionicon'} name={'arrow-back-outline'} size={26}/>
                </CBTouchableOpacity>
            </CBContainer>
        );
    }
}
