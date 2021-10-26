import {Linking, Platform} from 'react-native';
import DialogAlertHolder from '../../DialogAlertHolder';
import CBConstant from 'constants/CBConstant';
import {strings} from 'controls/i18n';

export default class CBHandler {

    static openUrl(url) {
        Linking.canOpenURL(url).then((supported) => {
            if (!supported) {
                DialogAlertHolder.alert(strings('title_alert_open_url'), strings('message_alert_open_url'));
            }
            return Linking.openURL(url);
        }).catch((error) => console.error('An error occurred', error));
    }

    static openAppIntoStore() {
        if (Platform.OS === 'ios') {
            Linking.openURL(CBConstant.APP_STORE_LINK).catch((error) => console.error('An error occurred', error));
        } else {
            Linking.openURL(CBConstant.PLAY_STORE_LINK).catch((error) => console.error('An error occurred', error));
        }
    }
}
