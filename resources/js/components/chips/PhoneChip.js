import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getTelcoFromPhone, parsePhone } from '@/utils/helpers';
import { Telco } from '@/utils/enums';
import { Chip } from '@mui/material';
import { Phone } from '@mui/icons-material';

const PhoneChip = ({ phone }) => {
    const telco = getTelcoFromPhone(phone);
    let color = 'secondary';

    if (telco === Telco.SAFARICOM) {
        color = '#59BC58';
    } else if (telco === Telco.AIRTEL) {
        color = '#EE4326';
    } else if (telco === Telco.TELKOM) {
        color = '#30AACB';
    }

    return <Chip icon={<Phone/>} sx={{ px: .5, bgcolor: color }} className={`font-size-12`} label={phone ? parsePhone(phone) : 'N/A'}/>;
};

PhoneChip.propTypes = {
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default PhoneChip;
