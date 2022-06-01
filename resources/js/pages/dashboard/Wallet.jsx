import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import { Row, Col, Card } from 'react-bootstrap';
import CountUp from 'react-countup';
import { Link } from '@inertiajs/inertia-react';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Inertia } from '@inertiajs/inertia';
import { AccountBalanceWallet } from '@mui/icons-material';
import { Mpesa } from '@/utils/Mpesa';
import { getTelcoFromPhone } from '@/utils/helpers';
import { Description, Telco } from '@/utils/enums';

const Sweet = withReactContent(Swal);

const Wallet = ({ wallet, auth }) => {
    console.log(wallet, auth);

    const handleDeposit = () => {
        Sweet.fire({
            html:
                '<small>Amount (min: 100)</small>' +
                '<input id="amount" type="number" class="form-control mb-1" placeholder="Enter amount to deposit.">' +
                '<small>Phone number (optional)</small>' +
                `<input id="phone" type="tel" class="form-control" value="${auth.user.phone}" placeholder="Enter phone to request.">`,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const amount = document.getElementById('amount').value,
                    phone = document.getElementById('phone').value;

                if (!(parseFloat(amount) >= 100)) return Sweet.showValidationMessage('Invalid Amount!');
                if (getTelcoFromPhone(phone) !== Telco.SAFARICOM) return Sweet.showValidationMessage('Invalid Safaricom Number!');

                return { amount, phone };
            },
            allowOutsideClick: () => !Sweet.isLoading()
        }).then(async result => {
            if (result.isConfirmed) {
                await Mpesa.init({
                    ...result.value,
                    reference: 'Wallet',
                    description: Description.WALLET_DEPOSIT,
                    onSuccess: () => Inertia.post(route('dashboard.wallet.deposit', { wallet: wallet.id }), { amount: result.value }),
                });
            }
        });
    };

    return (
        <Dashboard title={'Wallet'}>
            <Breadcrumbs title={auth.user.last_name} breadcrumbItem={'Wallet'}/>

            <Row>
                <Col xl={4}>
                    <Card>
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
                                        <p className="text-muted mb-2">Since last month</p>
                                        <h5>+ $ 248.35 <span
                                            className="badge bg-success ms-1 align-bottom">+ 1.3 %</span></h5>

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
                    </Card>
                </Col>
                <Col xl={8}></Col>
            </Row>
        </Dashboard>
    );
};

export default Wallet;
