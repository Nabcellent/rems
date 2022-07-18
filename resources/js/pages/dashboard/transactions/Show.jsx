import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import { Card, Col, Dropdown, Row, Table } from 'react-bootstrap';
import { currencyFormat, parsePhone } from '@/utils/helpers';
import StatusChip from '@/components/chips/StatusChip';
import { CurrencyExchange } from '@mui/icons-material';
import moment from 'moment';
import { lazy } from 'react';
import PhoneChip from '@/components/chips/PhoneChip';
import { PaymentMethod } from '@/utils/enums';

const PaymentTable = lazy(() => import('@/pages/dashboard/transactions/PaymentTable'));

const Show = ({ errors, transaction }) => {
    console.log(transaction);

    return (
        <Dashboard errors={errors} title={'Transaction'}>
            <Breadcrumbs title="Transactions" breadcrumbItem={`#${transaction.id}`}/>

            <Row className={'mb-3'}>
                <Col xl="5">
                    <Card className={'h-100'}>
                        <Card.Body className={'d-flex flex-column'}>
                            <div className={'d-flex justify-content-between align-items-start'}>
                                <div className="mb-4 me-3">
                                    <i className="mdi mdi-account-circle text-primary h1"></i>
                                </div>
                                <Dropdown className="ms-2">
                                    <Dropdown.Toggle as="a" className="text-muted">
                                        <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-end">
                                        <Dropdown.Item href="#">Action</Dropdown.Item>
                                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div>
                                <div className="row align-items-center justify-content-between">
                                    <div className={'col-xl-5'}>
                                        <h5 className="">{transaction.user.full_name}</h5>
                                        <p className="text-muted mb-2 text-truncate">{transaction.user.email}</p>
                                        <PhoneChip phone={transaction.user.phone}/>
                                        <p className="text-muted mt-2">{transaction.user.user_roles_str}</p>
                                    </div>

                                    <div className={'col-xl-2 d-none d-xl-block'}>
                                        <CurrencyExchange color={'primary'} fontSize={'small'}/>
                                    </div>

                                    <div className={'col-xl-5 text-end'}>
                                        <h5 className="">{transaction.transactionable.user.full_name}</h5>
                                        <p className="text-muted mb-2 text-truncate">{transaction.transactionable.user.email}</p>
                                        <PhoneChip phone={transaction.transactionable.user.phone}/>
                                        <p className="text-muted mt-2">{transaction.transactionable.user.user_roles_str}</p>
                                    </div>
                                </div>
                            </div>
                            <hr className={'mt-3'}/>
                            <div className={'text-end mt-auto align-self-end'}>
                                <small>
                                    <strong>Transacted</strong> @{moment(transaction.created_at).format('HHmm')}
                                    hrs <strong>On</strong> {moment(transaction.created_at).format('ddd Do, MMM YYYY')}
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={7}>
                    <Card className={'h-100'}>
                        <Card.Body>
                            <h4 className="card-title">Details</h4>

                            <Row className={'align-items-center'}>
                                <Col lg={6}>
                                    <div className="border p-3 rounded mt-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="avatar-xs me-3">
                                              <span
                                                  className="avatar-title rounded-circle bg-warning bg-soft text-warning font-size-18">
                                                <i className="mdi mdi-bitcoin"></i>
                                              </span>
                                            </div>
                                            <h5 className="font-size-14 mb-0">Transaction</h5>
                                        </div>
                                        <div>
                                            <h5 className={'fw-bold'}>{transaction.description}</h5>
                                            <div className={'d-flex align-items-center justify-content-between'}>
                                                <StatusChip status={transaction.status}/>
                                                <p className={'m-0'}>Type: {transaction.type}</p>
                                            </div>
                                        </div>
                                        <div
                                            className={'d-flex align-items-center justify-content-between flex-column my-3'}>
                                            <strong>Amount</strong>
                                            <p className={'m-0'}>{currencyFormat(transaction.amount)}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="border p-3 rounded mt-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="avatar-xs me-3">
                                              <span
                                                  className="avatar-title rounded-circle bg-success bg-soft text-success font-size-18">
                                                <i className="mdi mdi-cash-100"></i>
                                              </span>
                                            </div>
                                            <h5 className="font-size-14 mb-0">Payment</h5>
                                        </div>
                                        <div className={'mb-3'}>
                                            <h5 className={'fw-bold'}>{transaction.payment.method}</h5>
                                            <StatusChip status={transaction.payment.status}/>
                                        </div>
                                        <div
                                            className={'d-flex align-items-center justify-content-between flex-column'}>
                                            <strong>Amount</strong>
                                            <p className={'m-0'}>{currencyFormat(transaction.payment.amount)}</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {transaction.payment.method === PaymentMethod.MPESA && <PaymentTable payment={transaction.payment}/>}
        </Dashboard>
    );
};

export default Show;
