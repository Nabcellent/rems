import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import { Grid, Paper, TextField } from '@mui/material';
import { str } from '@/utils/helpers';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Create } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import ValidationErrors from '@/components/ValidationErrors';

const validationSchema = yup.object().shape({
    name: yup.string().required('Title is required.'),
    icon: yup.string(),
    description: yup.string(),
});

const Upsert = ({ service, action }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            name: service?.name ?? '',
            icon: service?.icon ?? '',
            description: service?.description ?? '',
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.services.store`);

            if (service) {
                url = route(`dashboard.services.update`, { service: service.id });
                values._method = Method.PUT;
            }

            Inertia.post(url, values, {
                preserveState:false,
                onBefore: () => setIsLoading(true),
                onSuccess: () => formik.resetForm(),
                onError: errors => setErrors(errors),
                onFinish: () => setIsLoading(false)
            });
        }
    });

    return (
        <Dashboard title={str.headline(`${action} Service`)}>
            <Breadcrumbs title={"Services"} breadcrumbItem={str.ucFirst(action)}/>

            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={12} xl={7}>
                    <Paper component={'form'} onSubmit={formik.handleSubmit} className={'p-3'}>
                        <ValidationErrors errors={errors}/>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Name" placeholder="Service name..." name={'name'} autoFocus
                                           value={formik.values.name} fullWidth onChange={formik.handleChange}
                                           error={formik.touched.name && Boolean(formik.errors.name)}
                                           helperText={formik.touched.name && formik.errors.name}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Description" multiline rows={2}
                                           placeholder="Describing your service..." name={'description'}
                                           value={formik.values.description} fullWidth onChange={formik.handleChange}
                                           error={formik.touched.description && Boolean(formik.errors.description)}
                                           helperText={formik.touched.description && formik.errors.description}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} textAlign={'right'} mt={2}>
                            <LoadingButton disabled={!formik.dirty} type={'submit'} size="small" color="primary" loading={isLoading}
                                           loadingPosition="end" onClick={() => formik.submitForm()}
                                           endIcon={<Create/>} variant="contained">{action}
                            </LoadingButton>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
};

export default Upsert;
