import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import { Autocomplete, Grid, Paper, TextField } from '@mui/material';
import { NoticeType } from '@/utils/enums';
import { str } from '@/utils/helpers';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Create } from '@mui/icons-material';
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import ValidationErrors from '@/components/ValidationErrors';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const validationSchema = yup.object().shape({
    recipients: yup.array().of(yup.object()).ensure().min(1).required('Recipients is required.'),
    type: yup.string().oneOf(Object.values(NoticeType), 'Invalid type.').required('Type is required.'),
    description: yup.string().required('Description is required.'),
    start_at: yup.date('Invalid date.').min(moment().toDate(), 'Must be today or after today.')
                 .max(moment().add('1', 'y').toDate(), 'Must be within the year.')
                 .when('type', {
                     is: value => value !== NoticeType.VACATION,
                     then: schema => schema.required('Start date is required.')
                 }),
    end_at: yup.date('Invalid date.').when('type', {
        is: NoticeType.VACATION,
        then: schema => schema.min(moment(), 'Must be today or after today.').required('Vacate date is required.'),
        otherwise: schema => schema.min(yup.ref('start_at') ?? moment(), 'Must be after start date.')
                                   .required('End date is required.'),
    }).max(moment().add('1', 'y').toDate(), 'Must be within the year.')
});

const Upsert = ({ notice, action, users }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            recipients: notice?.recipients ?? [],
            type: notice?.type ?? '',
            description: notice?.description ?? '',
            start_at: notice?.start_at,
            end_at: notice?.end_at
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            console.log(values);
            let url = route(`dashboard.notices.store`);

            if (notice) {
                url = route(`dashboard.notices.update`, { notice: notice.id });
                values._method = Method.PUT;
            }

            Inertia.post(url, { ...values, recipients: values.recipients.map(r => r.id) }, {
                    onBefore: () => setIsLoading(true),
                    onSuccess: () => formik.resetForm(),
                    onError: errors => setErrors(errors),
                    onFinish: () => setIsLoading(false)
                }
            );
        }
    });

    const isVacation = formik.values.type === NoticeType.VACATION;

    return (
        <Dashboard title={str.headline(`${action} Property`)}>
            <Breadcrumbs title={"Properties"} breadcrumbItem={str.ucFirst(action)}/>

            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={12} xl={7}>
                    <Paper component={'form'} onSubmit={formik.handleSubmit} className={'p-3'}>
                        <ValidationErrors errors={errors}/>

                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <Grid container spacing={2}>
                                <Grid item lg={6}>
                                    <Autocomplete name={'recipients[]'} multiple value={formik.values.recipients}
                                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                                  options={users.map(e => ({ label: e.email.toLowerCase(), id: e.id }))}
                                                  onChange={(event, value) => {
                                                      formik.setFieldValue('recipients', value, true);
                                                  }} renderInput={(params) => (
                                        <TextField {...params} label="Select Recipients" required
                                                   placeholder={'Select recipients...'}
                                                   error={formik.touched.recipients && Boolean(formik.errors.recipients)}
                                                   helperText={formik.touched.recipients && formik.errors.recipients}/>
                                    )}/>
                                </Grid>
                                <Grid item lg={6}>
                                    <Autocomplete name={'type'} freeSolo options={Object.values(NoticeType)}
                                                  value={formik.values.type} onChange={(event, value) => {
                                        formik.setFieldValue('type', value, true);
                                    }} renderInput={(params) => (
                                        <TextField {...params} label="Type" required placeholder={'Notice type...'}
                                                   error={formik.touched.type && Boolean(formik.errors.type)}
                                                   helperText={formik.touched.type && formik.errors.type}/>
                                    )}/>
                                </Grid>
                                {
                                    !isVacation && (
                                        <Grid item xs={6}>
                                            <DatePicker label="Start Date" value={formik.values.start_at} minDate={moment()}
                                                        maxDate={moment().add(1, 'year')}
                                                        onChange={(newValue) => formik.setFieldValue('start_at', newValue, true)}
                                                        renderInput={params => (
                                                            <TextField {...params} fullWidth
                                                                       error={formik.touched.start_at && Boolean(formik.errors.start_at)}
                                                                       helperText={formik.touched.start_at && formik.errors.start_at}
                                                                       placeholder={'Start Date'}/>
                                                        )}/>
                                        </Grid>
                                    )
                                }
                                <Grid item xs={isVacation ? 12 : 6}>
                                    <DatePicker label={isVacation ? 'Vacate Date' : 'End date'}
                                                value={formik.values.end_at}
                                                minDate={isVacation ? moment() : formik.values.start_at ?? moment()}
                                                maxDate={moment().add(1, 'year')}
                                                onChange={(newValue) => formik.setFieldValue('end_at', newValue, true)}
                                                renderInput={params => (
                                                    <TextField {...params} fullWidth
                                                               error={formik.touched.end_at && Boolean(formik.errors.end_at)}
                                                               helperText={formik.touched.end_at && formik.errors.end_at}
                                                               placeholder={isVacation ? 'Vacate Date' : 'End date'}/>
                                                )}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Description" multiline rows={4} placeholder="Description..."
                                               fullWidth
                                               name={'description'} value={formik.values.description}
                                               onChange={formik.handleChange}
                                               error={formik.touched.description && Boolean(formik.errors.description)}
                                               helperText={formik.touched.description && formik.errors.description}/>
                                </Grid>
                            </Grid>
                        </LocalizationProvider>
                        <Grid item xs={12} textAlign={'right'} mt={2}>
                            <LoadingButton size="small" color="primary" loading={isLoading} loadingPosition="end"
                                           onClick={() => formik.submitForm()} endIcon={<Create/>}
                                           variant="contained">{action}
                            </LoadingButton>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
};

export default Upsert;
