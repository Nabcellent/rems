import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import TableActions from '@/components/TableActions';

const Index = ({ estates }) => {
    console.log(estates);

    return (
        <Dashboard title={'Estates'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Estates" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Card>
                        <Card.Body>
                            <DataTable title={'Estates'} columns={[
                                {
                                    accessor: 'name',
                                    Header: 'Name',
                                },
                                {
                                    accessor: 'address',
                                    Header: 'Address',
                                },
                                {
                                    accessor: 'owner',
                                    Header: 'Owner',
                                    Cell: ({ row }) => (
                                        <span>
                                        {row.original.user.full_name} <br/>
                                        <Link href={route('dashboard.users.show', { user: row.original.user.id })}>
                                            <small>{row.original.user.email}</small>
                                        </Link>
                                    </span>
                                    )
                                },
                                {
                                    accessor: 'properties_count',
                                    Header: 'Properties',
                                    Cell: ({ row }) => row.original.properties_count + row.original.units_count
                                },
                                {
                                    accessor: 'actions',
                                    disableSortBy: true,
                                    className: 'text-end',
                                    Cell: ({ row }) => <TableActions entityId={row.original.id} entity={'estate'}/>                                }
                            ]} data={estates} onCreateRow={() => Inertia.get(route('dashboard.estates.create'))}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
