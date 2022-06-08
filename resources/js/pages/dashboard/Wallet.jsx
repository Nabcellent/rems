import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import { Card, Col, Row } from 'react-bootstrap';
import CountUp from 'react-countup';
import { Link } from '@inertiajs/inertia-react';
import { Button, Paper } from '@mui/material';
import { AccountBalanceWallet } from '@mui/icons-material';
import TableDate from '@/components/TableDate';
import DataTable from '@/components/common/datatable';
import StatusBadge from '@/components/StatusBadge';
import { useState } from 'react';
import Pay from '@/components/Pay';
import { Inertia } from '@inertiajs/inertia';
import { Description } from '@/utils/enums';

const Wallet = ({ wallet, transactions, last_top_up, auth }) => {
    console.log(wallet, auth);
    const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);

    const handleDeposit = async () => {
        setShowPaymentMethodModal(true);
    };

    return (
        <Dashboard title={'Wallet'}>
            <Breadcrumbs title={auth.user.last_name} breadcrumbItem={'Wallet'}/>

            <Row>
                <Col xl={4}>
                    <Paper className={'mb-3 h-100 d-flex justify-content-between flex-column'}>
                        <Card.Body>
                            <div className="d-flex">
                                <div className="flex-shrink-0 me-4">
                                    <i className="mdi mdi-account-circle text-primary h1"></i>
                                </div>

                                <div className="flex-grow-1">
                                    <div className="text-muted">
                                        <h5>{wallet.user.full_name}</h5>
                                        <Link href={route('dashboard.users.show', { user: wallet.user.id })}
                                              className="mb-1">{wallet.user.email}</Link>
                                        <p className="mb-0">Phone no: #{wallet.user.phone}</p>
                                    </div>

                                </div>

                                <div className="dropdown ms-2">
                                    <a className="text-muted" href="#" role="button" data-bs-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false">
                                        <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-end">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body className="border-top">
                            <Row>
                                <Col sm={6}>
                                    <div>
                                        <p className="text-muted mb-2">Available Balance</p>
                                        <h5><CountUp end={wallet.balance} prefix={'KES '} separator={','}/></h5>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="text-sm-end mt-4 mt-sm-0">
                                        <p className="text-muted mb-2">Last top up</p>
                                        <TableDate date={last_top_up}/>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>

                        <Card.Body className="border-top">
                            <p className="text-muted mb-4">In this month</p>
                            <div className="text-center">
                                <Row>
                                    <Col sm={6}>
                                        <div>
                                            <div className="font-size-24 text-primary mb-2">
                                                <i className="bx bx-send"></i>
                                            </div>

                                            <p className="text-muted mb-2">Spent</p>
                                            <h5>$ 654.42</h5>
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div className="mt-4 mt-sm-0">
                                            <div className="font-size-24 text-primary mb-2">
                                                <i className="bx bx-import"></i>
                                            </div>

                                            <p className="text-muted mb-2">Deposited</p>
                                            <h5>$ 1054.32</h5>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Button variant={'contained'} fullWidth onClick={handleDeposit}
                                                endIcon={<AccountBalanceWallet/>} className={'mt-2'}>
                                            Load Wallet
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Paper>
                </Col>
                <Col xl={8}>
                    <Paper className={'mb-3 h-100'}>
                        <Card.Body>
                            <DataTable data={transactions} title={'Wallet Transactions'} perPage={5} columns={[
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
                            ]}/>
                        </Card.Body>
                    </Paper>
                </Col>
            </Row>

            <Pay details={{ user: auth.user, destinationId: auth.user.id, description: Description.WALLET_DEPOSIT }}
                 destinationId={auth.user.id} showModal={showPaymentMethodModal}
                 setShowModal={setShowPaymentMethodModal}
                 onCompleted={({
                     amount,
                 }) => Inertia.post(route('dashboard.wallet.deposit', { wallet: wallet.id }), {
                     amount
                 }, {preserveState:true})}/>
        </Dashboard>
    );
};

export default Wallet;
