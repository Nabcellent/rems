import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { IconButton } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { handleDelete } from '@/utils/helpers';

const Index = ({ services }) => {
    console.log(services);

    return (
        <Dashboard title={'Services'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Services" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Card>
                        <Card.Body>
                            <DataTable title={'Services'} columns={[
                                {
                                    accessor: 'icon',
                                    disableSortBy: true,
                                },
                                {
                                    accessor: 'name',
                                    Header: 'Service Name',
                                },
                                {
                                    accessor: 'description',
                                    Header: 'Description',
                                    Cell: ({ row }) => row.original.description || 'N / A'
                                },
                                {
                                    accessor: 'providers_count',
                                    Header: 'No. of Providers',
                                },
                                {
                                    accessor: 'actions',
                                    disableSortBy: true,
                                    className: 'text-end',
                                    Cell: ({ row }) => {
                                        const service = row.original;

                                        return (
                                            <>
                                                <IconButton
                                                    onClick={() => Inertia.get(route('dashboard.services.create'))}
                                                    size={"small"} color={"primary"}>
                                                    <Edit fontSize={'small'}/>
                                                </IconButton>
                                                <Link href={route('dashboard.services.show', { service: service.id })}>
                                                    <ReadMore fontSize={'small'}/>
                                                </Link>
                                                <IconButton
                                                    onClick={() => handleDelete(route('dashboard.services.destroy', { service: service.id }), 'service')}
                                                    size={"small"} color={"error"}>
                                                    <Delete fontSize={'small'}/>
                                                </IconButton>
                                            </>
                                        );
                                    }
                                }
                            ]} data={services} onCreateRow={() => Inertia.get(route('dashboard.services.create'))}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
