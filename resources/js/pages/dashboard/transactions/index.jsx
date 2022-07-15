import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Paper, Tooltip } from '@mui/material';
import StatusChip from '@/components/chips/StatusChip';
import { Link } from '@inertiajs/inertia-react';
import TableDate from '@/components/TableDate';
import { Status } from '@/utils/enums';
import { currencyFormat } from '@/utils/helpers';
import TableActions from '@/components/TableActions';
import moment from 'moment';

const Index = ({ transactions }) => {
    console.log(transactions);

    return (
        <Dashboard title={'Transactions'}>
            <Breadcrumbs title="Transactions" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper className={'mb-3'}>
                        <Card.Body>
                            <DataTable title={'Transactions'} columns={[
                                {
                                    accessorKey: 'user',
                                    header: 'Initiator',
                                    accessorFn: row => `${row.user.full_name}: ${row.user.email}`,
                                    cell: ({ row }) => (
                                        <Tooltip title={row.original.user.user_roles_str}>
                                            <span>{row.original.user.full_name} <br/>
                                                <Link
                                                    href={route('dashboard.users.show', row.original.user)}>
                                                    <strong><small>{row.original.user.email}</small></strong>
                                                </Link>
                                            </span>
                                        </Tooltip>
                                    )
                                },
                                {
                                    accessorKey: 'destination',
                                    header: 'Destination',
                                    accessorFn: row => `${row.transactionable.user.full_name}: ${row.transactionable.user.email}`,
                                    cell: ({ row }) => (
                                        <Tooltip title={row.original.transactionable.user.email}>
                                            <span>
                                                {row.original.transactionable.user.full_name}<br/>
                                                <Link
                                                    href={route('dashboard.users.show', row.original.transactionable.user)}>
                                                    <strong><small>{row.original.transactionable.user.email}</small></strong>
                                                </Link>
                                            </span>
                                        </Tooltip>
                                    )
                                },
                                {
                                    accessorKey: 'description',
                                    header: 'Description',
                                },
                                {
                                    accessorKey: 'amount',
                                    header: 'Amount',
                                    cell: ({ row }) => currencyFormat(row.original.amount)
                                },
                                {
                                    accessorKey: 'status',
                                    header: 'Status',
                                    cell: ({ row }) => <StatusChip status={row.original.status} entity={'transaction'}
                                                                   entityId={row.original.id}/>
                                },
                                {
                                    accessorKey: 'created_at',
                                    header: 'Date',
                                    accessorFn: row => moment(row.created_at).calendar(),
                                    cell: ({ row }) => <TableDate date={row.original.created_at}/>
                                },
                                {
                                    id: 'actions',
                                    cell: ({ row }) => <TableActions row={row.original} entity={'transaction'}/>
                                }
                            ]} data={transactions}/>
                        </Card.Body>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
