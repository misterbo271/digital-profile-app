import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, useColorScheme} from 'react-native';
import {CBButton, CBImage, CBText, CBView} from 'components';
import EventTracker from 'controls/EventTracker';
import CBControl from 'controls/CBControl';
import {moderateScale} from 'utils/ThemeUtil';
import ImageUtil from 'utils/ImageUtil';
import Modal, {ModalContent, ScaleAnimation} from 'react-native-modals';
import QRCode from 'react-native-qrcode-svg';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import dimens from 'configs/dimens';
import RootNavigation from "screens/RootNavigation";
import JsonUtil from "utils/JsonUtil";

const ClaimPopup = ({style, onAction}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {claim = {}, index = {}, options = {}} = data;
    const linkSchema = claim?.schema;
    const show = (data) => {
        Keyboard.dismiss();
        setData(data);
        setVisible(true);
    };
    const hide = (callback) => {
        setVisible(false, callback);
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

    const onLinkSchema = () => {
        RootNavigation.navigate('Web', {
            defaultParam: JsonUtil.buildDefaultParam({
                title: 'Link Schema',
                uri: linkSchema
            })
        });
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
            EventTracker.logEvent('information_popup', {action: 'click_button_' + button.tracking});
        }
    };
    const scheme = useColorScheme();
    const popupStyle = helpers('popup', scheme);
    const buttonWith = (0.8 * dimens.widthScreen - 45) / 2 - 2.75;
    return (
        <Modal
            onDismiss={onDismiss}
            onTouchOutside={onTouchOutside}
            onHardwareBackPress={onHardwareBackPress}
            width={0.8}
            visible={visible}
            modalAnimation={new ScaleAnimation()}>
            <ModalContent style={[appStyles.popup, popupStyle]}>
                <CBView>
                    <CBText style={[appStyles.title, {textAlign: 'center'}]} define={'title'}>{'QRCode and Link Schema'}</CBText>
                    <CBView style={{alignSelf: 'center', marginTop: 15}} define={'none'}>
                        <QRCode value={linkSchema} size={180}/>
                    </CBView>
                    <CBView style={[appStyles.footer, {marginTop: 15, justifyContent: 'center'}]} define={'footer'}>
                        <CBButton style={{marginTop: 10, width: (dimens.widthScreen / 3) * 1.5 }} title={'Share'} onPress={onLinkSchema}/>
                    </CBView>
                </CBView>
            </ModalContent>
        </Modal>
    );
};

export default forwardRef(ClaimPopup);
