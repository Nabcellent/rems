import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Alert, IconButton, Paper, Tooltip } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import StatusChip from '@/components/chips/StatusChip';
import PhoneChip from '@/components/chips/PhoneChip';
import React from 'react';
import CardBgCorner from '@/components/CardBgCorner';
import Banner from '@/components/Banner';
import PaymentPlans from '@/components/crud/PaymentPlans';
import { Link } from '@inertiajs/inertia-react';
import { AttachMoney, Edit, Home, ReadMore } from '@mui/icons-material';
import PermitAction from '@/components/PermitAction';
import CountUp from 'react-countup';
import LeaderList from '@/components/LeaderList';
import DataTable from '@/components/common/datatable';
import { currencyFormat } from '@/utils/helpers';
import TableDate from '@/components/TableDate';

const UserInfo = ({ auth, user, rentFigures, role }) => {
    if (auth.user.id === user.id) return (
        <Col md={6} lg={4}>
            <h5>Rent</h5>
            <LeaderList items={[
                {
                    key: 'Invoiced',
                    value: <CountUp end={rentFigures.total_invoiced} separator={','} prefix={'KES '}/>
                },
                {
                    key: 'Paid',
                    value: <CountUp end={rentFigures.total_paid} separator={','} prefix={'KES '}/>
                },
                {
                    key: 'Arrears',
                    value: <CountUp end={rentFigures.arrears} separator={','} prefix={'KES '}/>
                },
            ]}/>
        </Col>
    );

    return (
        <Col md={6} lg={4} className={'mb-4 mb-lg-0'}>
            <h5>{role}.</h5>
            <h6>{role} Address</h6>
            <p className="mb-0 fs--1">
                <strong>Email: </strong>
                <a href={`mailto:${user.email}`}>{user.email}</a>
            </p>
            <hr/>
            <PhoneChip phone={user.phone} link/>
        </Col>
    );
};

const Show = ({ auth, lease, canEdit }) => {
    console.log(lease);

    return (
        <Dashboard title={`Leases #${lease.id}`}>
            <Breadcrumbs title="Leases" breadcrumbItem={`#${lease.id}`}/>

            <Banner title={'Lease.'} actions={[
                (lease.rent_figures.arrears && (
                    <Tooltip title={'Pay Rent'}>
                        <IconButton component={Link} className={'mx-1'} href={route(`dashboard.payments.create`)}>
                            <AttachMoney/>
                        </IconButton>
                    </Tooltip>
                )),
                <Tooltip title={'View Unit'}>
                    <IconButton component={Link} className={'mx-1'} href={route(`dashboard.units.show`, lease.unit)}>
                        <Home/>
                    </IconButton>
                </Tooltip>,
                <PermitAction ability={canEdit}>
                    <Tooltip title={'Edit Lease'}>
                        <IconButton component={Link} className={'mx-1'} href={route(`dashboard.leases.edit`, lease)}>
                            <Edit/>
                        </IconButton>
                    </Tooltip>
                </PermitAction>
            ]}/>

            <Paper className={'mb-3'}>
                <CardBgCorner corner={2}/>
                <Card.Body>
                    <Row>
                        <Col md={6} lg={4} className={'mb-4 mb-lg-0'}>
                            <h5>
                                Lease. <StatusChip status={lease.status} entity={'lease'} entityId={lease.id}/>
                            </h5>
                            <h6>Lease Address</h6>
                            <p className="mb-2 fs--1">{lease.unit.estate.address}</p>
                            <p className="mb-0 fs--1">
                                <strong>Expiry date: </strong>
                                {moment(lease.expires_at).format("MMM Do YYYY")}
                            </p>
                        </Col>
                        <UserInfo user={lease.unit.user} role={'Owner'} auth={auth} rentFigures={lease.rent_figures}/>
                        <UserInfo user={lease.user} role={'Tenant'} auth={auth} rentFigures={lease.rent_figures}/>
                    </Row>
                </Card.Body>
            </Paper>

            <Row className={'mb-3'}>
                <Col>
                    {!lease.default_payment_plan && (
                        <Alert severity="warning" className={'mb-2'}>
                            Please select your preferred payment plan.
                        </Alert>
                    )}

                    <PaymentPlans plans={lease.payment_plans} defaultPlan={lease.default_payment_plan}
                                  lease={lease}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Paper className={'p-3'}>
                        <DataTable title={'Rent Payments'} perPage={5} columns={[
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
                        ]} data={lease.unit.transactions}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Show;
