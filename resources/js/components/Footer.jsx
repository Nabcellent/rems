import { memo } from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <>
            <footer className="footer shadow-lg position-absolute w-100 bottom-0">
                <div className="container-fluid mt-4 mb-2">
                    <Row>
                        <Col sm={6}>{new Date().getFullYear()} © Rems.</Col>
                        <Col sm={6}>
                            <div className="text-sm-end d-none d-sm-block">
                                Designed & Developed by Nabcellent & Ifatos
                            </div>
                        </Col>
                    </Row>
                </div>
            </footer>
        </>
    );
};

export default memo(Footer);
