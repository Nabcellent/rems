import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Avatar, Paper } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import { Link } from '@inertiajs/inertia-react';
import { NoticeType } from '@/utils/enums';
import { IMAGES } from '@/constants/images';
import CardBgCorner from '@/components/CardBgCorner';

const Show = ({ errors, notice }) => {
    console.log(notice);

    let date;

    if (notice.type === NoticeType.VACATION) {
        date = (
            <>
                <h5>Vacate Date:</h5>
                <div className={'border-dashed-bottom my-2'}></div>
                <strong>{moment(notice.end_at).format("ddd Do MMMM y")}</strong>
            </>
        );
    } else {
        date = (
            <>
                <h5>Duration:</h5>
                <div className={'border-dashed-bottom my-2'}></div>
                <div>From: <strong>{moment(notice.start_at).format("MMM Do y")}</strong></div>
                <div>To: <strong>{moment(notice.end_at).format("MMM Do y")}</strong></div>
            </>
        );
    }

    return (
        <Dashboard errors={errors} title={'Notice'}>
            <Breadcrumbs title="Notice" breadcrumbItem={`#${notice.id}`}/>

            <Paper className={'mb-3'}>
                <div className="position-relative min-vh-25 mb-8 card-header">
                    <div className="bg-holder rounded-3 rounded-bottom-0"
                         style={{ backgroundImage: 'url(/images/users/profile-default.jpg)' }}></div>
                    <Avatar sx={{
                        position: 'absolute',
                        bottom: 0,
                        fontSize: '20pt',
                        transform: 'translateY(50%)',
                        width: '10rem',
                        height: '10rem',
                    }}>
                        REMS
                    </Avatar>
                </div>
            </Paper>

            <Paper className={'mb-3'}>
                <CardBgCorner/>
                <Card.Body>
                    <Row>
                        <Col xs={12} className={'d-flex justify-content-between align-items-start'}>
                            <h4>Notice.</h4>
                        </Col>
                        <Col lg={4}>
                            <h5>Notice By:</h5>
                            <div className={'border-dashed-bottom my-2'}></div>
                            <p className="mb-0 fs--1">
                                <strong>Name: </strong>
                                <Link href={route('dashboard.users.show', { user: notice.user.id })}>
                                    {notice.user.full_name}
                                </Link>
                            </p>
                            <p className="mb-0 fs--1">
                                <strong>Email: </strong><a href={`mailto:${notice.user.email}`}>{notice.user.email}</a>
                            </p>
                            <p className="mb-0 fs--1">
                                <strong>Phone: </strong><a href={`tel:${notice.user.phone}`}>+{notice.user.phone}</a>
                            </p>
                        </Col>
                        <Col lg={4}>
                            <h5>Description:</h5>
                            <div className={'border-dashed-bottom my-2'}></div>
                            <p className="mb-1 fs--1">{notice.description}</p>
                        </Col>
                        <Col lg={4} className={'mb-4 mb-lg-0'}>{date}</Col>
                        <Col xs={12} className={'text-end'}>
                            <i className="mb-1 fs--1">
                                Created On: <strong>{moment(notice.created_at).format("MMMM Do YYYY")}</strong>
                            </i>
                        </Col>
                    </Row>
                </Card.Body>
            </Paper>
        </Dashboard>
    );
};

export default Show;
