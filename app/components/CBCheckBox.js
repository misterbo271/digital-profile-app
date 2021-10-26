import React from 'react';
import {CheckBox} from 'react-native-elements';

const CBCheckBox = (props) => {
    return (
        <CheckBox {...props} textStyle={props?.disabled ? {opacity: 0.3} : {}} iconType={'ionicon'} checkedIcon={'checkbox'} uncheckedIcon={'square-outline'}/>
    );
};

export default CBCheckBox;

