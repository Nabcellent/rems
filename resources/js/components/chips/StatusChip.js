import { Status } from '@/utils/enums';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import { Check, Error, Info, Pending } from '@mui/icons-material';

const StatusChip = ({ status, bg = true }) => {
    let color = 'default', icon;
    if ([Status.COMPLETED, Status.ACTIVE, Status.RESOLVED].includes(status)) {
        color = 'success';
        icon = <Check fontSize="small"/>;
    } else if (status === Status.PENDING) {
        color = 'warning';
        icon = <Pending fontSize="small"/>;
    } else if (status === Status.CANCELLED) {
        color = 'info';
        icon = <Info fontSize="small"/>;
    } else if ([Status.FAILED, Status.INACTIVE].includes(status)) {
        color = 'error';
        icon = <Error fontSize="small"/>;
    }

    return (
        <Chip sx={{ px: .5 }}
              variant={bg ? 'filled' : 'outlined'}
              color={color} className={`font-weight-bold font-size-11`}
              label={<span><b>Status:</b> {status}</span>}
              icon={icon}
        />
    );
};

StatusChip.propTypes = {
    status: PropTypes.string.isRequired,
    bg: PropTypes.bool
};

export default StatusChip;
