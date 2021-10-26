import React from 'react';
import {CheckBox} from 'react-native-elements';

const CBToggle = (props) => {
    return (
        <CheckBox {...props} iconType={'fontisto'} checkedIcon={'toggle-on'} uncheckedIcon={'toggle-off'} size={40}/>
    );
};

export default CBToggle;

