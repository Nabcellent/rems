import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Alert, Avatar, Button, Divider, IconButton, Paper } from '@mui/material';
import {
    AlternateEmail,
    Apartment,
    Badge,
    CurrencyPound,
    DeleteSweep,
    Edit,
    HomeRepairService,
    LocalPhone,
    LocationOn,
    OtherHouses,
    Person
} from '@mui/icons-material';
import { Morphable } from '@/utils/enums';
import StatusChip from '@/components/chips/StatusChip';
import { handleDelete, parsePhone } from '@/utils/helpers';
import CountUp from 'react-countup';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react';
import moment from 'moment';
import Images from '@/components/crud/Images';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import ServiceModal from '@/pages/dashboard/estates/components/ServiceModal';
import Policies from '@/components/crud/Policies';
import Units from '@/pages/dashboard/properties/components/Units';
import Map from '@/components/Map';
import MainImage from '@/components/MainImage';
import ChangeOwner from '@/components/crud/ChangeOwner';
import Amenities from '@/components/crud/Amenities';
import PhoneChip from '@/components/chips/PhoneChip';

const Show = ({ errors, estate, services, amenities, googleMapsKey, canChangeOwner }) => {
    console.log(estate);
    const [service, setService] = useState(undefined);
    const [showServiceModal, setShowServiceModal] = useState(false);

    const assetCount = estate.properties_count + estate.units_count;

    const handleCreateService = () => {
        setService(undefined);
        setShowServiceModal(true);
    };

    const handleUpdateService = service => {
        setService(service);
        setShowServiceModal(true);
    };

    return (
        <Dashboard errors={errors} title={'Estates'}>
            <Breadcrumbs title="Estates" breadcrumbItem={estate.name}/>

            <Paper className={'mb-3'}>
                <Card.Header className="position-relative min-vh-25 mb-7">
                    <div className="bg-holder rounded-3 rounded-bottom-0"
                         style={{ backgroundImage: 'url(/images/users/profile-default.jpg)' }}></div>
                    <MainImage image={estate.image} imageable={'estate'} imageableId={estate.id}/>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <div className="d-flex justify-content-between">
                                <h5 className="mb-0">{estate.name}</h5>
                                <div>
                                    <IconButton component={Link} className={'mx-1'}
                                                href={route(`dashboard.estates.edit`, estate)}> <Edit/>
                                    </IconButton>
                                    {canChangeOwner && <ChangeOwner entity={'estate'} entityId={estate.id}/>}
                                    <StatusChip status={estate.status} entity={'estate'} entityId={estate.id}/>
                                </div>
                            </div>
                            <Divider sx={{ my: 2 }}/>
                        </Col>
                        <Col md={7} className={'mb-3 mb-lg-0'}>
                            <div className="d-flex align-items-center mb-1">
                                <Badge className={'me-2'}/><strong>Estate</strong>
                            </div>
                            <Divider sx={{ my: 1 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <LocationOn className="me-2"/>
                                <div className="flex-1"><h6 className="mb-0">{estate.address}</h6></div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <OtherHouses className="me-2"/>
                                <div className="flex-1">
                                    <CountUp end={assetCount}/> Asset{assetCount === 1 ? '' : 's'}
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <CurrencyPound className="me-2"/>
                                <div className="flex-1">
                                    <strong>
                                        <CountUp end={estate.service_charge} prefix={'KES '} separator={','}/> -
                                    </strong>
                                    Service Charge
                                </div>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div className="d-flex align-items-center mb-1">
                                <Badge className={'me-2'}/><strong>Owner</strong>
                            </div>
                            <Divider sx={{ my: 1 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <Person className="me-2"/>
                                <Link href={route('dashboard.users.show', estate.user)}>
                                    {estate.user.full_name} -
                                    <i><small className="text-secondary">{estate.user.user_roles_str}</small></i>
                                </Link>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <AlternateEmail className="me-2"/>
                                <a href={`mailto:${estate.user.email}`} className="mb-0">{estate.user.email}</a>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <LocalPhone className="me-2"/>
                                <PhoneChip textOnly phone={estate.user.phone}/>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Paper>

            <Row className={'mb-3 g-3 justify-content-center'}>
                <Col sm={7}>
                    {
                        Boolean(estate.properties.length) && (
                            <Paper className={'mb-3'}>
                                <Card.Header><h5 className={'mb-0'}>Properties</h5></Card.Header>
                                <Card.Body>
                                    {
                                        !estate.properties.length
                                            ? <Alert severity="info">This unit hasn't any room yet.</Alert>
                                            : estate.properties.map(property => (
                                                <div key={`property-${property.id}`}
                                                     className="d-flex align-items-center px-1 py-2">
                                                    <Avatar sx={{ width: 30, height: 30 }} className="me-3">
                                                        <Apartment color={'primary'}/>
                                                    </Avatar>
                                                    <div className="w-100">
                                                        <Link className="mb-0"
                                                              href={route('dashboard.properties.show', { property: property.id })}>
                                                            <strong>{property.type}</strong>
                                                        </Link>
                                                        <div className={'d-flex justify-content-between'}>
                                                            <Link
                                                                href={route('dashboard.users.show', { user: property.user.id })}>
                                                                <small className="mb-1">
                                                                    For <strong>{property.user.email}</strong>
                                                                </small>
                                                            </Link>
                                                            <small className="text-muted">
                                                                <i>{moment(property.created_at).format("MMMM D, LT")}</i>
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </Card.Body>
                            </Paper>
                        )
                    }
                    {
                        Boolean(estate.units.length) && (
                            <Paper className={'mb-3'}>
                                <Units unitable={Morphable.ESTATE} units={estate.units} unitableId={estate.id}/>
                            </Paper>
                        )
                    }
                    <Paper className={'mb-3'}>
                        <Images imageableId={estate.id} images={estate.images} imageable={Morphable.ESTATE}/>
                    </Paper>

                    <Paper className={'p-3'}>
                        <Map apiKey={googleMapsKey} center={{ lat: estate.latitude, lng: estate.longitude }}/>
                    </Paper>
                </Col>
                <Col sm={5}>
                    <div className="sticky-sidebar">
                        <Paper className={'ask-analytics mb-3'}>
                            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                                <h5 className={'m-0'}>Services</h5>
                                <Button startIcon={<HomeRepairService/>}
                                        onClick={() => handleCreateService()}>Add</Button>
                            </Card.Header>
                            <Card.Body>
                                {
                                    !estate.services.length
                                        ? <Alert severity="info">This Estate Hasn't any service(s) yet.</Alert>
                                        : estate.services.map(service => (
                                            <div key={`service-${service.id}`}
                                                 className="border border-1 rounded-2 px-3 py-2 ask-analytics-item position-relative mb-3 hover-actions-trigger">
                                                <div className="d-flex align-items-center mb-3">
                                                    {service.icon ??
                                                        <FontAwesomeIcon icon={faScrewdriverWrench}
                                                                         className={'text-primary'}
                                                                         role={'img'}/>}
                                                    <Link className="stretched-link text-decoration-none" href="#">
                                                        <h5 className="fs--1 text-600 mb-0 ps-3">{service.name}</h5>
                                                    </Link>
                                                </div>
                                                <h6 className="fs--1 text-800">
                                                    {service.pivot.description ?? service.description}
                                                </h6>
                                                <div className="hover-actions end-0 top-50 translate-middle-y me-2">
                                                    <button onClick={() => handleUpdateService(service)}
                                                            className="border-300 me-1 text-600 btn btn-light btn-sm">
                                                        <Edit/>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(route('dashboard.estate-services.destroy', { estate_service: service.pivot.id }), 'Service')}
                                                        className="border-300 text-600 btn btn-danger btn-sm">
                                                        <DeleteSweep/>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                }
                            </Card.Body>
                        </Paper>

                        <Paper className={'mb-3'}>
                            <Amenities amenitiable={'estate'} allAmenities={amenities} amenities={estate.amenities}
                                       amenitiableId={estate.id}/>
                        </Paper>

                        <Paper className={'mb-3'}>
                            <Policies policeable={'estate'} policies={estate.policies} policeableId={estate.id}/>
                        </Paper>
                    </div>
                </Col>
            </Row>

            <ServiceModal showModal={showServiceModal} setShowModal={setShowServiceModal} estateId={estate.id}
                          service={service} services={services}/>
        </Dashboard>
    );
};

export default Show;
