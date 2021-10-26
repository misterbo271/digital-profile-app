import React from 'react';
import {useColorScheme} from 'react-native';
import {Icon} from 'react-native-elements';
import {helpers} from 'configs/themes';

const CBIcon = (props) => {
    const scheme = useColorScheme();
    const iconColor = helpers(props.define, scheme);
    return <Icon {...props} color={props.color || iconColor}/>;
};

export default CBIcon;

