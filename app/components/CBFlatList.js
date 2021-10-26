import React from 'react';
import {FlatList, useColorScheme} from 'react-native';
import {helpers} from 'configs/themes';

const CBFlatList = (props) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(props.define, scheme);
    return (
        <FlatList {...props} style={[props.style, viewStyle]}/>
    );
};

export default CBFlatList;

