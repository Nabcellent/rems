import moment from 'moment';
import { parsePhoneNumber } from 'libphonenumber-js';

/** ------------------------------------    DATE HELPERS
 * */

const REFERENCE = moment(); // fixed just for testing, use moment();
const TODAY = REFERENCE.clone().startOf("day");
const YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");
const A_WEEK_OLD = REFERENCE.clone().subtract(7, "days").startOf("day");

export const isToday = date => date.isSame(TODAY, "d");
export const isYesterday = date => date.isSame(YESTERDAY, "d");
export const isWithinAWeek = date => date.isAfter(A_WEEK_OLD);
export const isTwoWeeksOrMore = date => !isWithinAWeek(date);

export const currencyFormat = (number, currency = 'KES') => (new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency
})).format(number);

export const getTelcoFromPhone = phone => {
    const safRegEx = /^(?:254|\+254|0)?((?:7(?:[0129]\d|4[0123568]|5[789]|6[89])|(1(1[0-5])))\d{6})$/,
        airtelRegEx = /^(?:254|\+254|0)?((?:(7(?:(3\d)|(5[0-6])|(6[27])|(8\d)))|(1(0[0-6])))\d{6})$/,
        telkomRegEx = /^(?:254|\+254|0)?(7(7\d)\d{6})$/,
        equitelRegEx = /^(?:254|\+254|0)?(7(6[3-6])\d{6})$/,
        faibaRegEx = /^(?:254|\+254|0)?(747\d{6})$/;

    if (phone.match(safRegEx)) {
        return 'safaricom';
    } else if (phone.match(airtelRegEx)) {
        return 'airtel';
    } else if (phone.match(telkomRegEx)) {
        return 'telkom';
    } else if (phone.match(equitelRegEx)) {
        return 'equitel';
    } else if (phone.match(faibaRegEx)) {
        return 'faiba';
    } else {
        return null;
    }
};

export const str = {
    headline: str => {
        str = str.replaceAll('_', ' ').replaceAll('-', ' ');

        return str.replaceAll(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase());
    }
};

export const parsePhone = phone => phone && parsePhoneNumber(String(phone), 'KE').number;

export const getInitials = str => {
    let initials = str.match(/\b(\w)/g);

    return initials.join('').toUpperCase();
}
