import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import TableActions from '@/components/TableActions';
import StatusChip from '@/components/chips/StatusChip';

const Index = ({ units }) => {
    console.log(units);

    return (
        <Dashboard title={'Units'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Units" breadcrumbItem="list"/>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <DataTable title={'Units'} columns={[
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
                                    accessorKey: 'house_number',
                                    header: 'Hse No.',
                                    cell: ({ row }) => (
                                        <span>
                                        <b>{row.original.house_number}</b> <br/>
                                        <Link href={route('dashboard.estates.show', { estate: row.original.user.id })}>
                                            <small>Estate: {row.original.estate.name}</small>
                                        </Link>
                                    </span>
                                    ),
                                },
                                {
                                    accessorKey: 'purpose',
                                    header: 'Rent / Sale',
                                },
                                {
                                    accessorKey: 'type',
                                    header: 'Type',
                                },
                                {
                                    accessorKey: 'rooms_count',
                                    header: 'Rooms',
                                },
                                {
                                    accessorKey: 'status',
                                    header: 'Status',
                                    cell: ({ row }) => <StatusChip status={row.original.status} entity={'unit'}
                                                                   entityId={row.original.id}/>
                                },
                                {
                                    id: 'actions',
                                    cell: ({ row }) => <TableActions entityId={row.original.id} entity={'unit'}/>
                                }
                            ]} data={units} onCreateRow={() => Inertia.get(route('dashboard.units.create'))}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
