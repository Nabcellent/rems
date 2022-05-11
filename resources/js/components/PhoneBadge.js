import { Badge } from 'react-bootstrap';
import { parsePhoneNumber } from 'libphonenumber-js';
import PropTypes from 'prop-types';

const PhoneBadge = ({ phone }) => {
    let color = 'primary';

    return (
        <Badge pill bg={color} className={`font-size-12`}>
            {parsePhoneNumber(String(phone), "KE").number}
        </Badge>
    );
};

PhoneBadge.propTypes = {
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default PhoneBadge;
