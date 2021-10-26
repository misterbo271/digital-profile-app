import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import colors from 'configs/colors';
import dimens from 'configs/dimens';

const lightTheme = {
    none: {},
    background: colors.contentColor,
    primary: colors.primaryColor,
    icon: colors.primaryTextColor,
    skeleton: colors.hideColor,
    navigation: {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: colors.primaryColor,
            background: colors.contentColor,
            card: colors.contentColor,
            text: colors.primaryTextColor,
            border: colors.lineColor,
            notification: colors.badgeColor
        }
    },
    elements: {
        colors: {
            scheme: 'light',
            background: colors.contentColor,
            primary: colors.primaryColor,
            secondary: colors.primaryColor,
            grey0: colors.primaryTextColor,
            grey1: colors.secondaryTextColor,
            grey2: colors.secondaryTextColor,
            grey3: colors.tertiaryTextColor,
            grey4: colors.tertiaryTextColor,
            grey5: colors.tertiaryTextColor,
            error: colors.errorTextColor,
            divider: colors.lineColor,
            badge: colors.badgeColor,
            hide: colors.hideColor
        },
        Button: {
            titleStyle: {
                fontFamily: 'GoogleSans-Regular',
            },
            disabledTitleStyle: {
                color: colors.tertiaryTextColor,
                fontFamily: 'GoogleSans-Regular'
            }
        },
        ButtonGroup: {
            containerStyle: {
                height: 30,
                marginVertical: 7.5,
                borderWidth: 0
            },
            buttonStyle: {
                backgroundColor: colors.hideColor
            },
            selectedButtonStyle: {
                backgroundColor: colors.primaryTextColor
            },
            textStyle: {
                fontSize: dimens.normalText,
                color: colors.primaryTextColor,
                fontWeight: 'normal',
                fontFamily: 'GoogleSans-Regular'
            },
            selectedTextStyle: {
                fontSize: dimens.normalText,
                color: colors.primaryColor,
                fontWeight: 'normal',
                fontFamily: 'GoogleSans-Regular'
            }
        },
        CheckBox: {
            containerStyle: {
                flex: 1,
                backgroundColor: 'transparent',
                margin: 0,
                marginLeft: 0,
                marginRight: 0,
                padding: 0,
                borderRadius: 0,
                borderWidth: 0
            },
            checkedColor: colors.primaryColor,
            uncheckedColor: colors.primaryTextColor,
            textStyle: {
                flex: 1,
                fontSize: dimens.mediumText,
                color: colors.primaryTextColor,
                fontWeight: 'normal',
                fontFamily: 'GoogleSans-Regular',
                marginLeft: 10,
                marginRight: 0
            }
        },
        Divider: {
            backgroundColor: colors.lineColor
        },
        Image: {
            placeholderStyle: {
                backgroundColor: colors.hideColor
            }
        },
        Input: {
            containerStyle: {
                paddingHorizontal: 0
            },
            inputContainerStyle: {
                borderBottomWidth: 0
            },
            inputStyle: {
                height: 50,
                paddingVertical: 0,
                paddingHorizontal: 15,
                fontSize: dimens.mediumText,
                color: colors.primaryTextColor,
                fontFamily: 'GoogleSans-Regular',
                borderWidth: 1,
                borderColor: colors.lineColor,
                borderRadius: 10
            },
            errorStyle: {
                fontSize: dimens.smallText,
                color: colors.errorTextColor,
                fontFamily: 'GoogleSans-Regular'
            }
        }
    },
    html: {
        p: {
            fontSize: dimens.mediumText,
            color: colors.primaryTextColor,
            fontFamily: 'GoogleSans-Regular'
        },
        b: {
            fontSize: dimens.mediumText,
            color: colors.primaryTextColor,
            fontFamily: 'GoogleSans-Bold'
        },
        a: {
            fontSize: dimens.mediumText,
            color: colors.primaryColor,
            fontFamily: 'GoogleSans-Regular',
            textDecorationLine: 'underline'
        }
    },
    container: {
        backgroundColor: colors.contentColor
    },
    content: {
        backgroundColor: colors.contentColor
    },
    overlay: {
        backgroundColor: colors.contentColor
    },
    border: {
        borderColor: colors.lineColor,
        borderLeftColor: colors.lineColor
    },
    menu: {
        backgroundColor: colors.contentColor
    },
    divider: {
        borderColor: colors.lineColor
    },
    shadow: {
        backgroundColor: colors.contentColor,
        shadowColor: colors.shadowColor
    },
    heading: {
        color: colors.primaryTextColor
    },
    title: {
        color: colors.primaryTextColor
    },
    text: {
        color: colors.primaryTextColor
    },
    subtext: {
        color: colors.secondaryTextColor
    },
    error: {
        color: colors.errorTextColor
    },
    code: {
        color: colors.primaryTextColor,
        borderColor: colors.lineColor
    },
    input: {
        color: colors.primaryTextColor
    },
    knob: {
        backgroundColor: colors.lineColor
    },
    sheet: {
        backgroundColor: colors.contentColor
    },
    active: {
        color: colors.primaryColor
    },
    inactive: {
        color: colors.hideColor
    },
    popup: {
        backgroundColor: colors.contentColor
    },
    negative: {
        color: colors.primaryTextColor
    },
    positive: {
        color: colors.primaryColor
    }
};

const darkTheme = {
    none: {},
    background: colors.contentDarkColor,
    primary: colors.primaryDarkColor,
    icon: colors.primaryTextDarkColor,
    skeleton: colors.hideDarkColor,
    navigation: {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            primary: colors.primaryDarkColor,
            background: colors.contentDarkColor,
            card: colors.contentDarkColor,
            text: colors.primaryTextDarkColor,
            border: colors.lineDarkColor,
            notification: colors.badgeDarkColor
        }
    },
    elements: {
        colors: {
            scheme: 'dark',
            background: colors.contentDarkColor,
            primary: colors.primaryDarkColor,
            secondary: colors.primaryDarkColor,
            grey0: colors.primaryTextDarkColor,
            grey1: colors.secondaryTextDarkColor,
            grey2: colors.secondaryTextDarkColor,
            grey3: colors.tertiaryTextDarkColor,
            grey4: colors.tertiaryTextDarkColor,
            grey5: colors.tertiaryTextDarkColor,
            error: colors.errorTextDarkColor,
            divider: colors.lineDarkColor,
            badge: colors.badgeDarkColor,
            hide: colors.hideDarkColor
        },
        Button: {
            titleStyle: {
                fontFamily: 'GoogleSans-Regular',
            },
            disabledTitleStyle: {
                color: colors.tertiaryTextDarkColor,
                fontFamily: 'GoogleSans-Regular'
            }
        },
        ButtonGroup: {
            containerStyle: {
                height: 30,
                marginVertical: 7.5,
                borderWidth: 0
            },
            buttonStyle: {
                backgroundColor: colors.hideDarkColor
            },
            selectedButtonStyle: {
                backgroundColor: colors.primaryTextDarkColor
            },
            textStyle: {
                fontSize: dimens.normalText,
                color: colors.primaryTextDarkColor,
                fontWeight: 'normal',
                fontFamily: 'GoogleSans-Regular'
            },
            selectedTextStyle: {
                fontSize: dimens.normalText,
                color: colors.primaryDarkColor,
                fontWeight: 'normal',
                fontFamily: 'GoogleSans-Regular'
            }
        },
        CheckBox: {
            containerStyle: {
                flex: 1,
                backgroundColor: 'transparent',
                margin: 0,
                marginLeft: 0,
                marginRight: 0,
                padding: 0,
                borderRadius: 0,
                borderWidth: 0
            },
            checkedColor: colors.primaryDarkColor,
            uncheckedColor: colors.primaryTextDarkColor,
            textStyle: {
                flex: 1,
                fontSize: dimens.mediumText,
                color: colors.primaryTextDarkColor,
                fontWeight: 'normal',
                fontFamily: 'GoogleSans-Regular',
                marginLeft: 10,
                marginRight: 0
            }
        },
        Divider: {
            backgroundColor: colors.lineDarkColor
        },
        Image: {
            placeholderStyle: {
                backgroundColor: colors.hideDarkColor
            }
        },
        Input: {
            containerStyle: {
                paddingHorizontal: 0
            },
            inputContainerStyle: {
                borderBottomWidth: 0
            },
            inputStyle: {
                height: 50,
                paddingVertical: 0,
                paddingHorizontal: 15,
                fontSize: dimens.mediumText,
                color: colors.primaryTextDarkColor,
                fontFamily: 'GoogleSans-Regular',
                borderWidth: 1,
                borderColor: colors.lineDarkColor,
                borderRadius: 10
            },
            errorStyle: {
                fontSize: dimens.smallText,
                color: colors.errorTextDarkColor,
                fontFamily: 'GoogleSans-Regular'
            }
        }
    },
    html: {
        p: {
            fontSize: dimens.mediumText,
            color: colors.primaryTextDarkColor,
            fontFamily: 'GoogleSans-Regular'
        },
        b: {
            fontSize: dimens.mediumText,
            color: colors.primaryTextDarkColor,
            fontFamily: 'GoogleSans-Bold'
        },
        a: {
            fontSize: dimens.mediumText,
            color: colors.primaryDarkColor,
            fontFamily: 'GoogleSans-Regular',
            textDecorationLine: 'underline'
        }
    },
    container: {
        backgroundColor: colors.contentDarkColor
    },
    content: {
        backgroundColor: colors.contentDarkColor
    },
    overlay: {
        backgroundColor: colors.contentDarkColor
    },
    border: {
        borderColor: colors.lineDarkColor,
        borderLeftColor: colors.lineDarkColor
    },
    menu: {
        backgroundColor: colors.contentDarkColor
    },
    divider: {
        borderColor: colors.lineDarkColor
    },
    shadow: {
        backgroundColor: colors.contentDarkColor,
        shadowColor: colors.shadowDarkColor
    },
    heading: {
        color: colors.primaryTextDarkColor
    },
    title: {
        color: colors.primaryTextDarkColor
    },
    text: {
        color: colors.primaryTextDarkColor
    },
    subtext: {
        color: colors.secondaryTextDarkColor
    },
    error: {
        color: colors.errorTextDarkColor
    },
    code: {
        color: colors.primaryTextDarkColor,
        borderColor: colors.lineDarkColor
    },
    input: {
        color: colors.primaryTextDarkColor
    },
    knob: {
        backgroundColor: colors.lineDarkColor
    },
    sheet: {
        backgroundColor: colors.contentDarkColor
    },
    active: {
        color: colors.primaryDarkColor
    },
    inactive: {
        color: colors.hideDarkColor
    },
    popup: {
        backgroundColor: colors.contentDarkColor
    },
    negative: {
        color: colors.primaryTextDarkColor
    },
    positive: {
        color: colors.primaryDarkColor
    }
};

export function helpers(name, theme) {
    return theme === 'dark' ? darkTheme[name] : lightTheme[name];
}
