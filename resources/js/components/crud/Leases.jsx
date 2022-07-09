import { Card } from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react';
import { Alert, Avatar } from '@mui/material';
import { CheckCircleOutlineTwoTone, Home } from '@mui/icons-material';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Status } from '@/utils/enums';

const Leases = ({ leases }) => {

    return (
        <>
            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                <h5 className={'mb-0'}>Leases</h5>
            </Card.Header>
            <Card.Body>
                {
                    !leases.length
                        ? <Alert severity="info">This {unitable} hasn't any unit yet.</Alert>
                        : leases.map(lease => (
                            <Link key={`lease-${lease.id}`} className="d-flex align-items-center p-1"
                                  href={route('dashboard.leases.show', { lease: lease.id })}>
                                <Avatar sx={{ width: 30, height: 30 }} className="me-3"><Home/></Avatar>
                                <div className="w-100">
                                    <h6 className="mb-0">
                                        Unit {lease.status === Status.ACTIVE &&
                                        <CheckCircleOutlineTwoTone color={'success'}/>}
                                    </h6>
                                    <div className={'d-flex justify-content-between'}>
                                        <small className="mb-1">Hse No: <strong>{lease.unit.house_number}</strong></small>
                                        <small className="text-muted">
                                            <i>{moment(lease.created_at).format("MMMM D, LT")}</i>
                                        </small>
                                    </div>
                                </div>
                            </Link>
                        ))
                }
            </Card.Body>
        </>
    );
};

Leases.propTypes = {
    leases: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Leases;
