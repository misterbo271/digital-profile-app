import React from 'react';
import {CBAction, CBButton, CBInput, CBCheckBox, CBView, CBContainer, CBText, CBTouchableWithoutFeedback, CBIcon, CBTouchableOpacity} from 'components';
import {appStyles} from 'configs/styles';

import Base from 'screens/Base';
import {Keyboard} from "react-native";
import RootNavigation from "screens/RootNavigation";
import {strings} from "controls/i18n";
import JsonUtil from "utils/JsonUtil";
import CBConstant from "constants/CBConstant";
import colors from "configs/colors";
import EventTracker from "controls/EventTracker";
import mnemonicWords from "mnemonic-words";

export default class WalletSecurity extends Base {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            password: '',
            checkPassword: false,
            srp: []
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.load();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    load() {
        const password = this.defaultParam?.password || '';
        this.setState({
            password: password
        })
    }

    onBlur = () => {
        Keyboard.dismiss();
    };

    onClose = () => {
        RootNavigation.goBack();
    };

    onConfirmPassword = () => {
        RootNavigation.navigate('ConfirmPassword');
        EventTracker.logEvent('screen_wallet_security', {action: 'click_tab_confirm_password'});
    };

    onTermsAndConditions = () => {
        RootNavigation.navigate('Web', {
            title: strings('screen_terms_and_conditions'),
            defaultParam: JsonUtil.buildDefaultParam({
                uri: CBConstant.URI_TERMS_AND_CONDITIONS
            })
        });
        EventTracker.logEvent('screen_wallet_security', {action: 'click_webview_terms_and_conditions'});
    };

    render() {
        const {password} = this.state;
        // console.log(`mienpv :: ${JSON.stringify(password)}`);
        return (
            <CBContainer>
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
                        <CBText style={[appStyles.title, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_protect_wallet')}</CBText>
                        <CBButton buttonStyle={[appStyles.button, {marginTop: 440}]} title={strings('button_start')} onPress={this.onConfirmPassword} />
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
