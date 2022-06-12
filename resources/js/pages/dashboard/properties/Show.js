import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Avatar, Button, Divider, Paper } from '@mui/material';
import {
    AlternateEmail,
    Badge,
    LocationOn,
    ManageAccounts,
    OtherHouses,
    PhoneIphone,
    ToggleOff,
    ToggleOn
} from '@mui/icons-material';
import { Morphable, Status } from '@/utils/enums';
import StatusChip from '@/components/chips/StatusChip';
import PhoneChip from '@/components/chips/PhoneChip';
import CountUp from 'react-countup';
import { Col, Row } from 'react-bootstrap';
import Images from '@/components/Images';
import Policies from '@/components/Policies';
import Units from '@/pages/dashboard/properties/components/Units';
import MainImage from '@/components/MainImage';
import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import ChangeOwner from '@/components/ChangeOwner';

const Show = ({ errors, property }) => {
    console.log(property);

    return (
        <Dashboard errors={errors} title={'Properties'}>
            <Breadcrumbs title="Properties" breadcrumbItem={`${property.estate.name} ~ ${property.type}`}/>

            <Paper className={'mb-3'}>
                <div className="position-relative min-vh-25 mb-7 card-header">
                    <div className="bg-holder rounded-3 rounded-bottom-0"
                         style={{ backgroundImage: 'url(/images/users/profile-default.jpg)' }}></div>
                    <MainImage image={property.image} imageable={'property'} imageableId={property.id}/>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-8">
                            <h4 className="mb-1">
                                {property.name}@{property.estate.name}<i className={'bx bxs-check-circle'}/>
                            </h4>
                            <Divider sx={{ my: 2 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <LocationOn fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1"><h6 className="mb-0">{property.estate.address}</h6></div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <OtherHouses fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1">
                                    <CountUp end={property.units_count}/> Unit{property.units_count === 1 ? '' : 's'}
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    {
                                        property.status === Status.ACTIVE
                                            ? <ToggleOn fontSize={'small'}/>
                                            : <ToggleOff fontSize={'small'}/>
                                    }
                                </Avatar>
                                <div className="flex-1"><StatusChip status={property.status}/></div>
                            </div>
                        </div>
                        <div className="ps-2 ps-lg-3 col">
                            <strong>Owner</strong>
                            <Divider sx={{ my: 2 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <Badge fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1">
                                    <h6 className="mb-0">{property.user.full_name}</h6>
                                    <p className="text-secondary m-0">{property.user.user_roles_str}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <AlternateEmail fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1"><h6 className="mb-0">{property.user.email}</h6></div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <PhoneIphone fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1"><PhoneChip phone={property.user.phone}/></div>
                            </div>
                            <ChangeOwner entity={'property'} entityId={property.id}/>
                        </div>
                    </div>
                </div>
            </Paper>

            <Row className={'mb-3 g-3'}>
                <Col lg={8}>
                    <Paper className={'mb-3'}>
                        <Units unitable={Morphable.PROPERTY} units={property.units} unitableId={property.id}/>
                    </Paper>
                    <Paper className={'mb-3'}>
                        <Images imageableId={property.id} images={property.images} imageable={Morphable.PROPERTY}/>
                    </Paper>
                </Col>
                <Col lg={4}>
                    <div className="sticky-sidebar">
                        <Paper className={'mb-3'}>
                            <Policies policeable={'property'} policies={property.policies} policeableId={property.id}/>
                        </Paper>
                    </div>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Show;
