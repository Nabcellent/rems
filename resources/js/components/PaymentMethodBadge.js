import { PaymentMethod } from '@/utils/enums';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import { CreditCard, Paid } from '@mui/icons-material';

const PaymentMethodBadge = ({ method, variant = 'outlined' }) => {
    let color = 'default', icon;

    if (method === PaymentMethod.MPESA) {
        color = 'success';
        icon = <Paid/>;
    } else if (method === PaymentMethod.PAYPAL) {
        color = 'info';
        icon = <CreditCard/>;
    }

    return <Chip icon={icon} sx={{ px: .5 }} color={color} label={method ?? 'N/A'} variant={variant}/>;
};

PaymentMethodBadge.propTypes = {
    method: PropTypes.string,
    bg: PropTypes.bool
};

export default PaymentMethodBadge;
