import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import {
    Autocomplete,
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
import { NoticeType, Status } from '@/utils/enums';
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
    estate: yup.object().required('Estate is required.'),
    property: yup.object().required('Property is required.'),
    unit: yup.object().required('Unit is required.'),
    user: yup.object().required('User is required.'),
    deposit: yup.number(),
    rent_amount: yup.number().required('Amount for rent is required.'),
    start_at: yup.date('Invalid date.').min(moment().toDate(), 'Must be today or after today.')
                 .max(moment().add('1', 'y').toDate(), 'Must be within the year.').required('Start date is required.'),
    end_at: yup.date('Invalid date.').min(yup.ref('start_at') ?? moment(), 'Must be after start date.')
               .required('End date is required.').max(moment().add('1', 'y').toDate(), 'Must be within the year.'),
    status: yup.string().oneOf(Object.values(Status), 'Invalid status.'),
});

const Upsert = ({ lease, action, users, estates }) => {
    console.log(estates);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [properties, setProperties] = useState([]);
    const [units, setUnits] = useState([]);

    const formik = useFormik({
        initialValues: {
            estate: '',
            property: '',
            unit: '',
            user: lease?.user ?? [],
            deposit: lease?.deposit ?? '',
            rent_amount: lease?.rent_amount ?? '',
            start_at: lease?.start_at,
            end_at: lease?.end_at,
            status: lease?.status ?? Status.ACTIVE,
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.leases.store`);

            if (lease) {
                url = route(`dashboard.leases.update`, { lease: lease.id });
                values._method = Method.PUT;
            }

            Inertia.post(url, values, {
                    onBefore: () => setIsLoading(true),
                    onSuccess: () => formik.resetForm(),
                    onError: errors => setErrors(errors),
                    onFinish: () => setIsLoading(false)
                }
            );
        }
    });

    return (
        <Dashboard title={str.headline(`${action} Lease`)}>
            <Breadcrumbs title={"Leases"} breadcrumbItem={str.ucFirst(action)}/>

            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={12} xl={7}>
                    <Paper component={'form'} onSubmit={formik.handleSubmit} className={'p-3'}>
                        <ValidationErrors errors={errors}/>

                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <Grid container spacing={2}>
                                <Grid item lg={4}>
                                    <Autocomplete name={'estate'} value={formik.values.estate}
                                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                                  options={estates.map(e => ({ label: str.headline(e.name), ...e }))}
                                                  onChange={(event, value) => {
                                                      formik.setFieldValue('estate', value, true);
                                                      setProperties(value.properties);
                                                  }} renderInput={(params) => (
                                        <TextField {...params} label="Estate" required placeholder={'Estate...'}
                                                   error={formik.touched.estate && Boolean(formik.errors.estate)}
                                                   helperText={formik.touched.estate && formik.errors.estate}/>
                                    )}/>
                                </Grid>
                                <Grid item lg={4}>
                                    <Autocomplete name={'property'} value={formik.values.property}
                                                  disabled={!properties.length}
                                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                                  options={properties.map(e => ({ label: e.name, ...e }))}
                                                  onChange={(event, value) => {
                                                      formik.setFieldValue('property', value, true);
                                                      setUnits(value.units);
                                                  }} renderInput={(params) => (
                                        <TextField {...params} label="Property" required placeholder={'Property...'}
                                                   error={formik.touched.property && Boolean(formik.errors.property)}
                                                   helperText={formik.touched.property && formik.errors.property}/>
                                    )}/>
                                </Grid>
                                <Grid item lg={4}>
                                    <Autocomplete name={'unit'} value={formik.values.unit} disabled={!units.length}
                                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                                  options={units.map(e => ({ label: str.headline(e.house_number), ...e }))}
                                                  onChange={(event, value) => {
                                                      formik.setFieldValue('unit', value, true);
                                                  }} renderInput={(params) => (
                                        <TextField {...params} label="Unit" required placeholder={'Unit...'}
                                                   error={formik.touched.unit && Boolean(formik.errors.unit)}
                                                   helperText={formik.touched.unit && formik.errors.unit}/>
                                    )}/>
                                </Grid>
                                <Grid item lg={6}>
                                    <Autocomplete name={'tenant'} value={formik.values.tenant}
                                                  getOptionLabel={option => option.email}
                                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                                  options={users.map(e => ({ email: e.email.toLowerCase(), id: e.id }))}
                                                  onChange={(event, value) => {
                                                      formik.setFieldValue('tenant', value, true);
                                                  }} renderInput={(params) => (
                                        <TextField {...params} label="Select Recipients" required
                                                   placeholder={'Select tenant...'}
                                                   error={formik.touched.tenant && Boolean(formik.errors.tenant)}
                                                   helperText={formik.touched.tenant && formik.errors.tenant}/>
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
                                <Grid item xs={6}>
                                    <DatePicker label={'End date'}
                                                value={formik.values.end_at}
                                                minDate={formik.values.start_at ?? moment()}
                                                maxDate={moment().add(1, 'year')}
                                                onChange={(newValue) => formik.setFieldValue('end_at', newValue, true)}
                                                renderInput={params => (
                                                    <TextField {...params} fullWidth
                                                               error={formik.touched.end_at && Boolean(formik.errors.end_at)}
                                                               helperText={formik.touched.end_at && formik.errors.end_at}
                                                               placeholder={'End date'}/>
                                                )}/>
                                </Grid>
                                <Grid item md={6}>
                                    <FormControl error={formik.touched.status && Boolean(formik.errors.status)}>
                                        <FormLabel className={'m-0'} id="status">Status</FormLabel>
                                        <RadioGroup row aria-labelledby="status" name="status"
                                                    value={formik.values.status}
                                                    onChange={formik.handleChange}>
                                            <FormControlLabel className={'mb-0'} value={Status.ACTIVE}
                                                              control={<Radio/>}
                                                              label="Active"/>
                                            <FormControlLabel className={'mb-0'} value={Status.INACTIVE}
                                                              control={<Radio/>}
                                                              label="Inactive"/>
                                        </RadioGroup>
                                        <FormHelperText className={'mt-0'}>
                                            {formik.touched.status && formik.errors.status}
                                        </FormHelperText>
                                    </FormControl>
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
