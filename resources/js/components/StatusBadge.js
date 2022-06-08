import { Badge } from 'react-bootstrap';
import { Status } from '@/utils/enums';

const StatusBadge = ({ status, bg = true }) => {
    let color;
    if ([Status.COMPLETED, Status.ACTIVE, Status.RESOLVED].includes(status)) {
        color = 'success';
    } else if (status === Status.PENDING) {
        color = 'warning';
    } else if (status === Status.CANCELLED) {
        color = 'info';
    } else if ([Status.FAILED, Status.INACTIVE].includes(status)) {
        color = 'danger';
    }

    return (
        <Badge pill bg={bg ? color : 'transparent'} text={bg ? 'white' : color}
               className={`font-weight-bold font-size-12`}>{status}
        </Badge>
    );
};

export default StatusBadge;
