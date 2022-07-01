import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Inertia } from '@inertiajs/inertia';
import TableActions from '@/components/TableActions';

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
                                    Cell: ({ row }) => <TableActions entityId={row.original.id} entity={'service'}/>                                }
                            ]} data={services} onCreateRow={() => Inertia.get(route('dashboard.services.create'))}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
