import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Avatar, Button, Divider, Paper, useTheme } from '@mui/material';
import {
    AddAPhoto,
    AlternateEmail,
    Apartment,
    Badge,
    Home,
    LocationOn,
    OtherHouses,
    PhoneIphone,
    ToggleOff,
    ToggleOn
} from '@mui/icons-material';
import { Status } from '@/utils/enums';
import StatusBadge from '@/components/StatusBadge';
import PhoneBadge from '@/components/PhoneBadge';
import { getInitials } from '@/utils/helpers';
import CountUp from 'react-countup';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react';
import moment from 'moment';
import Photos from '@/components/Photos';
import AddImageModal from '@/AddImageModal';
import { useState } from 'react';

const Show = ({ errors, estate }) => {
    const theme = useTheme();
    const [showModal, setShowModal] = useState(false)
    console.log(estate);
    const assetCount = estate.properties_count + estate.units_count;

    return (
        <Dashboard errors={errors} title={'Estates'}>
            <Breadcrumbs title="Estates" breadcrumbItem={estate.name}/>

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
                    }} src={`/images/estates/${estate.image}`}>
                        {getInitials(estate.name)}
                    </Avatar>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-8">
                            <h4 className="mb-1">
                                {estate.name}<i className={'bx bxs-check-circle'}/>
                            </h4>
                            <Divider sx={{ my: 2 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <LocationOn fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1"><h6 className="mb-0">{estate.address}</h6></div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <OtherHouses fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1">
                                    <CountUp end={assetCount}/> Asset{assetCount === 1 ? '' : 's'}
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    {
                                        estate.status === Status.ACTIVE
                                            ? <ToggleOn fontSize={'small'}/>
                                            : <ToggleOff fontSize={'small'}/>
                                    }
                                </Avatar>
                                <div className="flex-1"><StatusBadge status={estate.status}/></div>
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
                                    <h6 className="mb-0">{estate.user.full_name}</h6>
                                    <p className="text-secondary m-0">{estate.user.user_roles_str}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <AlternateEmail fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1"><h6 className="mb-0">{estate.user.email}</h6></div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <PhoneIphone fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1"><PhoneBadge phone={estate.user.phone}/></div>
                            </div>
                            <Button variant={'outlined'}
                                    className="px-3 btn btn-falcon-primary btn-sm">Following</Button>
                            <Button variant={'outlined'}
                                    className="px-3 ms-2 btn btn-falcon-default btn-sm">Notify</Button>
                        </div>
                    </div>
                </div>
            </Paper>

            <Row className={'mb-3 g-3 justify-content-center'}>
                {
                    Boolean(estate.properties.length) && (
                        <Col lg={6}>
                            <Paper className={'mb-3'}>
                                <Card.Header><h5 className={'mb-0'}>Properties</h5></Card.Header>
                                <Card.Body>
                                    {
                                        estate.properties.map(property => (
                                            <div key={`property-${property.id}`} className="d-flex align-items-center p-1">
                                                <Avatar sx={{ width: 30, height: 30 }} className="me-3">
                                                    <Apartment color={'primary'}/>
                                                </Avatar>
                                                <div className="w-100">
                                                    <Link
                                                        href={route('dashboard.properties.show', { property: property.id })}
                                                        className="mb-0">
                                                        <strong>{property.type}</strong>
                                                    </Link>
                                                    <div className={'d-flex justify-content-between'}>
                                                        <Link
                                                            href={route('dashboard.users.show', { user: property.user.id })}>
                                                            <small className="mb-1">
                                                                For <strong>{property.user.email}</strong>
                                                            </small>
                                                        </Link>
                                                        <span className="text-muted">
                                                            {moment(property.created_at).format("MMMM D, LT")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Card.Body>
                            </Paper>
                        </Col>
                    )
                }
                {
                    Boolean(estate.units.length) && (
                        <Col lg={6}>
                            <Paper className={'mb-3'}>
                                <Card.Header><h5 className={'mb-0'}>Units</h5></Card.Header>
                                <Card.Body>
                                    {
                                        estate.units.map(unit => (
                                            <Link key={`unit-${unit.id}`} className="d-flex align-items-center p-1"
                                                  href={route('dashboard.units.show', { unit: unit.id })}>
                                                <Avatar sx={{ width: 30, height: 30 }} className="me-3">
                                                    <Home color={'primary'}/>
                                                </Avatar>
                                                <div className="w-100">
                                                    <p className="mb-0">
                                                        House Number: <strong>{unit.house_number}</strong>
                                                    </p>
                                                    <div className={'d-flex justify-content-between'}>
                                                        <small className="mb-1">For <strong>{unit.purpose}</strong></small>
                                                        <span className="text-muted">
                                                            {moment(unit.created_at).format("MMMM D, LT")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </Card.Body>
                            </Paper>
                        </Col>
                    )
                }
            </Row>

            <Row>
                <Col>
                    <Paper className={'mb-3'}>
                        <Card.Header className={'d-flex justify-content-between align-items-center'}>
                            <h5 className={'mb-0'}>Photos</h5>
                            <Button startIcon={<AddAPhoto/>} onClick={() => setShowModal(true)}>Add</Button>
                        </Card.Header>
                        <Card.Body>
                            <Photos images={estate.images}/>
                        </Card.Body>
                    </Paper>
                </Col>
            </Row>

            <AddImageModal imageable={'estate'} imageableId={estate.id} showModal={showModal} setShowModal={setShowModal}/>
        </Dashboard>
    );
};

export default Show;
