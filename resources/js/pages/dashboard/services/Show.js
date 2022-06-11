import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { IconButton, Paper } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import { currencyFormat, handleDelete } from '@/utils/helpers';
import moment from 'moment';
import StatusChip from '@/components/chips/StatusChip';
import DataTable from '@/components/common/datatable';
import { Inertia } from '@inertiajs/inertia';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Link } from '@inertiajs/inertia-react';

const Show = ({ errors, service }) => {
    console.log(service);

    return (
        <Dashboard errors={errors} title={'Service'}>
            <Breadcrumbs title="Service" breadcrumbItem={`#${service.id}`}/>

            <Paper className={'mb-3'}>
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
                <DataTable title={'Service Providers'} data={service.providers} perPage={5}
                           viewAll={route('dashboard.service-providers.index')} columns={[
                    {
                        accessor: 'email',
                        Header: 'Email',
                    },
                    {
                        accessor: 'phone',
                        Header: 'Phone',
                    },
                    {
                        accessor: 'actions',
                        disableSortBy: true,
                        className: 'text-end',
                        Cell: ({ row }) => {
                            const serviceProvider = row.original;

                            return (
                                <>
                                    <Link href={route('dashboard.services.show', { service: serviceProvider.id })}>
                                        <ReadMore fontSize={'small'}/>
                                    </Link>
                                </>
                            );
                        }
                    },
                ]}/>
            </Paper>
        </Dashboard>
    );
};

export default Show;
