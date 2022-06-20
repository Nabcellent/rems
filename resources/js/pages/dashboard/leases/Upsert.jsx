import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import {
    Autocomplete,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid, MenuItem,
    Paper,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import { Morphable, NoticeType, PropertyType, RentFrequency, Status } from '@/utils/enums';
import { str } from '@/utils/helpers';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import React, { useEffect, useState } from 'react';
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
    rent_frequency: yup.string().oneOf(Object.values(RentFrequency), 'Invalid rent frequency.'),
    expires_at: yup.date('Invalid date.').min(moment().toDate(), 'Must be today or after today.')
                   .max(moment().add('1', 'y').toDate(), 'Must be within the year.')
                   .required('Start date is required.'),
    status: yup.string().oneOf(Object.values(Status), 'Invalid status.'),
});

const Upsert = ({ lease, action, users, estates }) => {
    console.log(lease);
    console.log(estates);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [properties, setProperties] = useState([]);
    const [units, setUnits] = useState([]);

    const formik = useFormik({
        initialValues: {
            estate: lease?.unit?.estate ?? '',
            property: lease?.unit?.unitable_name === Morphable.PROPERTY ? lease?.unit?.unitable : '' ?? '',
            unit: lease?.unit ?? '',
            user: lease?.user_id ? users.find(u => u.id === lease.user_id) : '',
            deposit: lease?.deposit ?? '',
            rent_amount: lease?.rent_amount ?? '',
            rent_frequency: lease?.rent_frequency ?? RentFrequency.MONTHLY,
            expires_at: lease?.expires_at ?? '',
            end_at: lease?.end_at ?? '',
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

            Inertia.post(url, { ...values, unit_id: values.unit.id, user_id: values.user.id }, {
                    onBefore: () => setIsLoading(true),
                    onSuccess: () => formik.resetForm(),
                    onError: errors => setErrors(errors),
                    onFinish: () => setIsLoading(false)
                }
            );
        }
    });

    const serviceCharge = formik.values.estate?.service_charge ?? 0,
        totalRent = formik.values.rent_amount + serviceCharge;

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
                                                  getOptionLabel={o => o.name ?? o}
                                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                                  options={estates.map(e => ({ name: str.headline(e.name), ...e }))}
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
                                                  disabled={!properties.length} getOptionLabel={o => o.name ?? o}
                                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                                  options={properties}
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
                                                  options={units} getOptionLabel={o => o.house_number ?? o}
                                                  onChange={(event, value) => {
                                                      formik.setFieldValue('unit', value, true);
                                                  }} renderInput={(params) => (
                                        <TextField {...params} label="Unit" required placeholder={'Unit...'}
                                                   error={formik.touched.unit && Boolean(formik.errors.unit)}
                                                   helperText={formik.touched.unit && formik.errors.unit}/>
                                    )}/>
                                </Grid>
                                <Grid item lg={12}>
                                    <Autocomplete name={'user'} value={formik.values.user}
                                                  getOptionLabel={o => o.email ?? o} options={users}
                                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                                  onChange={(event, value) => {
                                                      formik.setFieldValue('user', value, true);
                                                  }} renderInput={(params) => (
                                        <TextField {...params} label="Select Tenant" placeholder={'Select user...'}
                                                   error={formik.touched.user && Boolean(formik.errors.user)}
                                                   helperText={formik.touched.user && formik.errors.user}/>
                                    )}/>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField label="Deposit" type={'number'} placeholder="Deposit..." name={'deposit'}
                                               value={formik.values.deposit} fullWidth onChange={formik.handleChange}
                                               error={formik.touched.deposit && Boolean(formik.errors.deposit)}
                                               helperText={formik.touched.deposit && formik.errors.deposit}/>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField label="Amount Ror Rent" type={'number'} placeholder="Amount for rent..."
                                               name={'rent_amount'} value={formik.values.rent_amount} fullWidth
                                               onChange={formik.handleChange}
                                               error={formik.touched.rent_amount && Boolean(formik.errors.rent_amount)}
                                               helperText={formik.errors.rent_amount ?? `+ service charge(${serviceCharge}) = ${totalRent}`}/>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField label="Rent Frequency" placeholder="Rent frequency..." select
                                               name={'rent_frequency'} value={formik.values.rent_frequency} fullWidth
                                               onChange={formik.handleChange}
                                               error={formik.touched.rent_frequency && Boolean(formik.errors.rent_frequency)}
                                               helperText={formik.touched.rent_frequency && formik.errors.rent_frequency}>
                                        {
                                            Object.values(RentFrequency).map((freq, i) => (
                                                <MenuItem key={`type-${i}`} value={freq}>{str.headline(freq)}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <DatePicker label="Expiration Date" value={formik.values.expires_at}
                                                minDate={moment()} maxDate={moment().add(1, 'year')}
                                                onChange={(newValue) => formik.setFieldValue('expires_at', newValue, true)}
                                                renderInput={params => (
                                                    <TextField {...params} fullWidth
                                                               error={formik.touched.expires_at && Boolean(formik.errors.expires_at)}
                                                               helperText={formik.touched.expires_at && formik.errors.expires_at}
                                                               placeholder={'Expiration Date'}/>
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
