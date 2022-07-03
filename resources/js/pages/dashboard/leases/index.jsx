import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Paper } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import moment from 'moment';
import StatusChip from '@/components/chips/StatusChip';
import TableActions from '@/components/TableActions';
import TableDate from '@/components/TableDate';

const Index = ({ leases }) => {
    console.log(leases);

    return (
        <Dashboard title={'Leases'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Leases" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper className={'p-3'}>
                        <DataTable title={'Leases'} columns={[
                            {
                                accessorKey: 'owner',
                                header: 'Owner',
                                cell: ({ row }) => (
                                    <span>
                                        {row.original.unit.user.full_name} <br/>
                                        <Link href={route('dashboard.users.show', { user: row.original.unit.user.id })}>
                                            <small>{row.original.unit.user.email}</small>
                                        </Link>
                                    </span>
                                )
                            },
                            {
                                accessorKey: 'tenant',
                                header: 'Tenant',
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
                                accessorKey: 'expires_at',
                                header: 'Expiry',
                                cell: ({ row }) => moment(row.original.expires_at).format("ddd Do MMM YYYY")
                            },
                            {
                                accessorKey: 'created_at',
                                header: 'Date Created',
                                cell: ({ row }) => <TableDate date={row.original.created_at}/>
                            },
                            {
                                accessorKey: 'status',
                                header: 'Status',
                                cell: ({ row }) => <StatusChip status={row.original.status} entity={'lease'}
                                                               entityId={row.original.id}/>
                            },
                            {
                                id: 'actions',
                                cell: ({ row }) => <TableActions entityId={row.original.id} entity={'estate'}/>
                            }
                        ]} data={leases} onCreateRow={() => Inertia.get(route('dashboard.leases.create'))}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
