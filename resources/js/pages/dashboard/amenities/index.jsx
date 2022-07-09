import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Inertia } from '@inertiajs/inertia';
import TableActions from '@/components/TableActions';

const Index = ({ amenities }) => {
    console.log(amenities);

    return (
        <Dashboard title={'Amenities'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Amenities" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Card>
                        <Card.Body>
                            <DataTable title={'Amenities'} columns={[
                                {
                                    accessorKey: 'icon',
                                    enableSorting: false,
                                },
                                {
                                    accessorKey: 'title',
                                    header: 'Service Name',
                                },
                                {
                                    accessorKey: 'description',
                                    header: 'Description',
                                    cell: ({ row }) => row.original.description || 'N / A'
                                },
                                {
                                    accessorKey: 'amenitiables_count',
                                    header: 'Units & Estates',
                                    cell: ({ row }) => row.original.estates_count + row.original.units_count
                                },
                                {
                                    id: 'actions',
                                    cell: ({ row }) => <TableActions row={row.original} entity={'amenity'} showViewLink={false}/>
                                }
                            ]} data={amenities} onCreateRow={() => Inertia.get(route('dashboard.amenities.create'))}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
