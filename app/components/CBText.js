import React from 'react';
import {Text, useColorScheme} from 'react-native';
import {helpers} from 'configs/themes';

const CBText = (props) => {
    const scheme = useColorScheme();
    const textStyle = helpers(props.define, scheme);
    return (
        <Text {...props} style={[props.style, textStyle]}/>
    );
};

export default CBText;

