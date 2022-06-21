import { Grid, Paper, TextField } from '@mui/material';
import { Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Create } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Inertia, Method } from '@inertiajs/inertia';
import ValidationErrors from '@/components/ValidationErrors';
import PropTypes from 'prop-types';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    current_password: yup.string().required('Current password is required.'),
    password: yup.string().min(7).max(20).required('New password is required.'),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords do not match')
                              .required('Password confirmation is required')
});

const ChangePassword = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: { current_password: '', password: '', password_confirmation: '', _method: Method.PUT },
        validationSchema,
        onSubmit: values => {
            let url = route(`dashboard.users.update`, { user: user.id });

            Inertia.put(url, values, {
                onBefore: () => setIsLoading(true),
                onSuccess: () => formik.resetForm(),
                onError: errors => setErrors(errors),
                onFinish: () => setIsLoading(false)
            });
        }
    });

    return (
        <Paper className={'mb-3'}>
            <Card.Header><h5 className={'mb-0'}>Change Password</h5></Card.Header>

            <Grid component={Card.Body} container spacing={2}>
                <Grid item xs={12}><ValidationErrors errors={errors}/></Grid>
                <Grid item xs={12}>
                    <TextField type="password" size={"small"} label="Current Password" placeholder="Current Password..."
                               name={'current_password'} value={formik.values.current_password}
                               error={formik.touched.current_password && Boolean(formik.errors.current_password)}
                               helperText={(formik.touched.current_password && formik.errors.current_password)}
                               onChange={formik.handleChange} autoComplete="off" fullWidth required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField type="password" size={"small"} label="Password" placeholder="Password..."
                               name={'password'} value={formik.values.password}
                               error={formik.touched.password && Boolean(formik.errors.password)}
                               helperText={(formik.touched.password && formik.errors.password)}
                               onChange={formik.handleChange} autoComplete="off" fullWidth required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField type="password" size={"small"} label="Confirm Password" placeholder="Confirm Password..."
                               name={'password_confirmation'} value={formik.values.password_confirmation}
                               error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                               helperText={(formik.touched.password_confirmation && formik.errors.password_confirmation)}
                               onChange={formik.handleChange} autoComplete="off" fullWidth required/>
                </Grid>
                <Grid item xs={12} textAlign={'right'}>
                    <LoadingButton disabled={!formik.dirty} size="small" color="primary" loading={isLoading} loadingPosition="end"
                                   onClick={() => formik.submitForm()} endIcon={<Create/>}
                                   variant="contained">Change
                    </LoadingButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

ChangePassword.propTypes = {
    user: PropTypes.object.isRequired
};

export default ChangePassword;
