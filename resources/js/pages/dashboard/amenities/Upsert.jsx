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
    title: yup.string().required('Title is required.'),
    icon: yup.string(),
    description: yup.string(),
});

const Upsert = ({ amenity, action }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            title: amenity?.title ?? '',
            icon: amenity?.icon ?? '',
            description: amenity?.description ?? '',
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.amenities.store`);

            if (amenity) {
                url = route(`dashboard.amenities.update`, { amenity: amenity.id });
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
        <Dashboard title={str.headline(`${action} Amenity`)}>
            <Breadcrumbs title={"Amenities"} breadcrumbItem={str.ucFirst(action)}/>

            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={12} xl={7}>
                    <Paper component={'form'} onSubmit={formik.handleSubmit} className={'p-3'}>
                        <ValidationErrors errors={errors}/>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Title" placeholder="Amenity title..." name={'title'} autoFocus
                                           value={formik.values.title} fullWidth onChange={formik.handleChange}
                                           error={formik.touched.title && Boolean(formik.errors.title)}
                                           helperText={formik.touched.title && formik.errors.title}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Description" multiline rows={2}
                                           placeholder="Describing your amenity..." name={'description'}
                                           value={formik.values.description} fullWidth onChange={formik.handleChange}
                                           error={formik.touched.description && Boolean(formik.errors.description)}
                                           helperText={formik.touched.description && formik.errors.description}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} textAlign={'right'} mt={2}>
                            <LoadingButton type={'submit'} size="small" color="primary" loading={isLoading}
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
