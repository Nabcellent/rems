import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Paper, Tooltip } from '@mui/material';
import { ReadMore } from '@mui/icons-material';
import StatusChip from '@/components/chips/StatusChip';
import { Link } from '@inertiajs/inertia-react';
import TableDate from '@/components/TableDate';
import { Status } from '@/utils/enums';
import { currencyFormat } from '@/utils/helpers';
import TableActions from '@/components/TableActions';
import moment from 'moment';

const Index = ({ transactions }) => {
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
                                        <Tooltip title={row.original.user.email}>
                                            <span>{row.original.user.last_name}</span>
                                        </Tooltip>
                                    )
                                },
                                {
                                    accessorKey: 'destination',
                                    header: 'Destination',
                                    accessorFn: row => `${row.destination.full_name}: ${row.destination.email}`,
                                    cell: ({ row }) => (
                                        <Tooltip title={row.original.destination.email}>
                                            <span>{row.original.destination.last_name}</span>
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
                                    cell: ({ row }) => <TableActions entityId={row.original.id} entity={'transaction'}/>
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
