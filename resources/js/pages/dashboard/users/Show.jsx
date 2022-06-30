import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Avatar, Button, Divider, IconButton, Paper } from '@mui/material';
import { Edit, Female, LocalPhone, Male, PhoneIphone } from '@mui/icons-material';
import { Gender } from '@/utils/enums';
import StatusChip from '@/components/chips/StatusChip';
import PhoneChip from '@/components/chips/PhoneChip';
import MainImage from '@/components/MainImage';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react';
import ChangeOwner from '@/components/crud/ChangeOwner';

const Show = ({ errors, user }) => {
    console.log(user);

    return (
        <Dashboard errors={errors} title={'Users'}>
            <Breadcrumbs title="Users" breadcrumbItem={user.email}/>

            <Paper className={'mb-3'}>
                <Card.Header className="position-relative min-vh-25 mb-7">
                    <div className="bg-holder rounded-3 rounded-bottom-0"
                         style={{ backgroundImage: 'url(/images/users/profile-default.jpg)' }}></div>
                    <MainImage image={user.image} imageable={'user'} imageableId={user.id}/>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <div className="d-flex justify-content-between">
                                <h5 className="mb-0">{user.full_name}</h5>
                                <div>
                                    <IconButton component={Link} className={'mx-1'}
                                                href={route(`dashboard.users.edit`, user)}> <Edit/>
                                    </IconButton>
                                    <StatusChip status={user.status} entity={'user'} entityId={user.id}/>
                                </div>
                            </div>
                            <Divider sx={{ my: 2 }}/>
                        </Col>
                        <Col lg={7}>
                            <h4 className="mb-1">{user.full_name}</h4>
                            <h6 className="fs-0 fw-normal">{user.email}</h6>
                            <p className="text-500">{user.user_roles_str}</p>
                            <StatusChip status={user.status}/>
                            <Button variant={'outlined'}
                                    className="px-3 ms-2 btn btn-falcon-default btn-sm">Notify</Button>
                            <div className="border-dashed-bottom my-4 d-lg-none"></div>
                        </Col>
                        <Col className="ps-2 ps-lg-3">
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    {user.gender === Gender.MALE ? <Male/> : <Female/>}
                                </Avatar>
                                <div className="flex-1">
                                    <h6 className="mb-0">{user.gender ? user.gender.toUpperCase() : 'N/A'}</h6>
                                </div>
                            </div>
                            <Divider sx={{ my: 2 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <LocalPhone className="me-2"/>
                                <PhoneChip textOnly phone={user.phone}/>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Paper>
        </Dashboard>
    );
};

export default Show;
