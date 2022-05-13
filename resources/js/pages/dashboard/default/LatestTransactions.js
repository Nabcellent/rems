import { Link, usePage } from '@inertiajs/inertia-react';
import DataTable from '@/components/common/datatable';
import { ReadMore } from '@mui/icons-material';
import { Badge, Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Paper, Typography } from '@mui/material';
import moment from 'moment';
import { isToday, isYesterday } from '@/utils/helpers';
import StatusBadge from '@/components/StatusBadge';
import TableDate from '@/components/TableDate';

const LatestTransactions = () => {
    const { latest_transactions } = usePage().props;

    return (
        <Row>
            <Col className="col-12">
                <Paper>
                    <DataTable title={'Latest Transactions'} perPage={5} searchable={false} columns={[
                        {
                            accessor: 'user',
                            Header: 'Billing name',
                            Cell: ({ row }) => (
                                <OverlayTrigger overlay={<Tooltip>{row.original.user.email}</Tooltip>}>
                                    <span>{row.original.user.last_name}</span>
                                </OverlayTrigger>
                            )
                        },
                        {
                            accessor: 'destination',
                            Header: 'Destination',
                            Cell: ({ row }) => (
                                <OverlayTrigger overlay={<Tooltip>{row.original.destination.email}</Tooltip>}>
                                    <span>{row.original.destination.last_name}</span>
                                </OverlayTrigger>
                            )
                        },
                        {
                            accessor: 'description',
                            Header: 'Description',
                        },
                        {
                            accessor: 'amount',
                            Header: 'Amount',
                            Cell: ({ row }) => (new Intl.NumberFormat('en-GB', {
                                style: 'currency',
                                currency: 'KES'
                            })).format(row.original.amount)
                        },
                        {
                            accessor: 'status',
                            Header: 'Status',
                            Cell: ({ row }) => <StatusBadge status={row.original.status}/>
                        },
                        {
                            accessor: 'created_at',
                            Header: 'Date',
                            className: 'text-end',
                            Cell: ({ row }) => <TableDate date={row.original.created_at}/>
                        },
                        {
                            accessor: 'actions',
                            disableSortBy: true,
                            className: 'text-end',
                            Cell: ({ row }) => (
                                <Link href={route('dashboard.transactions.show', { transaction: row.original.id })}>
                                    <ReadMore fontSize={'small'}/>
                                </Link>
                            )
                        }
                    ]} data={latest_transactions}/>
                </Paper>
            </Col>
        </Row>
    );
};

export default LatestTransactions;
