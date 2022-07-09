import { Alert, Button, Grid, MenuItem, Paper, TextField } from '@mui/material';
import { Create, DeleteSweep, Edit, LocalPoliceTwoTone } from '@mui/icons-material';
import { Card, Col, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import ValidationErrors from '@/components/ValidationErrors';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingShield } from '@fortawesome/free-solid-svg-icons';
import { currencyFormat, handleDelete, str } from '@/utils/helpers';
import { RentFrequency } from '@/utils/enums';
import pluralize from 'pluralize';
import LeaderList from '@/components/LeaderList';
import moment from 'moment';

const Policies = ({ plans, leaseId }) => {
    const [plan, setPlan] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            lease_id: leaseId,
            deposit: plan?.deposit ?? 0,
            rent_amount: plan?.rent_amount ?? '',
            frequency: RentFrequency.MONTHLY,
            due_day: plan?.due_day ?? '',
        },
        validationSchema: yup.object().shape({
            deposit: yup.number(),
            rent_amount: yup.number().min(1).required('Amount for rent is required.'),
            frequency: yup.string().oneOf(Object.values(RentFrequency), 'Invalid rent frequency.'),
            due_day: yup.number().integer().positive().moreThan(1).lessThan(31).required('Due date is required.')
        }),
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.payment-plans.store`);

            if (plan) {
                url = route(`dashboard.payment-plans.update`, { payment_plan: plan.id });
                values._method = Method.PUT;
            }

            Inertia.post(url, values, {
                    forceFormData: true,
                    onBefore: () => setIsLoading(true),
                    onSuccess: () => {
                        setShowModal(false);
                        formik.resetForm();
                    },
                    onError: errors => setErrors(errors),
                    onFinish: () => setIsLoading(false)
                }
            );
        }
    });

    const handleCreate = () => {
        setPlan(undefined);
        formik.setValues(formik.initialValues);
        setShowModal(true);
    };

    const handleUpdate = plan => {
        setPlan(plan);
        formik.setValues({
            lease_id: leaseId,
            deposit: plan.deposit,
            rent_amount: plan.rent_amount,
            frequency: plan.frequency,
            due_day: plan.due_day,
        }, true);
        setShowModal(true);
    };

    return (
        <Paper>
            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                <h5 className={'mb-0'}>Payment {pluralize('Plan', plans.length)}</h5>
                <Button startIcon={<LocalPoliceTwoTone/>} onClick={() => handleCreate()}>Add</Button>
            </Card.Header>
            <Card.Body className={'row'}>
                {
                    !plans.length
                        ? (
                            <Alert severity="error">
                                This lease hasn't any plan yet. {' '}
                                <a className={'text-primary'} onClick={() => setShowModal(true)}>
                                    <b>Add a Plan</b>
                                </a>
                            </Alert>
                        ) : plans.map(plan => (
                            <Col lg={plans.length > 1 ? 6 : 12} key={`policy-${plan.id}`}
                                 className="border border-1 rounded-2 px-3 py-2 ask-analytics-item position-relative mb-3 hover-actions-trigger">
                                <LeaderList items={[
                                    { key: <strong>Deposit</strong>, value: currencyFormat(plan.deposit) },
                                    { key: <strong>Rent Amount</strong>, value: currencyFormat(plan.rent_amount) },
                                    { key: <strong>Rent Frequency</strong>, value: plan.frequency },
                                    { key: <strong>Due Date</strong>, value: moment(plan.due_day, 'D').format('Do') },
                                ]}/>

                                <div className="hover-actions end-0 top-50 translate-middle-y me-2">
                                    <button onClick={() => handleUpdate(plan)}
                                            className="border-300 me-1 text-600 btn btn-light btn-sm">
                                        <Edit fontSize={'small'}/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(route('dashboard.payment-plans.destroy', { payment_plan: plan.id }), 'Payment Plan')}
                                        className="border-300 text-600 btn btn-danger btn-sm">
                                        <DeleteSweep fontSize={'small'}/>
                                    </button>
                                </div>
                            </Col>
                        ))
                }
            </Card.Body>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1 translate-y-50">
                    <button className="btn-close btn btn-sm btn-circle d-flex" onClick={() => setShowModal(false)}/>
                </div>
                <Modal.Body className={'modal-body'}>
                    <div className="pb-3">
                        <h4 className="mb-1">{(plan ? "Update" : "New") + " Payment Plan"}</h4>
                    </div>
                    <ValidationErrors errors={errors}/>

                    <Grid container spacing={2}>
                        <Grid item lg={6}>
                            <TextField label="Deposit" type={'number'} placeholder="Deposit..." name={`deposit`}
                                       value={formik.values.deposit} onChange={e => formik.handleChange(e)}
                                       error={formik.touched.deposit && Boolean(formik.errors.deposit)}
                                       helperText={formik.errors.deposit}/>
                        </Grid>
                        <Grid item lg={6}>
                            <TextField label="Amount Ror Rent" type={'number'} placeholder="Amount for rent..."
                                       name={`rent_amount`}
                                       value={formik.values.rent_amount} onChange={e => formik.handleChange(e)}
                                       error={formik.touched.rent_amount && Boolean(formik.errors.rent_amount)}
                                       helperText={formik.touched.rent_amount && formik.errors.rent_amount}/>
                        </Grid>
                        <Grid item lg={12}>
                            <TextField label="Rent Frequency" placeholder="Rent frequency..." select name={`frequency`}
                                       value={formik.values.frequency} onChange={e => formik.handleChange(e)}
                                       error={Boolean(formik.errors.frequency)} helperText={formik.errors.frequency}>
                                {
                                    Object.values(RentFrequency)
                                          .map((freq, i) => (
                                              <MenuItem key={`type-${i}`} value={freq}>{str.headline(freq)}</MenuItem>
                                          ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item lg={12}>
                            <TextField label="Due Date" placeholder="Due date..." select name={`due_day`}
                                       value={formik.values.due_day} onChange={e => formik.handleChange(e)}
                                       error={formik.touched.due_day && Boolean(formik.errors.due_day)}
                                       helperText={formik.touched.due_day && formik.errors.due_day}>
                                {
                                    Array(31).fill(0)
                                             .map((d, i) => (
                                                 <MenuItem key={`day-${i}`} value={i + 1}>{i + 1}</MenuItem>
                                             ))
                                }
                            </TextField>
                        </Grid>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button size={'small'} className={'me-2'} onClick={() => setShowModal(false)}
                            color={'inherit'}>Cancel</Button>
                    <LoadingButton type={'submit'} size="small" color="primary" loading={isLoading}
                                   loadingPosition="end"
                                   onClick={() => formik.submitForm()} endIcon={<Create/>} variant="contained">
                        {plan ? "Update" : "Create"}
                    </LoadingButton>
                </Modal.Footer>
            </Modal>
        </Paper>
    );
};

Policies.propTypes = {
    plans: PropTypes.array.isRequired,
    leaseId: PropTypes.number.isRequired
};

export default Policies;
