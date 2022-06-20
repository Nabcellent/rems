import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Paper } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import { currencyFormat } from '@/utils/helpers';
import moment from 'moment';
import StatusChip from '@/components/chips/StatusChip';
import PhoneChip from '@/components/chips/PhoneChip';

const Show = ({ errors, lease }) => {
    console.log(lease);

    return (
        <Dashboard errors={errors} title={`Leases #${lease.id}`}>
            <Breadcrumbs title="Leases" breadcrumbItem={`#${lease.id}`}/>

            <Paper className={'mb-3'}>
                <Card.Body>
                    <Row>
                        <Col md={6} lg={4} className={'mb-4 mb-lg-0'}>
                            <h5>
                                Lease. <StatusChip status={lease.status} entity={'lease'} entityId={lease.id}/>
                            </h5>
                            <h6>Lease Address</h6>
                            <p className="mb-1 fs--1">{lease.unit.estate.address}</p>
                            <p className="mb-0 fs--1"><strong>Deposit:</strong> {currencyFormat(lease.deposit)}</p>
                            <p className="mb-2 fs--1">
                                <strong>Rent Amount:</strong> {currencyFormat(lease.rent_amount)}
                            </p>
                            <p className="mb-1 fs--1">
                                <strong>Expiry date: </strong>
                                {moment(lease.expires_at).format("MMM Do YYYY")}
                            </p>
                        </Col>
                        <Col md={6} lg={4} className={'mb-4 mb-lg-0'}>
                            <h5>Owner.</h5>
                            <h6>Owner Address</h6>
                            <p className="mb-0 fs--1">
                                <strong>Email: </strong>
                                <a href={`mailto:${lease.unit.user.email}`}>{lease.unit.user.email}</a>
                            </p>
                            <hr/>
                            <PhoneChip phone={lease.unit.user.phone} link/>
                        </Col>
                        <Col md={6} lg={4}>
                            <h5>Tenant.</h5>
                            <h6>Tenant Address</h6>
                            <p className="mb-0 fs--1">
                                <strong>Email: </strong>
                                <a href={`mailto:${lease.user.email}`}>{lease.user.email}</a>
                            </p>
                            <hr/>
                            <PhoneChip phone={lease.user.phone} link/>
                        </Col>
                    </Row>
                </Card.Body>
            </Paper>
        </Dashboard>
    );
};

export default Show;
