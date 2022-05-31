import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Alert, Avatar, Button, Divider, Paper, useTheme } from '@mui/material';
import {
    AlternateEmail,
    Badge,
    LocationOn, PersonOutlined,
    PhoneIphone,
    SupervisorAccount,
    ToggleOff,
    ToggleOn
} from '@mui/icons-material';
import { Status } from '@/utils/enums';
import StatusBadge from '@/components/StatusBadge';
import PhoneBadge from '@/components/PhoneBadge';
import CountUp from 'react-countup';
import { Card, Col, Row } from 'react-bootstrap';
import pluralize from 'pluralize';
import { Link } from '@inertiajs/inertia-react';
import moment from 'moment';

const Show = ({ errors, unit }) => {
    const theme = useTheme();
    console.log(unit);

    const pastTenantsCount = unit.leases.reduce((total, lease) => lease.status === Status.INACTIVE ? total + 1 : total + 0, 0);

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
                <Col lg={4}>
                    <Paper className={'mb-3'}>

                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Show;
