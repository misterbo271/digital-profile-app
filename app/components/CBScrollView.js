import React from 'react';
import {ScrollView, useColorScheme} from 'react-native';
import {helpers} from 'configs/themes';

const CBScrollView = (props) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(props.define, scheme);
    return (
        <ScrollView {...props} style={[props.style, viewStyle]}/>
    );
};

export default CBScrollView;

