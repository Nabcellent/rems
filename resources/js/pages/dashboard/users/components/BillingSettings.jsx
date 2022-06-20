import { Divider, FormControlLabel, FormGroup, Grid, Paper, Switch } from '@mui/material';
import { Card } from 'react-bootstrap';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AccountSettings from '@/pages/dashboard/users/components/AccountSettings';
import { useFormik } from 'formik';
import { Inertia } from '@inertiajs/inertia';
import ValidationErrors from '@/components/ValidationErrors';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

const BillingSettings = ({ settings }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            auto_charge_wallet: settings.auto_charge_wallet.value,
        },
        validateOnChange: true,
        onSubmit: values => {
            Inertia.put(route(`dashboard.users.settings.update`,), values, {
                    preserveState: false,
                    onBefore: () => setIsLoading(true),
                    onSuccess: () => formik.resetForm(),
                    onError: errors => setErrors(errors),
                    onFinish: () => setIsLoading(false)
                }
            )
        }
    });

    return (
        <Paper className={'mb-3'}>
            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                <h5 className={'mb-0'}>Billing Settings</h5>
                {
                    formik.dirty &&
                    <LoadingButton loading={isLoading} onClick={() => formik.handleSubmit()}><Save/></LoadingButton>
                }
            </Card.Header>

            <ValidationErrors errors={errors}/>

            <Grid component={Card.Body} container spacing={2}>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel name={'auto_charge_wallet'} control={<Switch checked={formik.values.auto_charge_wallet}/>}
                                          label="Enable wallet auto charge" onChange={formik.handleChange}/>
                    </FormGroup>
                    <div className={'border-dashed-bottom'}/>
                </Grid>
                <Grid item xs={12}>
                    <h5>Plans</h5>
                    <div className={'border-dashed-bottom'}/>
                </Grid>
                <Grid item xs={12}>
                    <h5>Payments</h5>
                </Grid>
            </Grid>
        </Paper>
    );
};

BillingSettings.propTypes = {
    settings: PropTypes.object.isRequired
};

export default BillingSettings;
