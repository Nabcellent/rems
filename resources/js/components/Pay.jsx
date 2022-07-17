import { PaymentMethod } from '@/utils/enums';
import { Modal } from 'react-bootstrap';
import { Button, FormHelperText, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AttachMoney, Create } from '@mui/icons-material';
import { useFormik } from 'formik';
import Mpesa from '@/utils/Mpesa';
import PayPal from '@/utils/PayPal';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import Wallet from '@/utils/Wallet';

const Pay = ({ details, showModal, setShowModal, onCompleted }) => {
    const formik = useFormik({
        initialValues: { method: PaymentMethod.MPESA },
        validationSchema: yup.object().shape({
            method: yup.string().oneOf(Object.values(PaymentMethod), 'method.').required('Method is required.')
        }),
        onSubmit: async values => {
            setShowModal(false);

            if (values.method === PaymentMethod.MPESA) {
                await Mpesa.fire(details, onCompleted);
            } else if (values.method === PaymentMethod.PAYPAL) {
                await PayPal.fire(details, onCompleted);
            } else if (values.method === PaymentMethod.WALLET) {
                await Wallet.fire(details, onCompleted);
            }
        }
    });

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1 translate-y-50">
                <button className="btn-close btn btn-sm btn-circle d-flex" onClick={() => setShowModal(false)}/>
            </div>
            <Modal.Body className={'modal-body'}>
                <div className="pb-3"><h4 className="mb-1">Choose Payment Method</h4></div>
                <Grid container className={'justify-content-center'}>
                    <Grid item textAlign={'center'}>
                        <ToggleButtonGroup value={formik.values.method} exclusive aria-label="payment-method"
                                           onChange={(e, value) => {
                                               if (value) formik.setFieldValue('method', value, true);
                                           }}>
                            <ToggleButton value={PaymentMethod.MPESA} aria-label="mpesa">M-Pesa</ToggleButton>
                            <ToggleButton value={PaymentMethod.PAYPAL} aria-label="paypal">PayPal</ToggleButton>
                            <ToggleButton value={PaymentMethod.WALLET} aria-label="wallet">Wallet</ToggleButton>
                        </ToggleButtonGroup>
                        <FormHelperText color={'#990000'} className={'mt-0'}>
                            {formik.touched.method && formik.errors.method}
                        </FormHelperText>
                    </Grid>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <Button size={'small'} className={'me-2'} onClick={() => setShowModal(false)}
                        color={'inherit'}>Cancel</Button>
                <Button size="small" color="primary" onClick={() => formik.submitForm()} endIcon={<AttachMoney/>}
                        variant="contained">
                    Proceed with {formik.values.method}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

Pay.propTypes = {
    details: PropTypes.shape({
        user: PropTypes.object.isRequired,
        transactionableId: PropTypes.number.isRequired,
        transactionable: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    onCompleted: PropTypes.func,
};

export default Pay;
