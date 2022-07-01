import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Avatar, Paper } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import { Link } from '@inertiajs/inertia-react';
import { NoticeType } from '@/utils/enums';
import CardBgCorner from '@/components/CardBgCorner';
import React from 'react';
import Banner from '@/components/Banner';

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

            <Banner title={'Notice.'}/>

            <Paper className={'mb-3'}>
                <CardBgCorner/>
                <Card.Body>
                    <Row>
                        <Col lg={4} className={'mb-4 mb-lg-0'}>
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
                        <Col lg={4} className={'mb-4 mb-lg-0'}>
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

            <Row>
                <Col lg={6}>
                    <Paper>
                        <Card.Header><h5 className={'mb-0'}>Recipients</h5></Card.Header>
                        <Card.Body>
                            {
                                notice.recipients.map(recipient => (
                                    <div key={`recipient-${recipient.id}`}
                                        className="d-flex justify-content-between align-items-center rounded-3 bg-light p-3  mb-2">
                                        <Link href={route("dashboard.users.show", { user: recipient.id })}>
                                            <h6 className="mb-0">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                                     data-icon="circle" viewBox="0 0 512 512"
                                                     className="svg-inline--fa fa-circle fa-w-16 fs--1 me-3 text-primary"
                                                     role="img" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="currentColor"
                                                          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                                                </svg>
                                                {recipient.email}
                                            </h6>
                                        </Link>
                                        <a className="fs--2 text-600 mb-0"
                                           href="/dashboard/project-management#!">{recipient.user_roles_str}</a>
                                    </div>
                                ))
                            }
                        </Card.Body>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Show;
