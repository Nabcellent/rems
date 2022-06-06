import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Alert, Avatar, Button, Divider, Paper, useTheme } from '@mui/material';
import {
    AddAPhoto, AddBusiness,
    AlternateEmail,
    Badge, DeleteSweep, Edit,
    LocationOn, PersonOutlined,
    PhoneIphone,
    SupervisorAccount,
    ToggleOff,
    ToggleOn
} from '@mui/icons-material';
import { Imageable, Status } from '@/utils/enums';
import StatusBadge from '@/components/StatusBadge';
import PhoneBadge from '@/components/PhoneBadge';
import CountUp from 'react-countup';
import { Card, Col, Row } from 'react-bootstrap';
import pluralize from 'pluralize';
import { Link } from '@inertiajs/inertia-react';
import moment from 'moment';
import Photos from '@/components/Photos';
import AddImageModal from '@/components/AddImageModal';
import { useState } from 'react';
import { getInitials, handleDelete } from '@/utils/helpers';
import RoomModal from '@/pages/dashboard/units/components/RoomModal';

const Show = ({ errors, unit }) => {
    console.log(unit);
    const theme = useTheme();
    const [room, setRoom] = useState(undefined);
    const [showImageModal, setShowImageModal] = useState(false);
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
        <Dashboard errors={errors} title={'Properties'}>
            <Breadcrumbs title="Properties" breadcrumbItem={`${unit.estate.name} ~ ${unit.house_number}`}/>

            <Paper className={'mb-3'}>
                <div className="position-relative min-vh-25 mb-7 card-header">
                    <div className="bg-holder rounded-3 rounded-bottom-0"
                         style={{ backgroundImage: 'url(/images/users/profile-default.jpg)' }}></div>
                    <Avatar sx={{
                        position: 'absolute',
                        bottom: 0,
                        fontSize: '20pt',
                        transform: 'translateY(50%)',
                        width: '10rem',
                        height: '10rem',
                        backgroundColor: theme.palette.primary.main
                    }} src={`/images/properties/${unit.image}`}>
                        {unit.house_number}
                    </Avatar>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-8">
                            <h4 className="mb-1">
                                Hse No. {unit.house_number}<i className={'bx bxs-check-circle'}/>
                            </h4>
                            <Divider sx={{ my: 2 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <LocationOn fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1"><h6 className="mb-0">{unit.estate.address}</h6></div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <SupervisorAccount fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1">
                                    <CountUp end={pastTenantsCount}/> Past {pluralize('tenant', pastTenantsCount)}
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    {
                                        unit.status === Status.ACTIVE
                                            ? <ToggleOn fontSize={'small'}/>
                                            : <ToggleOff fontSize={'small'}/>
                                    }
                                </Avatar>
                                <div className="flex-1"><StatusBadge status={unit.status}/></div>
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
                                    <h6 className="mb-0">{unit.user.full_name}</h6>
                                    <p className="text-secondary m-0">{unit.user.user_roles_str}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <AlternateEmail fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1"><h6 className="mb-0">{unit.user.email}</h6></div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <PhoneIphone fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1"><PhoneBadge phone={unit.user.phone}/></div>
                            </div>
                            <Button variant={'outlined'}
                                    className="px-3 ms-2 btn btn-falcon-default btn-sm">Notify</Button>
                        </div>
                    </div>
                </div>
            </Paper>

            <Row className={'mb-3 g-3'}>
                <Col lg={8}>
                    <Row>
                        <Col sm={12}>
                            <Paper className={'mb-3'}>
                                <Card.Header><h5 className={'mb-0'}>Tenant History</h5></Card.Header>
                                <Card.Body>
                                    {
                                        !unit.leases.length
                                            ? <Alert severity="info">This Unit Hasn't had a tenant yet.</Alert>
                                            : unit.leases.map((lease, i) => (
                                                <div key={`lease-${lease.id}`} className="d-flex">
                                                    <Link href="/user/profile#!">
                                                        <PersonOutlined/>
                                                    </Link>
                                                    <div className="flex-1 position-relative ps-3">
                                                        <h6 className="fs-0 mb-0">
                                                            <Link href="/user/profile#!">{lease.user.full_name}</Link>
                                                            {
                                                                lease.status === Status.ACTIVE &&
                                                                <span><i className={'fas fa-check-circle'}></i></span>
                                                            }
                                                        </h6>
                                                        <p className="mb-1">{lease.user.email} ~ {lease.user.phone}</p>
                                                        <p className="text-muted mb-0">
                                                            {moment(lease.start_date).format("LL")}
                                                            &nbsp;-&nbsp;
                                                            {moment(lease.end_date).format("LL")}
                                                        </p>
                                                        {i < unit.leases.length - 1 &&
                                                            <div className="border-dashed-bottom my-3"/>}
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </Card.Body>
                            </Paper>
                        </Col>
                        <Col sm={12}>
                            <Paper className={'mb-3'}>
                                <Card.Header className={'d-flex justify-content-between align-items-center'}>
                                    <h5 className={'mb-0'}>Photos</h5>
                                    <Button startIcon={<AddAPhoto/>}
                                            onClick={() => setShowImageModal(true)}>Add</Button>
                                </Card.Header>
                                <Card.Body>
                                    <Photos images={unit.images} directory={'units'} style={'quilted'}/>
                                </Card.Body>
                            </Paper>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4}>
                    <Paper className={'mb-3'}>
                        <Card.Header className={'d-flex justify-content-between align-items-center'}>
                            <h5 className={'mb-0'}>Rooms</h5>
                            <Button startIcon={<AddBusiness/>} onClick={() => handleCreateRoom()}>Add</Button>
                        </Card.Header>
                        <Card.Body>
                            {
                                !unit.rooms.length
                                    ? <Alert severity="info">This Unit Hasn't any room yet.</Alert>
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
                                                            <Edit fontSize={'small'}/>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(route('dashboard.rooms.destroy', { room: room.id }), 'room')}
                                                            className="border-300 text-600 btn btn-danger btn-sm">
                                                            <DeleteSweep fontSize={'small'}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {i < unit.rooms.length - 1 && <div className={'border-dashed-bottom my-3'}/>}
                                        </div>
                                    ))
                            }
                        </Card.Body>
                    </Paper>

                    <Paper className={'mb-3'}>
                        <Card.Header className={'d-flex justify-content-between align-items-center'}>
                            <h5 className={'mb-0'}>Policies</h5>
                            <Button startIcon={<AddBusiness/>} onClick={() => handleCreateRoom()}>Add</Button>
                        </Card.Header>
                    </Paper>
                </Col>
            </Row>

            <RoomModal showModal={showRoomModal} setShowModal={setShowRoomModal} unitId={unit.id} room={room}/>

            <AddImageModal imageable={Imageable.UNIT} imageableId={unit.id} showModal={showImageModal}
                           setShowModal={setShowImageModal}/>
        </Dashboard>
    );
};

export default Show;
