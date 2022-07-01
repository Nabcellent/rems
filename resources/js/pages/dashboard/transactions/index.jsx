import Dashboard from '@/layouts/Dashboard';
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Paper } from '@mui/material';
import { ReadMore } from '@mui/icons-material';
import StatusChip from '@/components/chips/StatusChip';
import { Link } from '@inertiajs/inertia-react';
import TableDate from '@/components/TableDate';
import { Status } from '@/utils/enums';

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
                                    accessor: 'user',
                                    Header: 'Billing name',
                                    Cell: ({ row }) => (
                                        <OverlayTrigger overlay={<Tooltip>{row.original.user.email}</Tooltip>}>
                                        <span>
                                            {row.original.user.last_name} <br/>
                                            <small>{row.original.user.user_roles_str}</small>
                                        </span>
                                        </OverlayTrigger>
                                    )
                                },
                                {
                                    accessor: 'destination',
                                    Header: 'Destination',
                                    Cell: ({ row }) => (
                                        <OverlayTrigger overlay={<Tooltip>{row.original.destination.email}</Tooltip>}>
                                        <span>
                                            {row.original.destination.last_name} <br/>
                                            <small>{row.original.destination.user_roles_str}</small>
                                        </span>
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
                                    Cell: ({ row }) => <StatusChip status={row.original.status} entity={'transaction'}
                                                                   entityId={row.original.id}/>
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
                                        <>
                                            <Link
                                                href={route('dashboard.transactions.show', { transaction: row.original.id })}>
                                                <ReadMore fontSize={'small'}/>
                                            </Link>
                                        </>
                                    )
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