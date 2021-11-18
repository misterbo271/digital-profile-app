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

export default class Register extends Base {

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

    onChecked = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    onTermsAndConditions = () => {
        RootNavigation.navigate('Web', {
            title: strings('screen_terms_and_conditions'),
            defaultParam: JsonUtil.buildDefaultParam({
                uri: CBConstant.URI_TERMS_AND_CONDITIONS
            })
        });
    };

    render() {
        const {checked} = this.state;
        return (
            <CBContainer>
                <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
                    <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 30}} define={'none'}>
                        <CBText style={[appStyles.heading_1, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_title_pcs_wallet')}</CBText>
                        <CBText style={[appStyles.title, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_create_password')}</CBText>
                        <CBText style={[appStyles.subtext, {marginTop: 10, alignSelf: 'center'}]} define={'subtext'}>{strings('text_note_password')}</CBText>
                        <CBInput
                            containerStyle={{marginTop: 40}}
                            placeholder={strings('placeholder_new_password')}
                            returnKeyType={'go'}
                            keyboardType={'phone-pad'}
                            autoCapitalize={'none'}
                            maxLength={16}
                            //value={values.phoneNumber}
                            //errorMessage={errors.phoneNumber}
                            //onChangeText={handleChange('phoneNumber')}
                            //onSubmitEditing={handleSubmit}
                        />
                        <CBInput
                            containerStyle={{marginTop: 10}}
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
                            <CBText style={{marginTop: 5, color: colors.red}}>* </CBText>
                            <CBText style={[appStyles.note_text, {marginTop: 5}]} define={'subtext'}>{strings('text_password_rule')}</CBText>
                        </CBView>
                        <CBView style={[appStyles.row, {marginTop: 190}]}>
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
                        <CBButton buttonStyle={[appStyles.button, {marginTop: 35}]} title={strings('text_create_password')} />
                        <CBAction style={{alignSelf: 'center', marginTop: 40}} title={strings('action_terms_and_conditions')} onPress={this.onTermsAndConditions}/>
                    </CBView>
                </CBTouchableWithoutFeedback>
                <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: 5, left: 5}]} define={'none'} onPress={this.onClose}>
                    <CBIcon define={'icon'} type={'ionicon'} name={'close-outline'} size={30}/>
                </CBTouchableOpacity>
            </CBContainer>
        );
    }
}
