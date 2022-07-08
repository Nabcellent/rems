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
import { Description, NoticeType } from '@/utils/enums';
import ControlledAutoComplete from '@/components/ControlledAutoComplete';
import Pay from '@/components/Pay';

const validationSchema = yup.object().shape({
    unit: yup.object(),
    amount: yup.number().integer().required('Amount is required.'),
    description: yup.string().required('Payment type is required'),
});

const Upsert = ({ leases, payment, action, auth }) => {
    console.log(leases);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({ user: auth.user, destinationId: 0, description: '' });
    const [onCompleted, setOnCompleted] = useState(() => {
    });

    const formik = useFormik({
        initialValues: {
            unit: '',
            amount: '',
            description: payment?.description ?? '',
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url, data;

            if (values.description === Description.WALLET_DEPOSIT) {
                url = route('dashboard.wallet.deposit', auth.user);
                data = values;

                setPaymentDetails({
                    user: auth.user,
                    destinationId: auth.user.id,
                    description: Description.WALLET_DEPOSIT
                });
            }

            // return console.log(data, paymentDetails);

            setOnCompleted(function () {
                Inertia.post(url, data, {
                    preserveState: false,
                    onBefore: () => setIsLoading(true),
                    onSuccess: () => formik.resetForm(),
                    onError: errors => setErrors(errors),
                    onFinish: () => setIsLoading(false)
                });
            });

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
                                    {
                                        Object.values(Description).map((d, i) => (
                                            <MenuItem key={`description-${i}`} value={d}>{str.headline(d)}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Grid>
                            {
                                formik.values.description === Description.RENT_PAYMENT && (
                                    <Grid item xs={12} lg>
                                        <ControlledAutoComplete name={'unit'} value={formik.values.unit} options={leases}
                                                                getOptionLabel={o => `${o?.unit?.estate?.name ?? o} - ${o?.unit?.house_number ?? o}` ?? o}
                                                                onChange={(event, value) => {
                                                                    console.log(value.unit);
                                                                    formik.setFieldValue('unit', value, true);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} label="Unit" required
                                                                               placeholder={'Unit...'}
                                                                               error={formik.touched.unit && Boolean(errors.unit)}
                                                                               helperText={formik.touched.unit && errors.unit}/>
                                                                )}/>
                                    </Grid>
                                )
                            }
                            <Grid item xs={12} lg>
                                <TextField label="Amount" type={'number'}
                                           placeholder={`Amount for ${formik.values.description}...`}
                                           name={`amount`} value={formik.values.amount} fullWidth
                                           onChange={formik.handleChange}
                                           error={formik.touched.amount && formik.errors.amount}
                                           helperText={formik.touched.amount && formik.errors.amount}/>
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

            <Pay details={paymentDetails} destinationId={auth.user.id} showModal={showPaymentMethodModal}
                 setShowModal={setShowPaymentMethodModal} onCompleted={() => onCompleted()}/>
        </Dashboard>
    );
};

export default Upsert;
