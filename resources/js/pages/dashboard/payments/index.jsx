import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Paper, Tooltip } from '@mui/material';
import StatusChip from '@/components/chips/StatusChip';
import { Link } from '@inertiajs/inertia-react';
import TableDate from '@/components/TableDate';
import TableActions from '@/components/TableActions';
import { currencyFormat } from '@/utils/helpers';
import moment from 'moment';

const Index = ({ payments }) => {
    console.log(payments);

    return (
        <Dashboard title={'Payments'}>
            <Breadcrumbs title="Payments" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper>
                        <Card.Body>
                            <DataTable title={'Payments'} columns={[
                                {
                                    accessorKey: 'user',
                                    header: 'User',
                                    cell: ({ row }) => (
                                        <Tooltip title={row.original.transaction.user.user_roles_str}>
                                        <span>
                                            {row.original.transaction.user.full_name} <br/>
                                            <Link
                                                href={route('dashboard.users.show', { user: row.original.transaction.user.id })}>
                                                 <strong><small>{row.original.transaction.user.email}</small></strong>
                                            </Link>
                                        </span>
                                        </Tooltip>
                                    )
                                },
                                {
                                    accessorKey: 'method',
                                    header: 'Method',
                                },
                                {
                                    accessorKey: 'amount',
                                    header: 'Amount',
                                    cell: ({ row }) => currencyFormat(row.original.amount)
                                },
                                {
                                    accessorKey: 'status',
                                    header: 'Status',
                                    cell: ({ row }) => <StatusChip status={row.original.status} entity={'payment'}
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
                                    cell: ({ row }) => <TableActions entityId={row.original.id} entity={'payment'}/>
                                }
                            ]} data={payments}/>
                        </Card.Body>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
