import PropTypes from 'prop-types';
import { getTelcoFromPhone, parsePhone } from '@/utils/helpers';
import { Telco } from '@/utils/enums';
import { Chip } from '@mui/material';
import { Phone } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';

const PhoneChip = ({ phone, bg = false, link = true, textOnly = false }) => {
    const telco = getTelcoFromPhone(phone);
    let color = 'grey',
        phoneNumber = phone ? parsePhone(phone) : 'N/A';

    if (telco === Telco.SAFARICOM) {
        color = '#59BC58';
    } else if (telco === Telco.AIRTEL) {
        color = '#EE4326';
    } else if (telco === Telco.TELKOM) {
        color = '#30AACB';
    }

    if (textOnly) return <a href={phoneNumber ? `tel:${phoneNumber}` : '#'} style={{ color }}>{phoneNumber}</a>;

    return (
        <Chip component={'a'} href={(link && phone) ? `tel:${phone}` : '#'}
              icon={<Phone style={{ color }}/>}
              variant={bg ? 'filled' : 'outlined'}
              sx={{ px: .5, bgcolor: bg ? color : '', borderColor: bg ? '' : color, color: bg ? '' : color }}
              className={`font-size-12`}
              label={<b>{phoneNumber}</b>}
        />
    );
};

PhoneChip.propTypes = {
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bg: PropTypes.bool,
    link: PropTypes.bool
};

export default PhoneChip;
