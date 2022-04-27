import React from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import Admin from '@/Layouts/Admin';

const Dashboard = () => {
    return (
        <Admin>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Utility" breadcrumbItem="Starter Page" />
                </Container>
            </div>
        </Admin>
    )
}

export default Dashboard
