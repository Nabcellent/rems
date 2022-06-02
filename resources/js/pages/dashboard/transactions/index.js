import Dashboard from '@/layouts/Dashboard';
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { ListItemIcon } from '@mui/material';
import { Cancel, Pending, ReadMore, TaskAlt, Update } from '@mui/icons-material';
import StatusBadge from '@/components/StatusBadge';
import { Link } from '@inertiajs/inertia-react';
import IconMenuDropdown from '@/components/IconMenuDropdown';
import { Inertia } from '@inertiajs/inertia';
import TableDate from '@/components/TableDate';

const Index = ({ transactions }) => {
    const handleUpdate = (transactionId, data) => {
        return Inertia.put(route('dashboard.transactions.update', { transaction: transactionId }), data);
    };

    return (
        <Dashboard title={'Transactions'}>
            <Breadcrumbs title="Transactions" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Card>
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
                                            href={route('dashboard.transactions.show', { transaction: row.original.id })}>
                                            <ReadMore fontSize={'small'}/>
                                        </Link>
                                    </>
                                )
                            }
                        ]} data={transactions}/>
                    </Card>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
