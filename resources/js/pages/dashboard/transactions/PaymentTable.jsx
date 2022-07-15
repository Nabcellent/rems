import { Card, Col, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { currencyFormat, parsePhone } from '@/utils/helpers';
import moment from 'moment';

const PaymentTable = ({ payment }) => {
    console.log('Payment: ', payment);

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="h4">Payment - {payment.method}</Card.Title>
                        <div className="table-responsive">
                            <Table className={'mb-0'}>
                                <thead>
                                <tr>
                                    <th>Reference</th>
                                    <th>Status</th>
                                    <th>Result</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        {payment.payable.reference} <br/>
                                        <small>{parsePhone(payment.payable.phone)}</small>
                                    </td>
                                    <td>{payment.payable.status}</td>
                                    <td>{payment.payable?.response?.result ?? 'N/A'}</td>
                                    <td>{currencyFormat(payment.payable.amount)}</td>
                                    <td>{moment(payment.payable?.response?.created_at ?? payment.payable.created_at)
                                        .calendar()}
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

PaymentTable.propTypes = {
    payment: PropTypes.object.isRequired
};

export default memo(PaymentTable);
