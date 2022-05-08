import { Row, Col, Card } from "react-bootstrap";
import { Link, usePage } from "@inertiajs/inertia-react";

import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import profileImg from "../../../assets/images/profile-img.png";
import CountUp from 'react-countup';
import { Button } from '@mui/material';

const WelcomeCard = () => {
    const { auth: { user }, my_estates_count, wallet_balance } = usePage().props;

    return (
        <>
            <Card className="overflow-hidden">
                <div className="bg-rems-danger bg-soft">
                    <Row>
                        <Col xs="7">
                            <div className="text-rems-danger p-3">
                                <h5 className="text-rems-danger">Welcome Back !</h5>
                                <p>REMS Dashboard</p>
                            </div>
                        </Col>
                        <Col xs="5" className="align-self-end">
                            <img src={profileImg} alt="" className="img-fluid"/>
                        </Col>
                    </Row>
                </div>
                <Card.Body className="pt-0">
                    <Row>
                        <Col sm="4" className={'pe-0'}>
                            <div className="avatar-md profile-user-wid mb-4">
                                <img src={avatar1} alt="" className="img-thumbnail rounded-circle"/>
                            </div>
                            <h5 className="font-size-15 text-truncate">{user.full_name}</h5>
                            <p className="text-muted mb-0 text-truncate">{user.user_roles_str}</p>
                        </Col>

                        <Col sm="8">
                            <div className="pt-4">
                                <Row>
                                    <Col xs="6">
                                        <h5 className="font-size-15"><CountUp end={my_estates_count}/></h5>
                                        <p className="text-muted mb-0">Estates</p>
                                    </Col>
                                    <Col xs="6">
                                        <h5 className="font-size-15">
                                            <CountUp end={wallet_balance} prefix={'KES.'} separator={','}/>
                                        </h5>
                                        <p className="text-muted mb-0">Wallet</p>
                                    </Col>
                                </Row>
                                <div className="mt-4 text-end">
                                    <Button component={Link} href={'#'} size={'small'}
                                            endIcon={<i className="mdi mdi-arrow-right ms-1"/>}>
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default WelcomeCard;
