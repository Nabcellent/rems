import { Col, Row } from "react-bootstrap";
import Dashboard from '@/layouts/Dashboard';
import WelcomeCard from '@/pages/dashboard/default/WelcomeCard';
import CountUp from 'react-countup';
import LatestTransactions from '@/pages/dashboard/default/LatestTransactions';
import { Grid, Paper } from '@mui/material';
import Breadcrumbs from '@/components/common/Breadcrumb';
import { Role } from '@/utils/enums';

const Default = ({
    can,
    errors,
    new_estates_count,
    new_users_count,
    new_tickets_count,
    transactions_count,
    revenue,
    service_providers_count
}) => {
    const reports = [
        {
            title: "New Tickets",
            iconClass: "bx-news",
            description: <CountUp end={new_tickets_count}/>,
            col: '4'
        }
    ];

    if (can.access.transactions) {
        reports.push({
            title: "Total Transactions",
            iconClass: "bx-money-withdraw",
            description: <CountUp end={transactions_count} separator={','}/>,
            col: '4',
        });
    }
    if (can.access.estates) {
        reports.push({
            title: "New Estates",
            iconClass: "bx-home-circle",
            description: <CountUp end={new_estates_count}/>,
            col: '4',
        });
    }
    if (can.access.services) {
        reports.push({
            title: "Service Providers",
            iconClass: "bx-hard-hat",
            description: <CountUp end={service_providers_count}/>,
            col: '4'
        });
    }
    if (can.access.units) {
        reports.push({
            title: "Revenue",
            iconClass: "bx-archive-in",
            description: <CountUp end={revenue} prefix={'KES.'} separator={','}/>,
            col: '4'
        });
    }
    if (can.access.users) {
        reports.push({
            title: "New Users",
            iconClass: "bx-user-plus",
            description: <CountUp end={new_users_count}/>,
            col: '4',
        });
    }

    reports.map((r, i) => {
        if (reports.length === 1) r.col = 12;
        if (reports.length === 2) r.col = 6;
        if (reports.length === 5) r.col = i > 2 ? 6 : 4;
    });

    return (
        <Dashboard errors={errors} title={'Home'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Dashboards" breadcrumbItem="Default"/>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item lg={4}><WelcomeCard/></Grid>
                        <Grid item lg={8}>
                            <Row className={'align-items-stretch h-100 g-3'}>
                                {/* Reports Render */}
                                {reports.map((report, key) => (
                                    <Col md={report.col} key={`_col_${key}`}>
                                        <Paper sx={{ p: 3 }}
                                               className={'mini-stats-wid h-100 d-flex align-items-center'}>
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
