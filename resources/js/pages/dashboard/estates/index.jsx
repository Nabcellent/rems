import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import TableActions from '@/components/TableActions';
import StatusChip from '@/components/chips/StatusChip';

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
                                    accessorKey: 'name',
                                    header: 'Estate',
                                    cell: ({row}) => (
                                        <span>
                                            {row.original.name} <br/>
                                            <Link href={route('dashboard.estates.show', row.original)}>
                                                <small>{row.original.address}</small>
                                            </Link>
                                        </span>
                                    )
                                },
                                {
                                    accessorKey: 'manager',
                                    header: 'Manager',
                                    cell: ({ row }) => (
                                        <span>
                                            {row.original.manager.full_name} <br/>
                                            <Link href={route('dashboard.users.show', { user: row.original.manager.id })}>
                                                <small>{row.original.manager.email}</small>
                                            </Link>
                                        </span>
                                    )
                                },
                                {
                                    accessorKey: 'owner',
                                    header: 'Owner',
                                    cell: ({ row }) => (
                                        <span>
                                        {row.original.user.full_name} <br/>
                                        <Link href={route('dashboard.users.show', { user: row.original.user.id })}>
                                            <small>{row.original.user.email}</small>
                                        </Link>
                                    </span>
                                    )
                                },
                                {
                                    accessorKey: 'properties_count',
                                    header: 'Assets',
                                    cell: ({ row }) => row.original.properties_count + row.original.units_count
                                },
                                {
                                    accessorKey: 'status',
                                    header: 'Status',
                                    cell: ({ row }) => <StatusChip status={row.original.status} entity={'estate'}
                                                                   entityId={row.original.id}/>
                                },
                                {
                                    id: 'actions',
                                    cell: ({ row }) => <TableActions row={row.original} entity={'estate'}/>
                                }
                            ]} data={estates} onCreateRow={() => Inertia.get(route('dashboard.estates.create'))}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
