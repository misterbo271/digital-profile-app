import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'
import LeftIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from 'lodash'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'configs/colors'
import {appStyles} from 'configs/styles'


class CBListItem extends PureComponent {
    static propTypes = {
        hasBorderBottom: PropTypes.bool,
        isSignIned: PropTypes.bool,
        leftIconSource: PropTypes.number,
        title: PropTypes.string,
        boldTitle: PropTypes.string,
        hotline: PropTypes.string,
        onPress: PropTypes.func,
        description: PropTypes.string,
        borderBottomColor: PropTypes.string
    }

    render () {
        const {
            hasBorderBottom,
            isSignIned,
            leftIconSource,
            title,
            titleColor,
            onPress,
            hotline,
            leftIcon,
            covidWarning,
            boldTitle,
            description,
            hideArrowRight = true,
            borderBottomColor
        } = this.props
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={[
                    hasBorderBottom ? [appStyles.borderBottom, { borderBottomColor: borderBottomColor }] : null,
                    appStyles.listItem
                ]}>

                    {covidWarning
                        ? <MaterialIcon
                            style={{ marginHorizontal: 10 }}
                            name={leftIcon || 'masks'}
                            size={24} color={isSignIned ? colors.green : '#B8B8B8'}/>
                        : <LeftIcon
                            style={{ marginHorizontal: 10 }}
                            name={leftIcon || 'call'}
                            size={24}
                            // color={isSignIned ?  colors.orange : '#B8B8B8'}/>
                            color={colors.orange}/>
                    }
                    <View style={[appStyles.mid, { marginLeft: 10 }]}>
                        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                            <Text style={[appStyles.font_14_16, { color: titleColor || '#4D4D4D' }]}>{title}
                                {!_.isEmpty(hotline) ? ': ' : ''}</Text>
                            <Text style={[appStyles.font_14_16, appStyles.textBold]}> {boldTitle}</Text>
                            <Text style={[appStyles.font_14_16, appStyles.colorRed]}>{hotline}</Text>
                        </View>
                        {description &&
                        <Text style={appStyles.description}>{description}</Text>
                        }
                    </View>
                    {hideArrowRight && (
                        <View style={appStyles.right}>
                            {/*{isSignIned ? <Icon name='chevron-right' color={'#B8B8B8'} size={20}/>*/}
                            {/*    : <Icon name='lock' color={'#B8B8B8'} size={20}/>*/}
                            {/*}*/}
                             <Icon name='chevron-right' color={'#B8B8B8'} size={20}/>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        )
    }
}

export default CBListItem
