import React from 'react';
import {CBContainer, CBText} from 'components';
import {appStyles} from 'configs/styles';

import Base from 'screens/Base';

export default class Dummy extends Base {

    render() {
        return (
            <CBContainer style={{alignItems: 'center', justifyContent: 'center'}}>
                <CBText style={appStyles.text} define={'text'}>{'Dummy'}</CBText>
            </CBContainer>
        );
    }
}
