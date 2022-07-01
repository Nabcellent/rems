import { Card, Col, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { memo } from 'react';

const PaymentTable = ({ transaction }) => {
    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="h4">Payment - {transaction.payment.method}</Card.Title>
                        <div className="table-responsive">
                            <Table className={'mb-0'}>
                                <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                                </thead>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

PaymentTable.propTypes = {
    transaction: PropTypes.object.isRequired
};

export default memo(PaymentTable);
