import { Badge } from 'react-bootstrap';

const StatusBadge = ({ status }) => {
    let color;
    if (status === 'COMPLETED') {
        color = 'success';
    } else if (status === 'PENDING') {
        color = 'warning';
    } else if (status === 'FAILED') {
        color = 'danger';
    }

    return <Badge pill bg={color} className={`font-size-12`}>{status}</Badge>;
};

export default StatusBadge;
