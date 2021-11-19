import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, ScrollView, Text, TouchableOpacity, useColorScheme, View} from 'react-native';
import EventTracker from 'controls/EventTracker';
import CBControl from 'controls/CBControl';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import colors from "configs/colors";
import dimens from "configs/dimens";
import {CBText} from "components/index";
import {strings} from "controls/i18n";
import CBButton from "components/CBButton";
import RootNavigation from "screens/RootNavigation";

const CBResetWallet = ({style, onAction}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {buttons = [], options = {}} = data;
    const show = (data) => {
        Keyboard.dismiss();
        setData(data);
        setVisible(true);
    };
    const hide = (callback) => {
        setVisible(false, fallback(callback));
    };
    const fallback = (callback) => () => {
        if (callback) setTimeout(callback, 300);
    };
    const onDismiss = () => {
        if (options && options.onDismiss && typeof options.onDismiss === 'function') {
            options.onDismiss();
        }
    };
    const onTouchOutside = () => {
        if (options && (options.cancelable === true || options.cancelable === undefined)) {
            hide();
        }
    };
    const onHardwareBackPress = () => {
        if (options && (options.cancelable === true || options.cancelable === undefined)) {
            hide();
        }
        return true;
    };

    const onSwipeOut = () => {
        hide();
    };
    const onPress = (index) => () => {
        const button = buttons[index];
        if (button && button.onPress && typeof button.onPress === 'function') {
            hide(button.onPress);
        } else if (button && button.refId) {
            hide(() => CBControl.navigateWith(button.refId, button.defaultParam, button.injection));
        } else if (button && button.name) {
            if (onAction && typeof onAction === 'function') {
                hide(onAction(button.name));
            } else {
                hide();
            }
        } else {
            hide();
        }
        if (button && button.tracking) {
            EventTracker.logEvent('cb_action_sheet', {action: `click_button_${button.tracking}`});
        }
    };
    const scheme = useColorScheme();
    const knobStyle = helpers('knob', scheme);
    const sheetStyle = helpers('sheet', scheme);
    const dividerStyle = helpers('divider', scheme);
    const textStyle = helpers('text', scheme);
    const subtextStyle = helpers('subtext', scheme);
    return (
        <Modal
            style={appStyles.modal_alert}
            isVisible={visible}
            backdropOpacity={0.4}
            backdropTransitionOutTiming={0}
            propagateSwipe={true}
            onModalHide={onDismiss}
            onBackdropPress={onTouchOutside}
            onBackButtonPress={onHardwareBackPress}
            onSwipeComplete={onSwipeOut}
            swipeDirection={['down']}>
            {/*<View style={[appStyles.knob, {alignSelf: 'center'}, knobStyle]}/>*/}
            <View style={[appStyles.sheet_1, {height: 350, width: dimens.widthScreen - 50}, style, sheetStyle]}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <Icon type={'feather'} name={'alert-triangle'} color={colors.semired} size={34} style={{marginTop: 20}}/>
                    <CBText style={[appStyles.title, { marginTop: 15, color: colors.semired, alignSelf: 'center'}]} >{strings('text_confirm_reset_wallet_1')}</CBText>
                    <CBText style={[appStyles.title, { marginTop: 5, color: colors.semired, alignSelf: 'center'}]} >{strings('text_confirm_reset_wallet_2')}</CBText>
                    <CBText style={[appStyles.text, {marginTop: 15, alignSelf: 'center'}]} define={'subtext'}>Type Something Here</CBText>
                    {buttons.map((i, k) => <TouchableOpacity>
                        <CBButton buttonStyle={[appStyles.button_modal, {marginTop: 20}]} title={i.title} onPress={i.onPress}/>
                    </TouchableOpacity>)}
                    <CBButton buttonStyle={[appStyles.button_modal, {marginTop: 15}]} titleStyle={appStyles.button_text} type="outline" title={strings('button_back')} onPress={hide}/>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default forwardRef(CBResetWallet);
