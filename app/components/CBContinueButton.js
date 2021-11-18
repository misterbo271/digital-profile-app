import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {strings} from 'controls/I18n'
import colors from 'configs/colors'

const { width } = Dimensions.get('window')

export default function CBContinueButton({
   onPress,
   style,
   titleStyle,
   disabled,
   center,
   title,
   fullWidth,
   icon,
   isShowLeftIcon,
   isShowRightIcon
}) {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[
                styles.btnContinue,
                style,
                center && styles.center,
                fullWidth && { marginLeft: 0 },
                disabled && styles.btnContinueDisable
            ]}
            onPress={onPress}
        >
            {
                icon && isShowLeftIcon
                    ? icon
                    : <View />
            }
            <Text
                style={[
                    disabled && styles.txtContinueDisable,
                    styles.txtContinue,
                    titleStyle
                ]}
            >
                {title || 'Dang nhap'}
            </Text>
            {
                icon && isShowRightIcon
                    ? icon
                    : <View />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContinue: {
        backgroundColor: colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.9,
        height: 48,
        borderRadius: 10,
        marginBottom: 25,
        alignSelf: 'center'
    },
    btnContinueDisable: {
        backgroundColor: '#E8E8E8'
    },
    txtContinue: {
        fontSize: 16,
        textTransform: 'none',
        fontFamily: 'GoogleSans-Bold',
        color: colors.white
    },
    txtContinueDisable: {
        color: colors.white
    },
    center: {
        position: 'absolute',
        marginBottom: 15,
        bottom: 0,
        right: width / 4.2
    }
})
