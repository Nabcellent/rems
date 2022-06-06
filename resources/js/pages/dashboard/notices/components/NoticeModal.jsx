import { Modal } from 'react-bootstrap';
import ValidationErrors from '@/components/ValidationErrors';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import { Create } from '@mui/icons-material';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import * as yup from 'yup';
import { NoticeType } from '@/utils/enums';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

const NoticeModal = ({ notice, showModal, setShowModal }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: { type: '', description: '', start_at: null, end_at: null, },
        validationSchema: yup.object({
            type: yup.string().oneOf(Object.values(NoticeType), 'Invalid type.').required('Type is required.'),
            description: yup.string(),
            start_at: yup.date().min(Date(), 'Invalid date.'),
            end_at: yup.date().min(Date(), 'Invalid date.')
        }),
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.notices.store`);

            if (notice) {
                url = route(`dashboard.notices.update`, { notice: notice.id });
                values._method = Method.PUT;
            }

            Inertia.post(url, values, {
                    onBefore: () => setIsLoading(true),
                    onSuccess: () => {
                        setShowModal(false);
                        formik.resetForm();
                    },
                    onError: errors => setErrors(errors),
                    onFinish: () => setIsLoading(false)
                }
            );
        }
    });

    useEffect(() => {
        formik.setValues({
            type: notice?.type ?? '',
            description: notice?.description ?? '',
            start_at: notice?.start_at,
            end_at: notice?.end_at
        }, true);
    }, [notice]);

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1 translate-y-50">
                <button className="btn-close btn btn-sm btn-circle d-flex" onClick={() => setShowModal(false)}/>
            </div>
            <Modal.Body className={'modal-body'}>
                <div className="pb-3">
                    <h4 className="mb-1">{(notice ? "Update" : "New") + " Notice"}</h4>
                </div>
                <ValidationErrors errors={errors}/>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                            <DatePicker label="From" value={formik.values.start_at} minDate={moment()}
                                        onChange={(newValue) => formik.setFieldValue('start_at', newValue, true)}
                                        renderInput={params => (
                                            <TextField {...params}
                                                       error={formik.touched.start_at && Boolean(formik.errors.start_at)}
                                                       helperText={formik.touched.start_at && formik.errors.start_at}
                                                       placeholder={'From'}/>
                                        )}/>
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker label="To" value={formik.values.end_at} minDate={moment()}
                                        onChange={(newValue) => formik.setFieldValue('end_at', newValue, true)}
                                        renderInput={params => (
                                            <TextField {...params}
                                                       error={formik.touched.end_at && Boolean(formik.errors.end_at)}
                                                       helperText={formik.touched.end_at && formik.errors.end_at}
                                                       placeholder={'To'}/>
                                        )}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description" multiline rows={4} placeholder="Description..." fullWidth
                                       name={'description'} value={formik.values.description}
                                       onChange={formik.handleChange}
                                       error={formik.touched.description && Boolean(formik.errors.description)}
                                       helperText={formik.touched.description && formik.errors.description}/>
                        </Grid>
                    </Grid>
                </LocalizationProvider>
            </Modal.Body>
            <Modal.Footer>
                <Button size={'small'} className={'me-2'} onClick={() => setShowModal(false)}
                        color={'inherit'}>Cancel</Button>
                <LoadingButton size="small" color="primary" loading={isLoading} loadingPosition="end"
                               onClick={() => formik.submitForm()} endIcon={<Create/>} variant="contained">
                    {notice ? "Update" : "Create"}
                </LoadingButton>
            </Modal.Footer>
        </Modal>
    );
};

NoticeModal.propTypes = {
    notice: PropTypes.object,
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired
};

export default NoticeModal;
