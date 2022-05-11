import { Badge } from 'react-bootstrap';

const StatusBadge = ({ status, bg = true }) => {
    let color;
    if (['COMPLETED', 'ACTIVE'].includes(status)) {
        color = 'success';
    } else if (status === 'PENDING') {
        color = 'warning';
    } else if (['FAILED', 'INACTIVE'].includes(status)) {
        color = 'danger';
    }

    return <Badge pill bg={bg ? color : 'transparent'} text={bg ? 'white' : color}
                  className={`font-weight-bold font-size-12`}>
        {status}
    </Badge>;
};

export default StatusBadge;
