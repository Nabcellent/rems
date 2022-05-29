import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getTelcoFromPhone, parsePhone } from '@/utils/helpers';

const PhoneBadge = ({ phone }) => {
    let number = String(phone);

    const telco = getTelcoFromPhone(number);
    let color = 'secondary';

    if (telco === 'safaricom') {
        color = '#59BC58';
    } else if (telco === 'airtel') {
        color = '#EE4326';
    } else if (telco === 'telkom') {
        color = '#30AACB';
    }

    return (
        <Badge pill bg={color} className={`font-size-12`} style={{ backgroundColor: color }}>
            {parsePhone(number)}
        </Badge>
    );
};

PhoneBadge.propTypes = {
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default PhoneBadge;