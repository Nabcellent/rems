import React, { lazy } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

//Import Breadcrumb
import Dashboard from '@/layouts/Dashboard';
import WelcomeCard from '@/pages/dashboard/default/WelcomeCard';
import CountUp from 'react-countup';
import LatestTransactions from '@/pages/dashboard/default/LatestTransactions';

const Breadcrumbs = lazy(() => import('../../components/common/Breadcrumb'));

const Default = ({ errors, estates_count, revenue }) => {
    const reports = [
        { title: "Estates", iconClass: "bx-home-circle", description: <CountUp end={estates_count}/> },
        {
            title: "Revenue",
            iconClass: "bx-archive-in",
            description: <CountUp end={revenue} prefix={'KES.'} separator={','}/>,
        },
        {
            title: "Average Price",
            iconClass: "bx-purchase-tag-alt",
            description: "$16.2",
        },
    ];

    return (
        <Dashboard errors={errors} title={'Home'}>
            <Container fluid>
                {/* Render Breadcrumbs */}
                <Breadcrumbs title="Dashboards" breadcrumbItem="Default"/>

                <Row>
                    <Col xl="4"><WelcomeCard/></Col>
                    <Col xl="8">
                        <Row>
                            {/* Reports Render */}
                            {reports.map((report, key) => (
                                <Col md="4" key={`_col_${key}`}>
                                    <Card className="mini-stats-wid">
                                        <Card.Body>
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p className="text-muted fw-medium">
                                                        {report.title}
                                                    </p>
                                                    <h4 className="mb-0">{report.description}</h4>
                                                </div>
                                                <div
                                                    className="mini-stat-icon avatar-sm rounded-circle bg-danger align-self-center">
                                                    <span className="avatar-title bg-primary">
                                                        <i className={"bx " + report.iconClass + " font-size-24"}/>
                                                    </span>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <LatestTransactions />
                    </Col>
                </Row>
            </Container>
        </Dashboard>
    );
};

export default Default;
