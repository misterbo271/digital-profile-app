import React, {forwardRef, useImperativeHandle} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, Text, TouchableOpacity, useColorScheme, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBActionSheet = ({style, items = [], options = {}}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const show = () => {
        Keyboard.dismiss();
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
    const onSwipeOut = () => {
        hide();
    };
    const onPress = (callback) => () => {
        hide(callback);
    };
    const scheme = useColorScheme();
    const knobStyle = helpers('knob', scheme);
    const sheetStyle = helpers('sheet', scheme);
    const dividerStyle = helpers('divider', scheme);
    const textStyle = helpers('text', scheme);
    const subtextStyle = helpers('subtext', scheme);
    return (
        <Modal
            style={appStyles.modal}
            isVisible={visible}
            backdropOpacity={0.5}
            backdropTransitionOutTiming={0}
            propagateSwipe={true}
            onModalHide={onDismiss}
            onBackdropPress={onTouchOutside}
            onBackButtonPress={onHardwareBackPress}
            onSwipeComplete={onSwipeOut}
            swipeDirection={['down']}>
            <View style={[appStyles.knob, {alignSelf: 'center'}, knobStyle]}/>
            <View style={[appStyles.sheet, {height: Math.max(items.length * 65, 266)}, style, sheetStyle]}>
                {items.map((i, k) => <TouchableOpacity key={k} style={[appStyles.item, appStyles.pack, k > 0 ? appStyles.divider : {}, dividerStyle]} onPress={onPress(i.onPress)}>
                    <Icon type={i.type} name={i.name} color={i.color} size={i.size}/>
                    <View style={{flex: 1, marginLeft: 15}}>
                        <Text style={[appStyles.text, textStyle]}>{i.text}</Text>
                        {i.subtext ? <Text style={[appStyles.subtext, subtextStyle]}>{i.subtext}</Text> : null}
                    </View>
                </TouchableOpacity>)}
            </View>
        </Modal>
    );
};

export default forwardRef(CBActionSheet);
