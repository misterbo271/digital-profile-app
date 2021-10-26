import React from 'react';
import {TouchableWithoutFeedback, useColorScheme} from 'react-native';
import {helpers} from 'configs/themes';

const CBTouchableWithoutFeedback = (props) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(props.define, scheme);
    return (
        <TouchableWithoutFeedback {...props} style={[props.style, viewStyle]}/>
    );
};

export default CBTouchableWithoutFeedback;

