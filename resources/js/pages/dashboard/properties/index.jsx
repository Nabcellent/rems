import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Paper } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import TableActions from '@/components/TableActions';
import StatusChip from '@/components/chips/StatusChip';

const Index = ({ properties }) => {
    console.log(properties);

    return (
        <Dashboard title={'Properties'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Properties" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper className={'p-3'}>
                        <DataTable title={'Properties'} columns={[
                            {
                                accessorKey: 'name',
                                header: 'Name',
                                cell: ({ row }) => row.original.name || ' - '
                            },
                            {
                                accessorKey: 'estate',
                                header: 'Estate',
                                cell: ({ row }) => (
                                    <span>
                                        <Link
                                            href={route('dashboard.estates.show', { estate: row.original.estate.id })}>
                                            {row.original.estate.name}
                                        </Link><br/>
                                        <small>{row.original.estate.address}</small>
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
                                accessorKey: 'type',
                                header: 'Type',
                            },
                            {
                                accessorKey: 'units_count',
                                header: 'Units',
                                cell: ({ row }) => row.original.units_count
                            },
                            {
                                accessorKey: 'status',
                                header: 'Status',
                                cell: ({ row }) => <StatusChip status={row.original.status} entity={'property'}
                                                               entityId={row.original.id}/>
                            },
                            {
                                id: 'actions',
                                cell: ({ row }) => <TableActions entityId={row.original.id} entity={'property'}/>
                            }
                        ]} data={properties} onCreateRow={() => Inertia.get(route('dashboard.properties.create'))}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
