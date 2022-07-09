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
                                    accessorKey: 'icon',
                                    enableSorting: false,
                                },
                                {
                                    accessorKey: 'name',
                                    header: 'Service Name',
                                },
                                {
                                    accessorKey: 'description',
                                    header: 'Description',
                                    cell: ({ row }) => row.original.description || 'N / A'
                                },
                                {
                                    accessorKey: 'providers_count',
                                    header: 'No. of Providers',
                                },
                                {
                                    id: 'actions',
                                    cell: ({ row }) => <TableActions row={row.original} entity={'service'}/>
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
