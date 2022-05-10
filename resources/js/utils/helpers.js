import moment from 'moment';

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
})).format(number)
