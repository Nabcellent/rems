import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { ListItemIcon, Paper, Tooltip } from '@mui/material';
import { Cancel, Pending, ReadMore, TaskAlt, Update } from '@mui/icons-material';
import StatusChip from '@/components/chips/StatusChip';
import { Link } from '@inertiajs/inertia-react';
import IconMenuDropdown from '@/components/IconMenuDropdown';
import { Inertia } from '@inertiajs/inertia';
import TableDate from '@/components/TableDate';

const Index = ({ payments }) => {
    console.log(payments);

    const handleUpdate = (paymentId, data) => {
        return Inertia.put(route('dashboard.payments.update', { payment: paymentId }), data);
    };

    return (
        <Dashboard title={'Payments'}>
            <Breadcrumbs title="Payments" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper>
                        <Card.Body>
                            <DataTable title={'Payments'} columns={[
                                {
                                    accessor: 'user',
                                    Header: 'User',
                                    Cell: ({ row }) => (
                                        <Tooltip title={row.original.transaction.user.user_roles_str}>
                                        <span>
                                            {row.original.transaction.user.full_name} <br/>
                                            <Link href={route('dashboard.users.show', { user: row.original.transaction.user.id })}>
                                                 <strong><small>{row.original.transaction.user.email}</small></strong>
                                            </Link>
                                        </span>
                                        </Tooltip>
                                    )
                                },
                                {
                                    accessor: 'method',
                                    Header: 'Method',
                                },
                                {
                                    accessor: 'amount',
                                    Header: 'Amount',
                                    Cell: ({ row }) => new Intl.NumberFormat('en-GB', {
                                        style: 'currency',
                                        currency: 'KES'
                                    }).format(row.original.amount)
                                },
                                {
                                    accessor: 'status',
                                    Header: 'Status',
                                    Cell: ({ row }) => <StatusChip status={row.original.status} entity={'payment'}
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
                                            <IconMenuDropdown tooltipTitle={'Update Transaction'}
                                                              icon={<Update fontSize={'small'}/>} menuItems={[
                                                {
                                                    title: 'Mark as completed', avatar: <ListItemIcon>
                                                        <TaskAlt color={'success'} fontSize="small"/>
                                                    </ListItemIcon>,
                                                    onClick: () => handleUpdate(row.original, { status: 'COMPLETED' })
                                                }, {
                                                    title: 'Mark as pending', avatar: <ListItemIcon>
                                                        <Pending color={'warning'} fontSize="small"/>
                                                    </ListItemIcon>,
                                                    onClick: () => handleUpdate(row.original, { status: 'PENDING' })
                                                }, {
                                                    title: 'Mark as failed', avatar: <ListItemIcon>
                                                        <Cancel color={'error'} fontSize="small"/>
                                                    </ListItemIcon>,
                                                    onClick: () => handleUpdate(row.original, { status: 'FAILED' })
                                                },
                                            ]}/>
                                            <Link
                                                href={route('dashboard.transactions.show', { transaction: row.original.transaction_id })}>
                                                <ReadMore fontSize={'small'}/>
                                            </Link>
                                        </>
                                    )
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
