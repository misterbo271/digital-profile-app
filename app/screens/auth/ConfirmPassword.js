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

export default class ConfirmPassword extends Base {

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }
    onBlur = () => {
        Keyboard.dismiss();
    };

    onClose = () => {
        RootNavigation.goBack();
    };

    onConfirmPassword = () => {
        RootNavigation.navigate('ConfirmPassword');
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
                        <CBButton buttonStyle={[appStyles.button, {marginTop: 30}]} title={strings('button_confirm')} onPress={this.onConfirmPassword} />
                        <CBAction style={{alignSelf: 'center', marginTop: 265}} title={strings('action_terms_and_conditions')} onPress={this.onTermsAndConditions}/>
                    </CBView>
                </CBTouchableWithoutFeedback>
                <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: 5, left: 8}]} define={'none'} onPress={this.onClose}>
                    <CBIcon define={'icon'} type={'ionicon'} name={'arrow-back-outline'} size={26}/>
                </CBTouchableOpacity>
            </CBContainer>
        );
    }
}
