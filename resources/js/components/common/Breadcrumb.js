import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import { Link } from '@inertiajs/inertia-react';

const Breadcrumbs = ({ title, breadcrumbItem }) => {
    return (
        <React.Fragment>
            <Row>
                <Col xs="12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-18">{breadcrumbItem}</h4>
                        <div className="page-title-right">
                            <Breadcrumb className="m-0">
                                <Breadcrumb.Item active as={Link} href={'#'}>{title}</Breadcrumb.Item>
                                <Breadcrumb.Item active><Link href="#">{breadcrumbItem}</Link></Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

Breadcrumbs.propTypes = {
    breadcrumbItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
};

export default Breadcrumbs;
