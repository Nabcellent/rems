import { Col, Dropdown, Row } from 'react-bootstrap';
import { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { Link } from '@inertiajs/inertia-react';

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";

const NotificationDropdown = () => {
    const [menu, setMenu] = useState(false);

    const toggle = () => setMenu(!menu);

    return (
        <Dropdown className="dropdown d-inline-block" tag="li">
            <Dropdown.Toggle className="header-item noti-icon border-0 bg-transparent" id="page-header-notifications-dropdown">
                <i className="bx bx-bell bx-tada"/>
                <span className="badge bg-danger rounded-pill">3</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
                <div className="p-3">
                    <Row className="align-items-center">
                        <Col>
                            <h6 className="m-0"> {("Notifications")} </h6>
                        </Col>
                        <div className="col-auto">
                            <a href="#" className="small">
                                {" "}
                                View All
                            </a>
                        </div>
                    </Row>
                </div>

                <SimpleBar style={{height: "230px"}}>
                    <Link href="" className="text-reset notification-item">
                        <div className="d-flex">
                            <div className="avatar-xs me-3">
                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                      <i className="bx bx-cart"/>
                    </span>
                            </div>
                            <div className="flex-grow-1">
                                <h6 className="mt-0 mb-1">
                                    {("Your order is placed")}
                                </h6>
                                <div className="font-size-12 text-muted">
                                    <p className="mb-1">
                                        {(
                                            "If several languages coalesce the grammar"
                                        )}
                                    </p>
                                    <p className="mb-0">
                                        <i className="mdi mdi-clock-outline"/>{" "}
                                        {("3 min ago")}{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="" className="text-reset notification-item">
                        <div className="d-flex">
                            <img
                                src={avatar3}
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                            />
                            <div className="flex-grow-1">
                                <h6 className="mt-0 mb-1">James Lemire</h6>
                                <div className="font-size-12 text-muted">
                                    <p className="mb-1">
                                        {("It will seem like simplified English") +
                                            "."}
                                    </p>
                                    <p className="mb-0">
                                        <i className="mdi mdi-clock-outline"/>
                                        {("1 hours ago")}{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="" className="text-reset notification-item">
                        <div className="d-flex">
                            <div className="avatar-xs me-3">
                            <span className="avatar-title bg-success rounded-circle font-size-16">
                              <i className="bx bx-badge-check"/>
                            </span>
                            </div>
                            <div className="flex-grow-1">
                                <h6 className="mt-0 mb-1">
                                    {("Your item is shipped")}
                                </h6>
                                <div className="font-size-12 text-muted">
                                    <p className="mb-1">
                                        {(
                                            "If several languages coalesce the grammar"
                                        )}
                                    </p>
                                    <p className="mb-0">
                                        <i className="mdi mdi-clock-outline"/>{" "}
                                        {("3 min ago")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link href="" className="text-reset notification-item">
                        <div className="d-flex">
                            <img
                                src={avatar4}
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                            />
                            <div className="flex-grow-1">
                                <h6 className="mt-0 mb-1">Salena Layfield</h6>
                                <div className="font-size-12 text-muted">
                                    <p className="mb-1">
                                        {(
                                            "As a skeptical Cambridge friend of mine occidental"
                                        ) + "."}
                                    </p>
                                    <p className="mb-0">
                                        <i className="mdi mdi-clock-outline"/>
                                        {("1 hours ago")}{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </SimpleBar>
                <div className="p-2 border-top d-grid">
                    <Link className="btn btn-sm btn-link font-size-14 text-center" to="#">
                        <i className="mdi mdi-arrow-right-circle me-1"></i> <span
                        key="t-view-more">{("View More..")}</span>
                    </Link>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default NotificationDropdown;
