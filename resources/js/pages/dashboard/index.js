import React, { lazy } from "react";
import { Container } from "react-bootstrap";

//Import Breadcrumb
import Dashboard from '@/layouts/Dashboard';

const Breadcrumbs = lazy(() => import('../../components/common/Breadcrumb'))

const Default = ({errors}) => {
    return (
        <Dashboard errors={errors} title={'Home'}>
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Dashboards" breadcrumbItem="Default" />
                </Container>
        </Dashboard>
    )
}

export default Default
