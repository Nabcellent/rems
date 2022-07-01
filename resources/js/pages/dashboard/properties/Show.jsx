import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Avatar, Divider, IconButton, Paper } from '@mui/material';
import {
    AlternateEmail,
    Badge,
    Countertops,
    Edit,
    LocalPhone,
    LocationOn, MapsHomeWork,
    OtherHouses,
    Person
} from '@mui/icons-material';
import { Morphable } from '@/utils/enums';
import StatusChip from '@/components/chips/StatusChip';
import PhoneChip from '@/components/chips/PhoneChip';
import CountUp from 'react-countup';
import { Col, Row, Card } from 'react-bootstrap';
import Images from '@/components/crud/Images';
import Policies from '@/components/crud/Policies';
import Units from '@/pages/dashboard/properties/components/Units';
import MainImage from '@/components/MainImage';
import React from 'react';
import ChangeOwner from '@/components/crud/ChangeOwner';
import { Link } from '@inertiajs/inertia-react';
import { parsePhone } from '@/utils/helpers';
import pluralize from 'pluralize';

const Show = ({ errors, property, canChangeOwner }) => {
    console.log(property);

    return (
        <Dashboard errors={errors} title={'Properties'}>
            <Breadcrumbs title="Properties" breadcrumbItem={`${property.estate.name} ~ ${property.type}`}/>

            <Paper className={'mb-3'}>
                <Card.Header className="position-relative min-vh-25 mb-7 card-header">
                    <div className="bg-holder rounded-3 rounded-bottom-0"
                         style={{ backgroundImage: 'url(/images/users/profile-default.jpg)' }}></div>
                    <MainImage image={property.image} imageable={'property'} imageableId={property.id}/>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <div className="d-flex justify-content-between">
                                <h5 className="mb-0">
                                    {property.name}@
                                    <Link href={route('dashboard.estates.show', property.estate)}>
                                        {property.estate.name}
                                    </Link>
                                </h5>
                                <div>
                                    <IconButton component={Link} className={'mx-1'}
                                                href={route(`dashboard.properties.edit`, property)}> <Edit/>
                                    </IconButton>
                                    {canChangeOwner && <ChangeOwner entity={'property'} entityId={property.id}/>}
                                    <StatusChip status={property.status} entity={'property'} entityId={property.id}/>
                                </div>
                            </div>
                            <Divider sx={{ my: 2 }}/>
                        </Col>
                        <Col lg={7}>
                            <div className="d-flex align-items-center mb-1">
                                <Badge className={'me-2'}/><strong>Property</strong>
                            </div>
                            <Divider sx={{ my: 1 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <LocationOn className="me-2"/>
                                <div className="flex-1"><h6 className="mb-0">{property.estate.address}</h6></div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <MapsHomeWork className="me-2"/>
                                <div className="flex-1">Type: {property.type}</div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <OtherHouses className="me-2"/>
                                <div className="flex-1">
                                    <CountUp end={property.units_count}/> {pluralize('Unit', property.units_count)}
                                </div>
                            </div>
                        </Col>
                        <Col lg={5} className="ps-2 ps-lg-3">
                            <div className="d-flex align-items-center mb-1">
                                <Badge className={'me-2'}/><strong>Owner</strong>
                            </div>
                            <Divider sx={{ my: 1 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <Person className="me-2"/>
                                <Link href={route('dashboard.users.show', property.user)}>
                                    {property.user.full_name} -
                                    <i><small className="text-secondary">{property.user.user_roles_str}</small></i>
                                </Link>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <AlternateEmail className="me-2"/>
                                <a href={`mailto:${property.user.email}`} className="mb-0">{property.user.email}</a>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <LocalPhone className="me-2"/>
                                <PhoneChip textOnly phone={property.user.phone}/>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
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
