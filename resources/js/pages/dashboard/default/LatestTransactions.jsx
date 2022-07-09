import { Link, usePage } from '@inertiajs/inertia-react';
import { ReadMore } from '@mui/icons-material';
import { Col, Row } from 'react-bootstrap';
import { Paper, Tooltip } from '@mui/material';
import StatusChip from '@/components/chips/StatusChip';
import TableDate from '@/components/TableDate';
import DataTable from '@/components/common/datatable';
import { currencyFormat } from '@/utils/helpers';
import moment from 'moment';

const LatestTransactions = () => {
    const { latest_transactions } = usePage().props;

    return (
        <Row>
            <Col className="col-12">
                <Paper className={'p-3'}>
                    <DataTable title={'Latest Transactions'} perPage={5} searchable={false} columns={[
                        {
                            accessorKey: 'user',
                            header: 'Initiator',
                            cell: ({ row }) => (
                                <Tooltip title={row.original.user.email}>
                                    <span>{row.original.user.last_name}</span>
                                </Tooltip>
                            )
                        },
                        {
                            accessorKey: 'destination',
                            header: 'Destination',
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
                            cell: ({ row }) => (
                                <Link href={route('dashboard.transactions.show', { transaction: row.original.id })}>
                                    <ReadMore fontSize={'small'}/>
                                </Link>
                            )
                        }
                    ]} data={latest_transactions} viewAllLink={route('dashboard.transactions.index')}/>
                </Paper>
            </Col>
        </Row>
    );
};

export default LatestTransactions;
