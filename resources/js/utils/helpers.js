import moment from 'moment';
import { parsePhoneNumber } from 'libphonenumber-js';
import { Inertia } from '@inertiajs/inertia';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Telco } from '@/utils/enums';

const Sweet = withReactContent(Swal);

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
    phone = String(phone);

    const safRegEx = /^(?:254|\+254|0)?((?:7(?:[0129]\d|4[0123568]|5[789]|6[89])|(1(1[0-5])))\d{6})$/,
        airtelRegEx = /^(?:254|\+254|0)?((?:(7(?:(3\d)|(5[0-6])|(6[27])|(8\d)))|(1(0[0-6])))\d{6})$/,
        telkomRegEx = /^(?:254|\+254|0)?(7(7\d)\d{6})$/,
        equitelRegEx = /^(?:254|\+254|0)?(7(6[3-6])\d{6})$/,
        faibaRegEx = /^(?:254|\+254|0)?(747\d{6})$/;

    if (phone.match(safRegEx)) {
        return Telco.SAFARICOM;
    } else if (phone.match(airtelRegEx)) {
        return Telco.AIRTEL;
    } else if (phone.match(telkomRegEx)) {
        return Telco.TELKOM;
    } else if (phone.match(equitelRegEx)) {
        return Telco.EQUITEL;
    } else if (phone.match(faibaRegEx)) {
        return Telco.FAIBA;
    } else {
        return null;
    }
};

export const str = {
    headline: str => {
        if(!str) return ""

        str = str.replaceAll('_', ' ').replaceAll('-', ' ');

        return str.replaceAll(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase());
    },
    ucFirst: str => {
        str = str.toLowerCase();

        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};

export const Arr = {
    removeItems: (arr, itemsToRemove) => arr.filter(v => !itemsToRemove.includes(v)),
    only: (arr, keys) => arr.filter(a => keys.includes(a))
};

export const parsePhone = phone => phone && parsePhoneNumber(String(phone), 'KE').number;

export const getInitials = str => {
    let initials = str.match(/\b(\w)/g);

    return initials.join('').toUpperCase();
};

export const handleDelete = (route, title) => {
    if (route) {
        Sweet.fire({
            title: 'Are you sure?',
            text: `You won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, delete ${title ?? 'it'}!`,
            showLoaderOnConfirm: true
        }).then(result => result.isConfirmed && Inertia.delete(route));
    }
};
