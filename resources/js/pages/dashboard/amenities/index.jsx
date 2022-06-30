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
                                    accessor: 'icon',
                                    disableSortBy: true,
                                },
                                {
                                    accessor: 'title',
                                    Header: 'Service Name',
                                },
                                {
                                    accessor: 'description',
                                    Header: 'Description',
                                    Cell: ({ row }) => row.original.description || 'N / A'
                                },
                                {
                                    accessor: 'amenitiables_count',
                                    Header: 'Units & Estates',
                                    Cell: ({ row }) => row.original.estates_count + row.original.units_count
                                },
                                {
                                    accessor: 'actions',
                                    disableSortBy: true,
                                    className: 'text-end',
                                    Cell: ({ row }) => <TableActions entityId={row.original.id} entity={'amenity'}/>                                }
                            ]} data={amenities} onCreateRow={() => Inertia.get(route('dashboard.amenities.create'))}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
