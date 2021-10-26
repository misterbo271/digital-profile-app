import React from 'react';
import {TouchableOpacity, useColorScheme} from 'react-native';
import {helpers} from 'configs/themes';

const CBTouchableOpacity = (props) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(props.define, scheme);
    return (
        <TouchableOpacity {...props} style={[props.style, viewStyle]}/>
    );
};

export default CBTouchableOpacity;

