import moment from 'moment';

export default class TimeUtil {

    static getTimezone() {
        return moment().utcOffset() / 60;
    }

    static getCurrentUnix() {
        const now = moment().format('HH:mm');
        return moment(now, 'HH:mm').unix();
    }

    static getCurrent() {
        return moment().format('HH:mm');
    }
}
