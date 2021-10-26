import React from 'react';
import {TouchableOpacity, useColorScheme} from 'react-native';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBRound = ({style, define, children, onPress}) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(define, scheme);
    return (
        <TouchableOpacity style={[appStyles.round, style, viewStyle]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

export default CBRound;
