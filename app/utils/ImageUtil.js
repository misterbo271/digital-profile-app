export default class ImageUtil {

    static images = {
        bg_not_found: require('assets/images/bg_not_found.png'),
        bg_warning: require('assets/images/bg_warning.png'),
        ic_download: require('assets/images/ic_download.png'),
        ic_flag: require('assets/images/ic_flag.png'),
        ic_notification: require('assets/images/ic_notification.png'),
        logo_intro_0: require('assets/images/logo_intro_0.png'),
        logo_intro_1: require('assets/images/logo_intro_1.png'),
        logo_intro_2: require('assets/images/logo_intro_2.png')
    };

    static getImage(imageUrl) {
        if (imageUrl && imageUrl.indexOf('http') > -1) {
            const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1, imageUrl.length);
            const fileNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
            if (fileNameWithoutExtension && this.images[fileNameWithoutExtension]) {
                return this.images[fileNameWithoutExtension];
            } else {
                return {uri: imageUrl};
            }
        } else if (imageUrl && imageUrl.indexOf('base64') > -1) {
            return {uri: imageUrl};
        } else {
            if (this.images[imageUrl]) {
                return this.images[imageUrl];
            } else {
                return require('assets/images/ic_loading.gif');
            }
        }
    }
}
