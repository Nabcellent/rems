import { Card } from 'react-bootstrap';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import * as yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { LoadingButton } from '@mui/lab';
import { Create } from '@mui/icons-material';
import PropTypes from 'prop-types';
import ValidationErrors from '@/components/ValidationErrors';

const validationSchema = yup.object({
    first_name: yup.string().required('First name is required.'),
    last_name: yup.string().required('Last name is required.'),
    phone: yup.string().test({
        name: 'is-valid-phone',
        message: 'Invalid phone number',
        test: val => val == null || val === '' || isValidPhoneNumber(String(val), 'KE')
    }),
    gender: yup.string().oneOf(['male', 'female']),
    email: yup.string().email().required('Email is required.'),
});

const ProfileSettings = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            first_name: user?.first_name ?? '',
            last_name: user?.last_name ?? '',
            phone: user?.phone ?? '',
            gender: user?.gender ?? '',
            email: user?.email ?? '',
            image: '',
            _method: Method.PUT
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.users.update`, { user: user.id });

            Inertia.post(url, values, {
                preserveState: false,
                onBefore: () => setIsLoading(true),
                onSuccess: () => formik.resetForm(),
                onError: errors => setErrors(errors),
                onFinish: () => setIsLoading(false)
            });
        }
    });

    return (
        <Paper className={'mb-3'} component={'form'} onSubmit={formik.handleSubmit}>
            <Card.Header><h5 className={'mb-0'}>Profile Settings</h5></Card.Header>

            <Grid component={Card.Body} container spacing={2}>
                <Grid item xs={12}><ValidationErrors errors={errors}/></Grid>
                <Grid item lg={6}>
                    <TextField label="First Name" placeholder="First name..." name={'first_name'} autoFocus
                               value={formik.values.first_name} fullWidth onChange={formik.handleChange}
                               error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                               helperText={formik.touched.first_name && formik.errors.first_name}/>
                </Grid>
                <Grid item lg={6}>
                    <TextField label="Last Name" placeholder="Last name..." name={'last_name'}
                               value={formik.values.last_name} fullWidth onChange={formik.handleChange}
                               error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                               helperText={formik.touched.last_name && formik.errors.last_name}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField type={'email'} label="Email" placeholder="Email..." name={'email'}
                               value={formik.values.email} fullWidth onChange={formik.handleChange}
                               error={formik.touched.email && Boolean(formik.errors.email)}
                               helperText={(formik.touched.email && formik.errors.email) ?? "Requires verification!"}/>
                </Grid>
                <Grid item md={6}>
                    <TextField type={'tel'} label="Phone Number" placeholder="Phone number..."
                               name={'phone'} value={formik.values.phone} fullWidth
                               onChange={formik.handleChange}
                               error={formik.touched.phone && Boolean(formik.errors.phone)}
                               helperText={formik.touched.phone && formik.errors.phone}/>
                </Grid>
                <Grid item md={6}>
                    <FormControl error={formik.touched.gender && Boolean(formik.errors.gender)}>
                        <FormLabel className={'m-0'} id="gender">Gender</FormLabel>
                        <RadioGroup row aria-labelledby="gender" name="gender" value={formik.values.gender}
                                    onChange={formik.handleChange}>
                            <FormControlLabel className={'mb-0'} value={'male'} control={<Radio/>}
                                              label="Male"/>
                            <FormControlLabel className={'mb-0'} value={'female'} control={<Radio/>}
                                              label="Female"/>
                        </RadioGroup>
                        <FormHelperText className={'mt-0'}>
                            {formik.touched.gender && formik.errors.gender}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} textAlign={'right'}>
                    <LoadingButton disabled={!formik.dirty} size="small" color="primary" loading={isLoading}
                                   loadingPosition="end" type={'submit'}
                                   onClick={() => formik.submitForm()} endIcon={<Create/>}
                                   variant="contained">Update
                    </LoadingButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

ProfileSettings.propTypes = {
    user: PropTypes.object.isRequired
};

export default ProfileSettings;
