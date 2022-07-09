import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import {
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import { Morphable, RentFrequency, Status } from '@/utils/enums';
import { str } from '@/utils/helpers';
import { FieldArray, Formik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Add, Create, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import ValidationErrors from '@/components/ValidationErrors';
import moment from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ControlledAutoComplete from '@/components/ControlledAutoComplete';

const validationSchema = yup.object().shape({
    estate: yup.object().required('Estate is required.'),
    property: yup.object(),
    unit: yup.object(),
    user: yup.object().required('Tenant is required.'),
    expires_at: yup.date('Invalid date.').min(moment().add(1, 'd').toDate(), 'Must be after today.')
                   .max(moment().add(5, 'y').toDate(), 'Must be within the year.')
                   .required('Start date is required.'),
    status: yup.string().oneOf(Object.values(Status), 'Invalid status.'),
    plans: yup.array().of(yup.object().shape({
        deposit: yup.number(),
        rent_amount: yup.number().min(1).required('Amount for rent is required.'),
        due_day: yup.number().min(1).max(31).required('Due date is required.'),
        frequency: yup.string().oneOf(Object.values(RentFrequency), 'Invalid rent frequency.'),
    })).min(1, 'Minimum of 1 payment plan').required("Must have a plan.")
});

const Upsert = ({ lease, action, users, estates }) => {
    console.log(lease);
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState({});
    const [properties, setProperties] = useState([]);
    const [units, setUnits] = useState([]);

    const serviceCharge = lease?.unit?.estate?.service_charge ?? 0;

    const isError = (errors, touched, index, field) => {
        return errors && errors.plans && errors.plans.length > 0 && errors.plans[index] && errors.plans[index][field] &&
            touched && touched.plans && touched.plans.length > 0 && touched.plans[index] && touched.plans[index][field];
    };

    const errorMessage = (errors, index, field) => {
        return errors && errors.plans && errors.plans.length > 0 && errors.plans[index] && errors.plans[index][field];
    };

    return (
        <Dashboard title={str.headline(`${action} Lease`)}>
            <Breadcrumbs title={"Leases"} breadcrumbItem={str.ucFirst(action)}/>

            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={12} xl={7}>
                    <Formik
                        initialValues={{
                            estate: lease?.unit?.estate ?? '',
                            property: lease?.unit?.unitable_name === Morphable.PROPERTY ? lease?.unit?.unitable : '' ?? '',
                            unit: lease?.unit ?? '',
                            user: lease?.user_id ? users.find(u => u.id === lease.user_id) : '',
                            expires_at: lease?.expires_at ?? '',
                            status: lease?.status ?? Status.ACTIVE,
                            plans: lease?.payment_plans ? lease?.payment_plans : [
                                {
                                    deposit: lease?.deposit ?? 0,
                                    rent_amount: lease?.rent_amount ?? '',
                                    frequency: lease?.frequency ?? RentFrequency.MONTHLY,
                                    due_day: lease?.due_day ?? '',
                                }
                            ],
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            console.log(values);

                            let url = route(`dashboard.leases.store`),
                                data = {
                                    unit_id: values.unit.id,
                                    user_id: values.user.id,
                                    plans: values.plans,
                                    status: values.status,
                                    expires_at: values.expires_at,
                                };

                            if (lease) {
                                url = route(`dashboard.leases.update`, { lease: lease.id });
                                data._method = Method.PUT;
                            }

                            Inertia.post(url, data, {
                                    preserveState: false,
                                    onBefore: () => setIsLoading(true),
                                    onSuccess: () => resetForm(),
                                    onError: errors => console.log(errors),
                                    onFinish: () => setIsLoading(false)
                                }
                            );
                        }}>
                        {({ values, handleChange, errors, touched, handleSubmit, setFieldValue }) => (
                            <Paper component={'form'} onSubmit={handleSubmit} className={'p-3'}>
                                <ValidationErrors errors={serverErrors}/>

                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} lg={4}>
                                            <ControlledAutoComplete
                                                name={'estate'}
                                                value={values.estate}
                                                getOptionLabel={o => o.name ?? o}
                                                options={estates.map(e => ({ name: str.headline(e.name), ...e }))}
                                                onChange={(event, value) => {
                                                    setFieldValue('estate', value, true);
                                                    setProperties(value.properties);
                                                    setUnits(value.units);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Estate" required
                                                               placeholder={'Estate...'}
                                                               error={touched.estate && Boolean(errors.estate)}
                                                               helperText={touched.estate && errors.estate}/>
                                                )}/>
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <ControlledAutoComplete name={'property'}
                                                                    value={values.property}
                                                                    disabled={!properties.length}
                                                                    getOptionLabel={o => o.name ?? o}
                                                                    options={properties}
                                                                    onChange={(event, value) => {
                                                                        setFieldValue('property', value, true);
                                                                        setUnits(value.units);
                                                                    }} renderInput={(params) => (
                                                <TextField {...params} label="Property" required
                                                           placeholder={'Property...'}
                                                           error={touched.property && Boolean(errors.property)}
                                                           helperText={touched.property && errors.property}/>
                                            )}/>
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <ControlledAutoComplete name={'unit'} value={values.unit} options={units}
                                                                    disabled={!units.length}
                                                                    getOptionLabel={o => o.house_number ?? o}
                                                                    onChange={(event, value) => {
                                                                        setFieldValue('unit', value, true);
                                                                    }} renderInput={(params) => (
                                                <TextField {...params} label="Unit" required
                                                           placeholder={'Unit...'}
                                                           error={touched.unit && Boolean(errors.unit)}
                                                           helperText={touched.unit && errors.unit}/>
                                            )}/>
                                        </Grid>
                                        <Grid item xs={12} lg={12}>
                                            <ControlledAutoComplete name={'user'} value={values.user} options={users}
                                                                    getOptionLabel={o => {
                                                                        let label = o.email;
                                                                        if (label) label += ': ';
                                                                        label += o.full_name;
                                                                        if(!label) label = o

                                                                        return label;
                                                                    }}
                                                                    isOptionEqualToValue={(option, value) => value === undefined || value === "" || option.id === value.id}
                                                                    onChange={(event, value) => {
                                                                        setFieldValue('user', value, true);
                                                                    }} renderInput={(params) => (
                                                <TextField {...params} label="Select Tenant"
                                                           placeholder={'Select user...'}
                                                           error={touched.user && Boolean(errors.user)}
                                                           helperText={touched.user && errors.user}/>
                                            )}/>
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <DatePicker label="Expiration Date"
                                                        value={values.expires_at}
                                                        minDate={moment().add(1, 'd')}
                                                        maxDate={moment().add(5, 'y')}
                                                        onChange={(newValue) => setFieldValue('expires_at', newValue, true)}
                                                        renderInput={params => (
                                                            <TextField {...params} fullWidth
                                                                       error={touched.expires_at && Boolean(errors.expires_at)}
                                                                       helperText={touched.expires_at && errors.expires_at}
                                                                       placeholder={'Expiration Date'}/>
                                                        )}/>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <FormControl
                                                error={touched.status && Boolean(errors.status)}>
                                                <FormLabel className={'m-0'}
                                                           id="status">Status</FormLabel>
                                                <RadioGroup row aria-labelledby="status" name="status"
                                                            value={values.status}
                                                            onChange={handleChange}>
                                                    <FormControlLabel className={'mb-0'}
                                                                      value={Status.ACTIVE}
                                                                      control={<Radio/>}
                                                                      label="Active"/>
                                                    <FormControlLabel className={'mb-0'}
                                                                      value={Status.INACTIVE}
                                                                      control={<Radio/>}
                                                                      label="Inactive"/>
                                                </RadioGroup>
                                                <FormHelperText className={'mt-0'}>
                                                    {touched.status && errors.status}
                                                </FormHelperText>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} textAlign={'center'} mt={5}>
                                            <Divider variant={'middle'}/>
                                            <h5 className={'mt-2'}>Payment Plan(s)</h5>
                                        </Grid>

                                        <FieldArray name={'plans'}>
                                            {({ insert, remove, push }) => (
                                                <>
                                                    {
                                                        values.plans.length &&
                                                        values.plans.map((plan, i) => (
                                                            <React.Fragment key={`plan-${i}`}>
                                                                <Grid item xs={12} lg={3}>
                                                                    <TextField label="Deposit" type={'number'}
                                                                               placeholder="Deposit..."
                                                                               name={`plans.${i}.deposit`}
                                                                               value={plan.deposit} fullWidth
                                                                               onChange={handleChange}
                                                                               error={isError(errors, touched, i, 'deposit')}
                                                                               helperText={errorMessage(errors, i, 'deposit')}/>
                                                                </Grid>
                                                                <Grid item xs={12} lg={3}>
                                                                    <TextField label="Amount Ror Rent"
                                                                               type={'number'}
                                                                               placeholder="Amount for rent..."
                                                                               name={`plans.${i}.rent_amount`}
                                                                               value={plan.rent_amount} fullWidth
                                                                               onChange={handleChange}
                                                                               error={isError(errors, touched, i, 'rent_amount')}
                                                                               helperText={isError(errors, touched, i, 'rent_amount') ? errorMessage(errors, i, 'rent_amount') : `+ service charge(${serviceCharge}) = ${plan.rent_amount + serviceCharge}`}/>
                                                                </Grid>
                                                                <Grid item xs={12} lg={3}>
                                                                    <TextField label="Rent Frequency"
                                                                               placeholder="Rent frequency..."
                                                                               select name={`plans.${i}.frequency`}
                                                                               value={plan.frequency} fullWidth
                                                                               onChange={handleChange}
                                                                               error={isError(errors, touched, i, 'frequency')}
                                                                               helperText={errorMessage(errors, i, 'frequency')}>
                                                                        {
                                                                            Object.values(RentFrequency)
                                                                                  .map((freq, i) => (
                                                                                      <MenuItem
                                                                                          key={`type-${i}`}
                                                                                          value={freq}>{str.headline(freq)}</MenuItem>
                                                                                  ))
                                                                        }
                                                                    </TextField>
                                                                </Grid>
                                                                <Grid item xs={12} lg={2}>
                                                                    <TextField label="Due Date"
                                                                               placeholder="Due date..."
                                                                               select name={`plans.${i}.due_day`}
                                                                               value={plan.due_day} fullWidth
                                                                               onChange={handleChange}
                                                                               error={isError(errors, touched, i, 'due_day')}
                                                                               helperText={errorMessage(errors, i, 'due_day')}>
                                                                        {
                                                                            Array(31).fill(0)
                                                                                     .map((d, i) => (
                                                                                         <MenuItem key={`day-${i}`}
                                                                                                   value={i + 1}>{i + 1}</MenuItem>
                                                                                     ))
                                                                        }
                                                                    </TextField>
                                                                </Grid>
                                                                <Grid item lg={1} textAlign={'center'}>
                                                                    <IconButton color={'primary'} size={'large'}
                                                                                disabled={values.plans.length < 2}
                                                                                onClick={() => remove(i)}>
                                                                        <Remove/>
                                                                    </IconButton>
                                                                </Grid>
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                    <Grid item xs={12} textAlign={'end'}>
                                                        <IconButton color={'primary'} size={'large'}
                                                                    onClick={() => push({
                                                                        id: null,
                                                                        lease_id: lease?.payment_plans[0]?.lease_id,
                                                                        deposit: 0,
                                                                        rent_amount: '',
                                                                        frequency: RentFrequency.MONTHLY,
                                                                        due_day: '',
                                                                    })}>
                                                            <Add/>
                                                        </IconButton>
                                                    </Grid>
                                                </>
                                            )}
                                        </FieldArray>
                                        <Grid item xs={12} textAlign={'right'} mt={2}>
                                            <LoadingButton type={'submit'} size="small" color="primary"
                                                           loading={isLoading}
                                                           loadingPosition="end" endIcon={<Create/>}
                                                           variant="contained">{action}
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </LocalizationProvider>
                            </Paper>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </Dashboard>
    );
};

export default Upsert;
