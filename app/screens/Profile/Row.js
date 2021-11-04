import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {CBIcon} from 'components/index'
import {strings} from 'controls/i18n'

class Row extends Component {
    constructor (props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    render () {
        const { title, theme, onRequestClose, onPress, onCloseModal } = this.props
        return (
            <View style={[styles.modal]}>
                <View >
                    <TouchableOpacity
                        style={{ marginTop: 20 }}
                        onPress={onCloseModal}>
                        <CBIcon type={'ionicon'} name='close' size={25} ></CBIcon>
                    </TouchableOpacity>
                    <Text style={[styles.title]}>{title}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <TouchableOpacity
                        style={[styles.button, { marginRight: 10 }]}
                        onPress={onRequestClose}>
                        <View >
                            <Text style={[styles.txtButton, { color: '#000' }]}>{strings('NO')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.primaryColor }]}
                        onPress={onPress}>
                        <View >
                            <Text style={[styles.txtButton, { color: '#fff' }]}> {strings('YES')} </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Row

const styles = StyleSheet.create({
    modal: {
        paddingHorizontal: 0,
        flex: 1
    },
    title: {
        fontSize: 18,
        fontFamily: 'GoogleSans-Bold',

        color: '#000000',
        marginVertical: 16
    },
    button: {
        backgroundColor: '#fff',
        height: 41,
        width: 160,
        borderWidth: 1,
        borderColor: '#00000033',
        alignItems: 'center'
    },
    txtButton: {
        fontFamily: 'GoogleSans-Bold',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 16
    }
})
