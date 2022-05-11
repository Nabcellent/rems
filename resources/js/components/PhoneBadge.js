import { Badge } from 'react-bootstrap';
import { parsePhoneNumber } from 'libphonenumber-js';
import PropTypes from 'prop-types';
import { getTelcoFromPhone } from '@/utils/helpers';

const PhoneBadge = ({ phone }) => {
    let number = String(phone);

    const telco = getTelcoFromPhone(number);
    let color = 'primary';

    if (telco === 'safaricom') {
        color = 'success';
    } else if (telco === 'airtel') {
        color = 'danger';
    } else if (telco === 'telkom') {
        color = 'warning';
    }

    return (
        <Badge pill bg={color} className={`font-size-12`}>
            {parsePhoneNumber(number, "KE").number}
        </Badge>
    );
};

PhoneBadge.propTypes = {
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default PhoneBadge;
