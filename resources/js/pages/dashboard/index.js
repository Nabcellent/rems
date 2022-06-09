import React, { lazy } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

//Import Breadcrumb
import Dashboard from '@/layouts/Dashboard';
import WelcomeCard from '@/pages/dashboard/default/WelcomeCard';
import CountUp from 'react-countup';
import LatestTransactions from '@/pages/dashboard/default/LatestTransactions';
import { Grid, Paper } from '@mui/material';

const Breadcrumbs = lazy(() => import('../../components/common/Breadcrumb'));

const Default = ({
    errors,
    new_estates_count,
    new_users_count,
    new_tickets_count,
    revenue,
    service_providers_count
}) => {
    const reports = [
        {
            title: "New Estates",
            iconClass: "bx-home-circle",
            description: <CountUp end={new_estates_count}/>,
            col: '4'
        },
        {
            title: "Revenue",
            iconClass: "bx-archive-in",
            description: <CountUp end={revenue} prefix={'KES.'} separator={','}/>,
            col: '4'
        },
        {
            title: "Service Providers",
            iconClass: "bx-hard-hat",
            description: <CountUp end={service_providers_count}/>,
            col: '4'
        },
        { title: "New Users", iconClass: "bx-user-plus", description: <CountUp end={new_users_count}/>, col: '6' },
        { title: "New Tickets", iconClass: "bx-news", description: <CountUp end={new_tickets_count}/>, col: '6' },
    ];

    return (
        <Dashboard errors={errors} title={'Home'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Dashboards" breadcrumbItem="Default"/>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item lg={4}><WelcomeCard/></Grid>
                        <Grid item lg={8}>
                            <Row className={'align-items-stretch h-100'}>
                                {/* Reports Render */}
                                {reports.map((report, key) => (
                                    <Col md={report.col} key={`_col_${key}`}
                                         className={`mb-3 ${report.col === '6' && 'mb-lg-0'}`}>
                                        <Paper sx={{ p: 3 }} className={'mini-stats-wid h-100 d-flex align-items-center'}>
                                            <div className="d-flex w-100">
                                                <div className="flex-grow-1">
                                                    <p className="text-muted fw-medium">{report.title}</p>
                                                    <h4 className="mb-0">{report.description}</h4>
                                                </div>
                                                <div
                                                    className="mini-stat-icon avatar-sm rounded-circle bg-danger align-self-center">
                                                    <span className="avatar-title bg-primary">
                                                        <i className={"bx " + report.iconClass + " font-size-24"}/>
                                                    </span>
                                                </div>
                                            </div>
                                        </Paper>
                                    </Col>
                                ))}
                            </Row>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <LatestTransactions/>
                </Grid>
            </Grid>
        </Dashboard>
    );
};

export default Default;
