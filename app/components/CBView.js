import React from 'react';
import {useColorScheme, View} from 'react-native';
import {helpers} from 'configs/themes';

const CBView = (props) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(props.define, scheme);
    return (
        <View {...props} style={[props.style, viewStyle]}/>
    );
};

export default CBView;

