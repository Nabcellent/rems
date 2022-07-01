import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Paper } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import { Link } from '@inertiajs/inertia-react';
import StatusChip from '@/components/chips/StatusChip';
import CardBgCorner from '@/components/CardBgCorner';

const Show = ({ errors, ticket }) => {
    console.log(ticket);

    return (
        <Dashboard errors={errors} title={'Ticket'}>
            <Breadcrumbs title="Ticket" breadcrumbItem={`#${ticket.id}`}/>

            <Paper className={'mb-3 d-flex flex-column'}>
                <CardBgCorner corner={2}/>
                <Card.Body>
                    <Row>
                        <Col xs={12} className={'d-flex justify-content-between align-items-start'}>
                            <h4>Ticket.</h4><StatusChip status={ticket.status}/>
                        </Col>
                        <Col lg={6} className={'mb-4 mb-lg-0'}>
                            <h5>Title.</h5>
                            <p className="mb-1 fs--1">{ticket.title}</p>

                            <div className={'border-dashed-bottom my-2'}></div>

                            <h5>Issue Description.</h5>
                            <p className="mb-1 fs--1">{ticket.description}</p>
                        </Col>
                        <Col lg={6}>
                            <h5>User.</h5>
                            <p className="mb-0 fs--1">
                                <strong>Name: </strong>
                                <Link href={route('dashboard.users.show', { user: ticket.user.id })}>
                                    {ticket.user.full_name}
                                </Link>
                            </p>
                            <p className="mb-0 fs--1">
                                <strong>Email: </strong>
                                <a href={`mailto:${ticket.user.email}`}>{ticket.user.email}</a>
                            </p>
                            <p className="mb-0 fs--1">
                                <strong>Phone: </strong>
                                <a href={`tel:${ticket.user.phone}`}>+{ticket.user.phone}</a>
                            </p>
                        </Col>
                        <Col xs={12} className={'text-end'}>
                            <i className="mb-1 fs--1">
                                Created On: <strong>{moment(ticket.created_at).format("MMMM Do YYYY")}</strong>
                            </i>
                        </Col>
                    </Row>
                </Card.Body>
            </Paper>
        </Dashboard>
    );
};

export default Show;
