import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Alert, Avatar, Button, Divider, IconButton, Paper, Tooltip, useTheme } from '@mui/material';
import {
    AddBusiness,
    AlternateEmail, Assignment,
    Badge,
    Countertops,
    DeleteSweep,
    Edit,
    LocalPhone,
    LocationOn,
    MonetizationOn,
    Person,
    PersonOutlined,
    Sell,
    SupervisorAccount
} from '@mui/icons-material';
import { Morphable, Purpose, Status } from '@/utils/enums';
import StatusChip from '@/components/chips/StatusChip';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react';
import moment from 'moment';
import Images from '@/components/crud/Images';
import React, { useState } from 'react';
import { currencyFormat, getInitials, handleDelete } from '@/utils/helpers';
import RoomModal from '@/pages/dashboard/units/components/RoomModal';
import Policies from '@/components/crud/Policies';
import MainImage from '@/components/MainImage';
import ChangeOwner from '@/components/crud/ChangeOwner';
import Amenities from '@/components/crud/Amenities';
import CountUp from 'react-countup';
import pluralize from 'pluralize';
import PhoneChip from '@/components/chips/PhoneChip';
import { Inertia } from '@inertiajs/inertia';
import PermitAction from '@/components/PermitAction';

const Show = ({ errors, unit, amenities, canChangeOwner, canEdit }) => {
    console.log(unit);
    const theme = useTheme();
    const [room, setRoom] = useState(undefined);
    const [showRoomModal, setShowRoomModal] = useState(false);

    const pastTenantsCount = unit.leases.reduce((total, lease) => lease.status === Status.INACTIVE ? total + 1 : total + 0, 0);

    const handleCreateRoom = () => {
        setRoom(undefined);
        setShowRoomModal(true);
    };

    const handleUpdateRoom = room => {
        setRoom(room);
        setShowRoomModal(true);
    };

    return (
        <Dashboard errors={errors} title={'Units'}>
            <Breadcrumbs title="Units" breadcrumbItem={`${unit.estate.name} ~ ${unit.house_number}`}/>

            <Paper className={'mb-3'}>
                <Card.Header className="position-relative min-vh-25 mb-7">
                    <div className="bg-holder rounded-3 rounded-bottom-0"
                         style={{ backgroundImage: 'url(/images/users/profile-default.jpg)' }}></div>
                    <MainImage image={unit.image} imageable={'unit'} imageableId={unit.id}/>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <div className="d-flex justify-content-between">
                                <h5 className="mb-0">
                                    <Link href={route('dashboard.estates.show', unit.estate)}>{unit.estate.name}</Link>
                                    : Hse No. {unit.house_number}
                                </h5>
                                <div>
                                    <PermitAction ability={canEdit}>
                                        <IconButton component={Link} className={'mx-1'}
                                                    href={route(`dashboard.units.edit`, unit)}> <Edit/>
                                        </IconButton>
                                    </PermitAction>
                                    {canChangeOwner && <ChangeOwner entity={'unit'} entityId={unit.id}/>}
                                    <StatusChip status={unit.status} entity={'unit'} entityId={unit.id}/>
                                </div>
                            </div>
                            <Divider sx={{ my: 2 }}/>
                        </Col>
                        <Col lg={7}>
                            <div className="d-flex align-items-center mb-1">
                                <LocationOn className="me-2"/>
                                <div className="flex-1"><h6 className="mb-0">{unit.estate.address}</h6></div>
                            </div>
                            <Divider sx={{ my: 1 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <SupervisorAccount className="me-2"/>
                                <div className="flex-1">
                                    <CountUp end={pastTenantsCount}/> Past {pluralize('tenant', pastTenantsCount)}
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Countertops className="me-2"/>
                                <div className="flex-1">Type: {unit.type}</div>
                            </div>
                            {
                                unit.purpose !== Purpose.EITHER && (
                                    <div className="d-flex align-items-center mb-2">
                                        <MonetizationOn className="me-2"/>
                                        <div className="flex-1">Purpose: {unit.purpose}</div>
                                    </div>
                                )
                            }
                            {
                                [Purpose.SALE, Purpose.EITHER].includes(unit.purpose) && (
                                    <div className="d-flex align-items-center mb-2">
                                        <Sell className="me-2"/>
                                        <div className="flex-1">Price: {currencyFormat(unit.price)}</div>
                                    </div>
                                )
                            }
                            {
                                [Purpose.RENT, Purpose.EITHER].includes(unit.purpose) && (
                                    <div className="d-flex align-items-center mb-2">
                                        <Sell className="me-2"/>
                                        <div className="flex-1">Rent Amount: {currencyFormat(unit.rent_amount)}/m</div>
                                    </div>
                                )
                            }
                            <div className="border-dashed-bottom my-4 d-lg-none"></div>
                        </Col>
                        <Col lg={5} className="ps-2 ps-lg-3">
                            <div className="d-flex align-items-center mb-1">
                                <Badge className={'me-2'}/><strong>Owner</strong>
                            </div>
                            <Divider sx={{ my: 1 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <Person className="me-2"/>
                                <Link href={route('dashboard.users.show', unit.user)}>
                                    {unit.user.full_name} -
                                    <i><small className="text-secondary">{unit.user.user_roles_str}</small></i>
                                </Link>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <AlternateEmail className="me-2"/>
                                <a href={`mailto:${unit.user.email}`} className="mb-0">{unit.user.email}</a>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <LocalPhone className="me-2"/>
                                <PhoneChip textOnly phone={unit.user.phone}/>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Paper>

            <Row className={'mb-3 g-3'}>
                <Col lg={8}>
                    <Paper className={'mb-3'}>
                        <Card.Header className={'d-flex justify-content-between'}>
                            <h5 className={'mb-0'}>Tenant History</h5>
                            <PermitAction ability={can.create.lease}>
                                <Button component={Link} href={route('dashboard.leases.create', { unit: unit.id })}
                                        startIcon={<Assignment/>}>
                                    New lease
                                </Button>
                            </PermitAction>
                        </Card.Header>
                        <Card.Body>
                            {
                                !unit.leases.length
                                    ? <Alert severity="info">This Unit Hasn't had a tenant yet.</Alert>
                                    : unit.leases.map((lease, i) => (
                                        <Tooltip key={`lease-${lease.id}`}
                                                 title={`${lease.status === Status.ACTIVE ? 'Active' : 'Past'} Tenant`}>
                                            <div className={`d-flex ${lease.status === Status.ACTIVE && 'fw-bolder'}`}>
                                                <Link
                                                    href={route('dashboard.users.show', lease.user)}><PersonOutlined/></Link>
                                                <div className="flex-1 position-relative ps-3">
                                                    <h6 className={`fs-0 mb-0 ${lease.status === Status.ACTIVE && 'text-primary'}`}>
                                                        <Link
                                                            href={route('dashboard.users.show', lease.user)}>{lease.user.full_name}</Link>
                                                        {
                                                            lease.status === Status.ACTIVE &&
                                                            <i className={'fas fa-check-circle ps-2'}></i>
                                                        }
                                                    </h6>
                                                    <p className="mb-1">{lease.user.email}</p>
                                                    <p className="text-muted mb-0">
                                                        {moment(lease.start_date).format("LL")}
                                                        &nbsp;-&nbsp;
                                                        {moment(lease.end_date).format("LL")}
                                                    </p>
                                                    {i < unit.leases.length - 1 &&
                                                        <div className="border-dashed-bottom my-3"/>}
                                                </div>
                                            </div>
                                        </Tooltip>
                                    ))
                            }
                        </Card.Body>
                    </Paper>
                    <Paper className={'mb-3'}>
                        <Images imageableId={unit.id} images={unit.images} imageable={Morphable.UNIT}/>
                    </Paper>
                </Col>
                <Col lg={4}>
                    <div className="sticky-sidebar">
                        <Paper className={'mb-3'}>
                            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                                <h5 className={'mb-0'}>Rooms</h5>
                                <PermitAction ability={can.create.room}>
                                    <Button startIcon={<AddBusiness/>} onClick={() => handleCreateRoom()}>Add</Button>
                                </PermitAction>
                            </Card.Header>
                            <Card.Body>
                                {
                                    !unit.rooms.length
                                        ? <Alert severity="info">This unit hasn't any room yet.</Alert>
                                        : unit.rooms.map((room, i) => (
                                            <div key={`room-${room.id}`}>
                                                <div className="d-flex align-items-center hover-actions-trigger">
                                                    <div className="file-thumbnail">
                                                        <Avatar sx={{ bgcolor: theme.palette.primary.main }} alt={'image'}
                                                                src={`/images/rooms/${room.image}`} variant="rounded">
                                                            {getInitials(room.type)}
                                                        </Avatar>
                                                    </div>
                                                    <div className="ms-3 flex-shrink-1 flex-grow-1">
                                                        <h6 className="mb-0">
                                                            <Link className="stretched-link text-900 fw-semi-bold"
                                                                  href={route('dashboard.rooms.show', { room: room.id })}>
                                                                {room.type}
                                                            </Link>
                                                        </h6>
                                                        <small>{room.description}</small><br/>
                                                        {
                                                            room.width && (
                                                                <strong className="fs--1">
                                                                    <small className="fw-semi-bold">
                                                                        {room.length}m * {room.width}m
                                                                    </small>
                                                                </strong>
                                                            )
                                                        }
                                                        <div className="hover-actions end-0 top-50 translate-middle-y">
                                                            <button onClick={() => handleUpdateRoom(room)}
                                                                    className="border-300 me-1 text-600 btn btn-light btn-sm">
                                                                <Edit/>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(route('dashboard.rooms.destroy', { room: room.id }), 'room')}
                                                                className="border-300 text-600 btn btn-danger btn-sm">
                                                                <DeleteSweep/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {i < unit.rooms.length - 1 && (
                                                    <div className={'border-dashed-bottom my-3'}/>
                                                )}
                                            </div>
                                        ))
                                }
                            </Card.Body>
                        </Paper>

                        <Paper className={'mb-3'}>
                            <Amenities amenitiable={'unit'} allAmenities={amenities} amenities={unit.amenities}
                                       amenitiableId={unit.id}/>
                        </Paper>

                        <Paper className={'mb-3'}>
                            <Policies policeable={'unit'} policies={unit.policies} policeableId={unit.id}/>
                        </Paper>
                    </div>
                </Col>
            </Row>

            <RoomModal showModal={showRoomModal} setShowModal={setShowRoomModal} unitId={unit.id} room={room}/>
        </Dashboard>
    );
};

export default Show;
