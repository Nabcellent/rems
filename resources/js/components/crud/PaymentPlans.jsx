import { Alert, Button, Grid, MenuItem, Paper, TextField, Tooltip, useTheme } from '@mui/material';
import { Create, DeleteSweep, Edit, Grading, LocalPoliceTwoTone } from '@mui/icons-material';
import { Card, Col, Modal, Row } from 'react-bootstrap';
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
import PermitAction from '@/components/PermitAction';
import { Link } from '@inertiajs/inertia-react';
import { theme } from '@/theme';

const PaymentPlans = ({ plans, leaseId }) => {
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
                url = route(`dashboard.payment-plans.update`, plan);
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

    const setDefaultPlan = async plan => {
        await Sweet.fire({
            icon: "info",
            titleText: "Are you sure?",
            html: 'Kindly note that <b>ONCE</b> you set the payment method, ' +
                'you will <b>NOT</b> be able to change it until you lias with the unit owner!',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonText: "Yes, I'm sure",
            cancelButtonText: "Nope, Lemme think some more.",
            footer: 'REMS',
            backdrop: `rgba(0, 0, 123, 0.4)`
        }).then(res => {
            if (res.isConfirmed) Inertia.put(route(`dashboard.payment-plans.update`, plan), { is_default: true });
        });
    };

    plans.sort(function (a, b) {
        if (a.is_default) return -1;
        if (b.is_default) return 1;
        return 0;
    });

    return (
        <Paper>
            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                <h5 className={'mb-0'}>Payment {pluralize('Plan', plans.length)}</h5>
                <PermitAction ability={can.create.payment_plan}>
                    <Button startIcon={<LocalPoliceTwoTone/>} onClick={() => handleCreate()}>Add</Button>
                </PermitAction>
            </Card.Header>
            <Card.Body className={'px-lg-4'}>
                <ValidationErrors errors={errors}/>
                <Row>
                    {Boolean(!plans.length)
                        ? (
                            <Alert severity="error" action={(
                                <a className={'text-primary'} onClick={() => setShowModal(true)}>
                                    <b>Add a Plan</b>
                                </a>
                            )}>This lease hasn't any plan yet. {' '}
                            </Alert>
                        ) : plans.map(plan => (
                            <Col lg={plans.length > 1 ? 6 : 12} key={`policy-${plan.id}`}
                                 className={`border border-${plan.is_default ? '2 border-primary' : 1} rounded-3 px-3 px-lg-5 py-2 ask-analytics-item position-relative mb-3 hover-actions-trigger`}>
                                <LeaderList items={[
                                    { key: <strong>Deposit</strong>, value: currencyFormat(plan.deposit) },
                                    { key: <strong>Rent Amount</strong>, value: currencyFormat(plan.rent_amount) },
                                    { key: <strong>Rent Frequency</strong>, value: plan.frequency },
                                    { key: <strong>Due Date</strong>, value: moment(plan.due_day, 'D').format('Do') },
                                ]}/>

                                <div className="hover-actions end-0 top-50 translate-middle-y me-2">
                                    {!plan.is_default && (
                                        <Tooltip title={'Set as Preferred.'}>
                                            <button onClick={() => setDefaultPlan(plan)}
                                                    className="border-300 me-1 text-600 btn btn-light btn-sm">
                                                <Grading/>
                                            </button>
                                        </Tooltip>
                                    )}
                                    {plan.can?.edit && (
                                        <button onClick={() => handleUpdate(plan)} className="border-300 me-1 text-600 btn btn-light btn-sm">
                                            <Edit/>
                                        </button>
                                    )}
                                    {plan.can?.destroy && (
                                        <button
                                            onClick={() => handleDelete(route('dashboard.payment-plans.destroy', { payment_plan: plan.id }), 'Payment Plan')}
                                            className="border-300 text-600 btn btn-danger btn-sm">
                                            <DeleteSweep/>
                                        </button>
                                    )}
                                </div>
                            </Col>
                        ))}
                </Row>
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

PaymentPlans.propTypes = {
    plans: PropTypes.array.isRequired,
    leaseId: PropTypes.number.isRequired
};

export default PaymentPlans;
