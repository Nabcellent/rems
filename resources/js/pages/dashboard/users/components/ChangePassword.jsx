import { Button, Divider, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField } from '@mui/material';
import { Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Create } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Inertia, Method } from '@inertiajs/inertia';

const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: { current_password: '', password: '', password_confirmation: '', _method: Method.PUT },
        onSubmit: values => {
            let url = route(`dashboard.users.store`);

            Inertia.post(url, values, {
                onBefore: () => setIsLoading(true),
                onSuccess: () => formik.resetForm(),
                onError: errors => setErrors(errors),
                onFinish: () => setIsLoading(false)
            });
        }
    });

    return (
        <Paper className={'mb-3'}>
            <Card.Header><h5 className={'mb-0'}>Billing Settings</h5></Card.Header>

            <Grid component={Card.Body} container spacing={2}>
                <Grid item xs={12}>
                    <TextField type="password" size={"small"} label="Current Password" placeholder="Current Password..."
                               name={'current_password'} value={formik.values.current_password}
                               error={formik.touched.current_password && Boolean(formik.errors.current_password)}
                               helperText={(formik.touched.current_password && formik.errors.current_password)}
                               onChange={formik.handleChange} autoComplete="off" fullWidth required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField type="password" size={"small"} label="Password" placeholder="Password..."
                               name={'password'} value={formik.values.password}
                               error={formik.touched.password && Boolean(formik.errors.password)}
                               helperText={(formik.touched.password && formik.errors.password)}
                               onChange={formik.handleChange} autoComplete="off" fullWidth required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField type="password" size={"small"} label="Confirm Password" placeholder="Confirm Password..."
                               name={'password'} value={formik.values.password_confirmation}
                               error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                               helperText={(formik.touched.password_confirmation && formik.errors.password_confirmation)}
                               onChange={formik.handleChange} autoComplete="off" fullWidth required/>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton size="small" color="primary" loading={isLoading} loadingPosition="end" fullWidth
                                   onClick={() => formik.submitForm()} endIcon={<Create/>}
                                   variant="contained">Update
                    </LoadingButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ChangePassword;
