import React from 'react';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'utils/ThemeUtil';
import colors from 'configs/colors';
import dimens from 'configs/dimens';

export const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.contentColor
    },
    content: {
        flex: 1,
        backgroundColor: colors.contentColor
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    body: {
        flex: 1,
        padding: 15
    },
    shadow: {
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        elevation: 3
    },
    heading: {
        fontSize: dimens.xxxLargeText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Medium'
    },
    title: {
        fontSize: dimens.largeText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Black'
    },
    label: {
        fontSize: dimens.mediumText,
        color: colors.primaryColor,
        fontFamily: 'GoogleSans-Bold'
    },
    text: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Regular'
    },
    subtext: {
        fontSize: dimens.normalText,
        color: colors.secondaryTextColor,
        fontFamily: 'GoogleSans-Regular'
    },
    caption: {
        fontSize: dimens.smallText,
        color: colors.tertiaryTextColor,
        fontFamily: 'GoogleSans-Light'
    },
    error: {
        fontSize: dimens.smallText,
        color: colors.errorTextColor,
        fontFamily: 'GoogleSans-Regular'
    },
    image: {
        width: moderateScale(240),
        height: moderateScale(240)
    },
    cover: {
        width: '100%',
        height: (0.9 * dimens.widthScreen) / 2
    },
    negative: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Regular',
        padding: 2
    },
    positive: {
        fontSize: dimens.mediumText,
        color: colors.primaryColor,
        fontFamily: 'GoogleSans-Regular',
        padding: 2
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    button: {
        height: 50,
        borderRadius: 10
    },
    border: {
        borderWidth: 1
    },
    divider: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.lineColor
    },
    round: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.lineColor
    },
    circle: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32
    },
    action: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: colors.primaryColor,
        borderRadius: 4,
        marginHorizontal: 5,
        opacity: 0.3
    },
    bar: {
        width: 20,
        height: 8,
        backgroundColor: colors.primaryColor,
        borderRadius: 4,
        marginHorizontal: 5,
        opacity: 1
    },
    code: {
        width: 50,
        height: 50,
        paddingVertical: 0,
        paddingHorizontal: 15,
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Regular',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: colors.lineColor,
        borderRadius: 10
    },
    input: {
        paddingHorizontal: 0
    },
    popup: {
        backgroundColor: colors.contentColor,
        padding: 15,
        borderRadius: 8
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    sheet: {
        width: dimens.widthScreen,
        paddingBottom: dimens.bottomSpace,
        backgroundColor: colors.contentColor,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    knob: {
        width: 45,
        height: 8,
        backgroundColor: colors.lineColor,
        borderRadius: 4,
        margin: 5
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    pack: {
        padding: 0,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    separator: {
        height: 1,
        backgroundColor: colors.lineColor
    }
});
