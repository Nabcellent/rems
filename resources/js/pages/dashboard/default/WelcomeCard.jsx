import { Card, Col, Row } from "react-bootstrap";
import { Link, usePage } from "@inertiajs/inertia-react";
import profileImg from "../../../assets/images/profile-img.png";
import CountUp from 'react-countup';
import { Avatar, Button, Paper } from '@mui/material';
import { getInitials } from '@/utils/helpers';

const WelcomeCard = () => {
    const { auth: { user }, can, my_estates_count, wallet_balance } = usePage().props,
        fullName = `${user.first_name} ${user.last_name}`;

    return (
        <>
            <Paper sx={{ overflow: 'hidden', height: '100%' }}>
                <div className="bg-primary bg-soft">
                    <Row>
                        <Col xs="7">
                            <div className="text-primary p-3">
                                <h5 className="text-primary">Welcome Back !</h5>
                                <p>REMS Dashboard</p>
                            </div>
                        </Col>
                        <Col xs="5" className="align-self-end">
                            <img src={profileImg} alt="" className="img-fluid"/>
                        </Col>
                    </Row>
                </div>
                <Card.Body className="pt-0 pb-1">
                    <Row>
                        <Col sm="4" className={'pe-0'}>
                            <div className="avatar-md profile-user-wid mb-4">
                                <Avatar imgProps={{ className: 'img-thumbnail rounded-circle' }}
                                        sx={{ fontSize: '9pt', height: '100%', width: '100%' }}
                                        src={`/images/users/${user.image}`}>{getInitials(fullName)}
                                </Avatar>
                            </div>
                        </Col>

                        <Col sm="8">
                            <div className="pt-4">
                                <Row className={'justify-content-between'}>
                                    <Col xs="6">
                                        {
                                            can.access.estates && (
                                                <>
                                                    <h5 className="font-size-15"><CountUp end={my_estates_count}/></h5>
                                                    <p className="text-muted mb-0">Estates</p>
                                                </>
                                            )
                                        }
                                    </Col>
                                    <Col xs="6">
                                        <h5 className="font-size-15">
                                            <CountUp end={wallet_balance} prefix={'KES.'} separator={','}/>
                                        </h5>
                                        <p className="text-muted mb-0">Wallet</p>
                                    </Col>
                                </Row>
                                <div className="mt-3 text-end">
                                    <Button component={Link} href={route('dashboard.profile')} size={'small'}
                                            endIcon={<i className="mdi mdi-arrow-right ms-1"/>}>
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Paper>
        </>
    );
};

export default WelcomeCard;
