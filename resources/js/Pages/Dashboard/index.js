import React, { lazy } from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Dashboard from '@/Layouts/Dashboard';
import { Head } from '@inertiajs/inertia-react';

const Breadcrumbs = lazy(() => import('../../Components/Common/Breadcrumb'))

const Default = ({auth, errors}) => {
    return (
        <Dashboard auth={auth} errors={errors}>
            <Head><title>Home</title></Head>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Dashboards" breadcrumbItem="Default" />
                </Container>
            </div>
        </Dashboard>
    )
}

export default Default
