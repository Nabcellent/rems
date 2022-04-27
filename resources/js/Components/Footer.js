import React, { Component } from "react";
import { Col, Row } from "reactstrap";

class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <footer className="footer">
                    <div className="container-fluid">
                        <Row>
                            <Col sm={6}>{new Date().getFullYear()} © Rems.</Col>
                            <Col sm={6}>
                                <div className="text-sm-end d-none d-sm-block">
                                    Designed & Developed by Nabcellent & Fumo
                                </div>
                            </Col>
                        </Row>
                    </div>
                </footer>
            </React.Fragment>
        )
    }
}

export default Footer;
