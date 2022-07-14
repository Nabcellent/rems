import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import { Grid, MenuItem, Paper, TextField } from '@mui/material';
import { str } from '@/utils/helpers';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Create } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import ValidationErrors from '@/components/ValidationErrors';
import { Description } from '@/utils/enums';
import ControlledAutoComplete from '@/components/ControlledAutoComplete';
import Pay from '@/components/Pay';

const validationSchema = yup.object().shape({
    unit: yup.object(),
    description: yup.string().required('Payment type is required'),
});

const Upsert = ({ auth, leases, payment, action, rent_arrears }) => {
    console.log(leases, rent_arrears);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
    const [url, setUrl] = useState(route('dashboard.payments.create'));
    const [method, setMethod] = useState(Method.GET);
    const [data, setData] = useState({});
    const [paymentDetails, setPaymentDetails] = useState({
        user: auth.user,
        destinationId: 0,
        description: '',
        amount: 10
    });

    const formik = useFormik({
        initialValues: {
            unit: '',
            description: payment?.description ?? '',
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            const paymentDetails = {
                user: auth.user, description: values.description, amount: [
                    Description.RENT_PAYMENT, Description.RENT_DEPOSIT
                ].includes(values.description) ? rent_arrears : 100
            };

            if (values.description === Description.WALLET_DEPOSIT) {
                setMethod(Method.POST);
                setUrl(route('dashboard.wallet.deposit', auth.user));

                paymentDetails.destinationId = auth.user.id;
            } else if ([Description.RENT_PAYMENT, Description.RENT_DEPOSIT].includes(values.description)) {
                paymentDetails.destinationId = values.unit.user_id;
            }

            setData(values);
            setPaymentDetails(paymentDetails);
            setShowPaymentMethodModal(true);
        }
    });

    return (
        <Dashboard title={str.headline(`${action} Payment`)}>
            <Breadcrumbs title={"Services"} breadcrumbItem={str.ucFirst(action)}/>

            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={12} xl={7}>
                    <Paper component={'form'} onSubmit={formik.handleSubmit} className={'p-3'}>
                        <ValidationErrors errors={errors}/>

                        <Grid container spacing={2}>
                            <Grid item xs={12} lg>
                                <TextField label="Type" placeholder="Payment type..." select required
                                           name={'description'} value={formik.values.description} fullWidth
                                           onChange={formik.handleChange}
                                           error={formik.touched.description && Boolean(formik.errors.description)}
                                           helperText={formik.touched.description && formik.errors.description}>
                                    {Object.values(Description).map((d, i) => (
                                        <MenuItem key={`description-${i}`} value={d}>{str.headline(d)}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} lg>
                                <ControlledAutoComplete name={'unit'} value={formik.values.unit} options={leases}
                                                        disabled={![
                                                            Description.RENT_PAYMENT, Description.RENT_DEPOSIT
                                                        ].includes(formik.values.description)}
                                                        getOptionLabel={o => {
                                                            let label = o?.unit?.estate?.name;
                                                            if (label) label += ': ';
                                                            label += o?.unit?.unitable?.name ?? null;
                                                            label += o?.unit?.house_number;
                                                            if (!label) label = o;

                                                            return label;
                                                        }}
                                                        onChange={(event, value) => {
                                                            console.log(value.unit);
                                                            formik.setFieldValue('unit', value, true);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Unit"
                                                                       required={[
                                                                           Description.RENT_PAYMENT,
                                                                           Description.RENT_DEPOSIT
                                                                       ].includes(formik.values.description)}
                                                                       placeholder={'Unit...'}
                                                                       error={formik.touched.unit && Boolean(formik.errors.unit)}
                                                                       helperText={formik.touched.unit && formik.errors.unit}/>
                                                        )}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} textAlign={'right'} mt={2}>
                            <LoadingButton type={'submit'} size="small" color="primary" loading={isLoading}
                                           loadingPosition="end" endIcon={<Create/>} variant="contained">{action}
                            </LoadingButton>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Pay details={paymentDetails} destinationId={auth.user.id} showModal={showPaymentMethodModal}
                 setShowModal={setShowPaymentMethodModal}
                 onCompleted={({ amount }) => {
                     Sweet.close();
                     Inertia[method](url, method !== Method.GET && { ...data, amount }, {
                         preserveState: false,
                         onBefore: () => setIsLoading(true),
                         onSuccess: () => formik.resetForm(),
                         onError: errors => setErrors(errors),
                         onFinish: () => setIsLoading(false)
                     });
                 }}/>
        </Dashboard>
    );
};

export default Upsert;
