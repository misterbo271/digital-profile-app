import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'
import CBIcon from 'components/CBIcon'
import { isIphoneX } from 'react-native-iphone-x-helper'
import colors from 'configs/colors'
const ISIOS = Platform.OS === 'ios'

const { width } = Dimensions.get('window')

export default class CBHeader extends Component {
    render () {
        const {
            goBack,
            title,
            containerStyles,
            titleContainerStyle,
            titleColor,
            titleStyle
        } = this.props
        return (
            <View style={[styles.headerContainer, containerStyles]}>
                <View style={[styles.titleContainer, titleContainerStyle]}>
                    {/*{goBack && (*/}
                    {/*    <TouchableOpacity style={styles.btnBack} onPress={() => goBack()}>*/}
                    {/*        <CBIcon type={'ionicon'} name="arrow-back-outline" size={30} color={titleColor}/>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*)}*/}
                    <TouchableOpacity style={styles.btnBack} onPress={() => goBack()}>
                        <CBIcon type={'ionicon'} name="arrow-back-outline" size={28} color={titleColor}/>
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: titleColor || '#1A1A1A' }, titleStyle]}>
                        {title}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: ISIOS ? (isIphoneX() ? 55 : 40) : 40,
        paddingBottom: 30,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        fontSize: 18,
        color: colors.primaryColor,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'GoogleSans-Bold',
        letterSpacing: -0.25
    },
    btnBack: {
        height: 40,
        width: 40,
        position: 'absolute',
        // top: -10,
        left: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

