import DialogAlertHolder from '../../DialogAlertHolder';
import RootNavigation from 'screens/RootNavigation';
import CBNotificationId from 'constants/CBNotificationId';
import CBGlobal from 'globals/CBGlobal';
import JsonUtil from 'utils/JsonUtil';

export default class CBNotificationHandler {

    static onReceived(action, notification) {
        if (notification) {
            if (CBGlobal.appInitialize) {
                const title = notification?.payload?.title || notification?.title;
                const body = notification?.payload?.body || notification?.body;
                const categoryId = Number(notification?.payload?.additionalData?.categoryId || notification?.additionalData?.categoryId);
                if (categoryId === CBNotificationId.POPUP_NOTIFICATION) {
                    const data = notification?.payload?.additionalData || notification?.additionalData;
                    const heading = data?.heading;
                    const content = data?.content;
                    const buttons = JsonUtil.parseJsonString(data?.buttons);
                    const options = JsonUtil.parseJsonString(data?.options);
                    DialogAlertHolder.alert(heading || title, content || body, buttons || [], options || {});
                } else {
                    //CBSync.syncNotification();
                }
            }
        }
    }

    static onClick(action, data) {
        if (data) {
            if (!CBGlobal.appInitialize || !RootNavigation.isAvailable()) {
                CBGlobal.appNotification = data;
            } else {
                const extras = JsonUtil.parseJsonString(data?.extras);
                if (extras?.refId) {
                    RootNavigation.navigate(extras?.refId, {defaultParam: extras?.defaultParam});
                } else {
                    const categoryId = Number(data?.categoryId);
                    switch (categoryId) {
                        case CBNotificationId.INFORMATION:
                            break;
                        case CBNotificationId.NEW_VERSION:
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
}
