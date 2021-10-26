import React from 'react';
import {Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

import Base from 'screens/Base';

export default class Tracking extends Base {

    componentDidMount() {
        super.componentDidMount();
        this.checkTrackingPermission();
    }

    checkTrackingPermission = async () => {
        if (Platform.OS === 'ios') {
            const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
            if (result === RESULTS.GRANTED) {
                this.onSuccessTracking();
            } else {
                this.requestTrackingPermission();
            }
        } else {
            this.onSuccessTracking();
        }
    };

    requestTrackingPermission = async () => {
        const result = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
        if (result === RESULTS.GRANTED) {
            this.onSuccessTracking();
        } else {
            this.onFailureTracking();
        }
    };

    onSuccessTracking() {

    }

    onFailureTracking() {

    }
}
