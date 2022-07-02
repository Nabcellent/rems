import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { IconButton, Paper } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import StatusChip from '@/components/chips/StatusChip';
import PhoneChip from '@/components/chips/PhoneChip';
import React from 'react';
import CardBgCorner from '@/components/CardBgCorner';
import Banner from '@/components/Banner';
import PaymentPlans from '@/components/crud/PaymentPlans';
import { Link } from '@inertiajs/inertia-react';
import { Edit } from '@mui/icons-material';

const Show = ({ errors, lease }) => {
    console.log(lease);

    return (
        <Dashboard errors={errors} title={`Leases #${lease.id}`}>
            <Breadcrumbs title="Leases" breadcrumbItem={`#${lease.id}`}/>

            <Banner title={'Lease.'} actions={[
                <IconButton component={Link} className={'mx-1'}
                            href={route(`dashboard.leases.edit`, lease)}> <Edit/>
                </IconButton>
            ]}/>

            <Paper className={'mb-3'}>
                <CardBgCorner corner={2}/>
                <Card.Body>
                    <Row>
                        <Col md={6} lg={4} className={'mb-4 mb-lg-0'}>
                            <h5>
                                Lease. <StatusChip status={lease.status} entity={'lease'} entityId={lease.id}/>
                            </h5>
                            <h6>Lease Address</h6>
                            <p className="mb-2 fs--1">{lease.unit.estate.address}</p>
                            <p className="mb-0 fs--1">
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

            <Row>
                <Col>
                    <PaymentPlans plans={lease.payment_plans} leaseId={lease.id}/>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Show;
