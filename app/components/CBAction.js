import React from 'react';
import {Text, TouchableOpacity, useColorScheme} from 'react-native';
import {debounce} from 'lodash';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBAction = ({style, disabled, iconLeft, title, titleStyle, iconRight, onPress}) => {
    const onPressDebounce = onPress ? debounce(onPress, 300, {leading: true, trailing: false}) : null;
    const scheme = useColorScheme();
    const activeStyle = helpers('active', scheme);
    const inactiveStyle = helpers('inactive', scheme);
    return (
        <TouchableOpacity
            style={[appStyles.row, style]}
            disabled={disabled}
            pointerEvents={disabled ? 'none' : 'auto'}
            onPress={onPressDebounce}>
            {iconLeft}
            <Text style={[appStyles.text, disabled ? inactiveStyle : activeStyle, titleStyle]}>{title}</Text>
            {iconRight}
        </TouchableOpacity>
    );
};

export default CBAction;

