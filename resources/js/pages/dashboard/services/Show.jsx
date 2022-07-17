import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Paper } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import DataTable from '@/components/common/datatable';
import { ReadMore } from '@mui/icons-material';
import { Link } from '@inertiajs/inertia-react';
import CardBgCorner from '@/components/CardBgCorner';
import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Role } from '@/utils/enums';

const Show = ({ errors, service }) => {
    console.log(service);

    return (
        <Dashboard errors={errors} title={'Service'}>
            <Breadcrumbs title="Service" breadcrumbItem={`#${service.id}`}/>

            <Paper className={'mb-3'}>
                <CardBgCorner corner={3}/>
                <Card.Body>
                    <Row>
                        <Col md={6} lg={4} className={'mb-4 mb-lg-0'}>
                            <h5>{service.icon}</h5>
                            <h6>Service Details.</h6>
                            <p className="mb-1 fs--1">{service.name}</p>
                            <p className="mb-0 fs--1">{service.description}</p>

                            <p className="mb-1 fs--1">
                                <strong>Created On: </strong>{moment(service.created_at).format("MMMM Do YYYY")}
                            </p>
                        </Col>
                    </Row>
                </Card.Body>
            </Paper>

            <Paper className={'p-3'}>
                <DataTable title={'Service Providers'} data={service.providers} perPage={5} columns={[
                    {
                        accessorKey: 'email',
                        header: 'Email',
                    },
                    {
                        accessorKey: 'phone',
                        header: 'Phone',
                    },
                    {
                        id: 'actions',
                        cell: ({ row }) => (
                            <Link href={route('dashboard.services.show', row.original)}>
                                <ReadMore fontSize={'small'}/>
                            </Link>
                        )
                    },
                ]} onCreateRow={() => Inertia.get(route('dashboard.users.create', { role: Role.SERVICE_PROVIDER }))}/>
            </Paper>
        </Dashboard>
    );
};

export default Show;
