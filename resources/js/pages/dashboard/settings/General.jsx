import * as yup from 'yup';
import { useFormik } from 'formik';
import { Card } from 'react-bootstrap';
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Create } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { Inertia, Method } from '@inertiajs/inertia';
import ValidationErrors from '@/components/ValidationErrors';

const validationSchema = yup.object({
    site_under_maintenance: yup.bool(),
    site_phone: yup.string().test({
        name: 'is-valid-phone',
        message: 'Invalid phone number',
        test: value => isValidPhoneNumber(String(value), 'KE')
    }).required('Phone number is required.'),
    site_email: yup.string().email().max(100),
});

const General = ({ settings }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: { ...settings, group: 'general', _method: Method.PUT },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            Inertia.post(route(`dashboard.settings.update`), values, {
                    onBefore: () => setIsLoading(true),
                    onError: errors => setErrors(errors),
                    onFinish: () => setIsLoading(false)
                }
            );
        }
    });

    return (
        <Grid container spacing={2} component={Card.Body}>
            <Grid item xs={12}><ValidationErrors errors={errors}/></Grid>
            <Grid item xs={6}>
                <TextField name={'site_email'} type={'email'} fullWidth value={formik.values.site_email}
                           onChange={formik.handleChange} label="Email address"
                           error={formik.touched.site_email && Boolean(formik.errors.site_email)}
                           helperText={formik.touched.site_email && formik.errors.site_email}/>
            </Grid>
            <Grid item xs={6}>
                <TextField name={'site_phone'} type={'tel'} fullWidth value={formik.values.site_phone}
                           onChange={formik.handleChange} label="Phone number"
                           error={formik.touched.site_phone && Boolean(formik.errors.site_phone)}
                           helperText={formik.touched.site_phone && formik.errors.site_phone}/>
            </Grid>
            {/*<Grid item xs={12}>
                <FormControlLabel control={<Switch checked={formik.values.site_under_maintenance}/>}
                                  name={'site_under_maintenance'} label="Under Maintenance" labelPlacement={'top'}
                                  onChange={formik.handleChange}/>
            </Grid>*/}
            <Grid item xs={12} textAlign={'right'}>
                <LoadingButton size="small" color="primary" loading={isLoading} loadingPosition="end"
                               onClick={() => formik.submitForm()} endIcon={<Create/>} variant="contained">
                    Update
                </LoadingButton>
            </Grid>
        </Grid>
    );
};

General.propTypes = {
    settings: PropTypes.object.isRequired
};

export default General;
