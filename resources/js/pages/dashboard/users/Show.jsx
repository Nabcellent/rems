import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Divider, IconButton, Paper } from '@mui/material';
import {
    AlternateEmail,
    Badge,
    DriveFileRenameOutline,
    Edit,
    Female,
    LocalPhone,
    Male,
    WorkspacePremium
} from '@mui/icons-material';
import { Gender, Morphable } from '@/utils/enums';
import StatusChip from '@/components/chips/StatusChip';
import PhoneChip from '@/components/chips/PhoneChip';
import MainImage from '@/components/MainImage';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react';
import pluralize from 'pluralize';
import Units from '@/pages/dashboard/properties/components/Units';

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
                            <div className="d-flex align-items-center mb-1">
                                <Badge className={'me-2'}/><strong>User</strong>
                            </div>
                            <Divider sx={{ my: 1 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <DriveFileRenameOutline className="me-2"/>
                                <div className="flex-1">First Name: {user.first_name}</div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <DriveFileRenameOutline className="me-2"/>
                                <div className="flex-1">Last Name: {user.last_name}</div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <AlternateEmail className="me-2"/>
                                <a href={`mailto:${user.email}`} className="mb-0">{user.email}</a>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <WorkspacePremium className="me-2"/>
                                <div className="flex-1">
                                    {pluralize('Roles', user.roles.length)}: {user.user_roles_str}
                                </div>
                            </div>
                            <div className="border-dashed-bottom my-4 d-lg-none"></div>
                        </Col>
                        <Col className="ps-2 ps-lg-3">
                            <div className="d-flex align-items-center mb-1">
                                <Badge className={'me-2'}/><strong>Personal</strong>
                            </div>
                            <Divider sx={{ my: 1 }}/>
                            <div className="d-flex align-items-center mb-2">
                                {user.gender === Gender.MALE ? <Male className="me-2"/> : <Female className="me-2"/>}
                                <div className="flex-1">
                                    <h6 className="mb-0">{user.gender ? user.gender.toUpperCase() : 'N/A'}</h6>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <LocalPhone className="me-2"/>
                                <PhoneChip textOnly phone={user.phone}/>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Paper>

            <Row>
                <Col lg={8}>
                    <Paper className={'mb-3'}>
                        <Units units={user.units}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Show;
