import React from 'react';
import {CheckBox} from 'react-native-elements';

const CBRadio = (props) => {
    return (
        <CheckBox {...props} textStyle={props?.disabled ? {opacity: 0.3} : {}} iconType={'ionicon'} checkedIcon={'radio-button-on-outline'} uncheckedIcon={'radio-button-off-outline'}/>
    );
};

export default CBRadio;

