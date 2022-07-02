import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { IconButton, Paper } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { currencyFormat, handleDelete } from '@/utils/helpers';
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
                                accessor: 'owner',
                                Header: 'Owner',
                                Cell: ({ row }) => (
                                    <span>
                                        {row.original.unit.user.full_name} <br/>
                                        <Link href={route('dashboard.users.show', { user: row.original.unit.user.id })}>
                                            <small>{row.original.unit.user.email}</small>
                                        </Link>
                                    </span>
                                )
                            },
                            {
                                accessor: 'tenant',
                                Header: 'Tenant',
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
                                accessor: 'expires_at',
                                Header: 'Expiry',
                                Cell: ({ row }) => moment(row.original.expires_at).format("ddd Do MMM YYYY")
                            },
                            {
                                accessor: 'created_at',
                                Header: 'Date Created',
                                Cell: ({ row }) => <TableDate date={row.original.created_at}/>
                            },
                            {
                                accessor: 'status',
                                Header: 'Status',
                                Cell: ({ row }) => <StatusChip status={row.original.status} entity={'lease'}
                                                               entityId={row.original.id}/>
                            },
                            {
                                accessor: 'actions',
                                disableSortBy: true,
                                className: 'text-end',
                                Cell: ({ row }) => <TableActions entityId={row.original.id} entity={'lease'}/>
                            }
                        ]} data={leases} onCreateRow={() => Inertia.get(route('dashboard.leases.create'))}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
