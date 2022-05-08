import { Link, usePage } from '@inertiajs/inertia-react';
import DataTable from '@/components/common/datatable';
import { ReadMore } from '@mui/icons-material';
import { Badge, Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Typography } from '@mui/material';
import moment from 'moment';
import { isToday, isYesterday } from '@/utils/helpers';

const LatestTransactions = () => {
    const { latest_transactions } = usePage().props;

    return (
        <Row>
            <Col className="col-12">
                <Card>
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
                            Cell: ({ row }) => {
                                let { original: { status } } = row;
                                let color;
                                if (status === 'COMPLETED') {
                                    color = 'success';
                                } else if (status === 'PENDING') {
                                    color = 'warning';
                                } else if (status === 'FAILED') {
                                    color = 'danger';
                                }

                                return (
                                    <Badge pill bg={color} className={`font-size-12`}>{status}</Badge>
                                );
                            }
                        },
                        {
                            accessor: 'created_at',
                            Header: 'Date',
                            className: 'text-end',
                            Cell: ({ row }) => {
                                const { created_at } = row.original;

                                let date;
                                if (isToday(moment(created_at))) {
                                    date = "Today";
                                } else if (isYesterday(moment(created_at))) {
                                    date = "Yesterday";
                                } else {
                                    date = moment(created_at).format("D.M.y");
                                }

                                return (
                                    <>
                                        <strong>{moment(created_at).format("hh:mm A")}</strong><br/>
                                        <Typography variant={"caption"}>{date}</Typography>
                                    </>
                                );
                            }
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
                </Card>
            </Col>
        </Row>
    );
};

export default LatestTransactions;
