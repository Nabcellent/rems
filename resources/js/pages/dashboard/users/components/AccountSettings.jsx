import { Divider, FormControlLabel, FormGroup, Grid, IconButton, Paper, Switch } from '@mui/material';
import { Card } from 'react-bootstrap';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Inertia } from '@inertiajs/inertia';
import ValidationErrors from '@/components/ValidationErrors';

const AccountSettings = ({ settings }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            hide_phone_from_others: settings.hide_phone_from_others.value,
            notify_email: settings.notify_email.value,
            notify_sms: settings.notify_sms.value,
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
            );
        }
    });

    return (
        <Paper className={'mb-3'}>
            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                <h5 className={'mb-0'}>Account Settings</h5>
                <LoadingButton loading={isLoading} onClick={() => formik.handleSubmit()}><Save/></LoadingButton>
            </Card.Header>

            <ValidationErrors errors={errors}/>

            <Grid component={Card.Body} container spacing={2}>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Switch name={'hide_phone_from_others'}
                                                           checked={formik.values.hide_phone_from_others}
                                                           onChange={formik.handleChange}/>}
                                          label="Hide phone number from other users."/>
                    </FormGroup>
                    <div className={'border-dashed-bottom'}/>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch name={'notify_email'} checked={formik.values.notify_email}
                                             onChange={formik.handleChange}/>}
                            label="Enable email notifications"/>
                        <FormControlLabel
                            control={<Switch name={'notify_sms'} checked={formik.values.notify_sms}
                                             onChange={formik.handleChange}/>}
                            label="Enable sms notifications"/>
                    </FormGroup>
                </Grid>
            </Grid>
        </Paper>
    );
};

AccountSettings.propTypes = {
    settings: PropTypes.object.isRequired,
};

export default AccountSettings;
