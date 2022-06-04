import { Modal } from 'react-bootstrap';
import ValidationErrors from '@/components/ValidationErrors';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Create } from '@mui/icons-material';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import * as yup from 'yup';
import map from 'lodash/map';

const ServiceModal = ({ estateId, service, services, showModal, setShowModal }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: { estate_id: estateId, service_id: '', service: '', description: '', },
        validationSchema: yup.object({
            description: yup.string(),
            estate_id: yup.number().required(),
            service_id: yup.number().oneOf(map(services, 'id'), 'Invalid service.').required('Service is required!'),
        }),
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.estate-services.store`);

            if (service) {
                url = route(`dashboard.estate-services.update`, { estate_service: service.pivot.id });
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
            estate_id: estateId,
            service: service ?? '',
            service_id: service?.id ?? '',
            description: service?.pivot.description ?? '',
        }, true);
    }, [service]);

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1 translate-y-50">
                <button className="btn-close btn btn-sm btn-circle d-flex" onClick={() => setShowModal(false)}/>
            </div>
            <Modal.Body className={'modal-body'}>
                <div className="pb-3">
                    <h4 className="mb-1">{(service ? "Update" : "Add") + " Service"}</h4>
                </div>
                <ValidationErrors errors={errors}/>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Autocomplete name={'service_id'} freeSolo getOptionLabel={opt => opt?.name ?? ''}
                                      options={services} value={formik.values.service}
                                      onChange={(event, value) => {
                                          formik.setFieldValue('service_id', value?.id, true);
                                      }} renderInput={(params) => (
                            <TextField {...params} label="Service" required placeholder={'Service...'}
                                       error={formik.touched.service_id && Boolean(formik.errors.service_id)}
                                       helperText={formik.touched.service_id && formik.errors.service_id}/>
                        )}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Description" multiline rows={3} placeholder="Description..."
                                   name={'description'}
                                   value={formik.values.description} fullWidth onChange={formik.handleChange}
                                   error={formik.touched.description && Boolean(formik.errors.description)}
                                   helperText={formik.touched.description && formik.errors.description}/>
                    </Grid>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <Button size={'small'} className={'me-2'} onClick={() => setShowModal(false)}
                        color={'inherit'}>Cancel</Button>
                <LoadingButton size="small" color="primary" loading={isLoading} loadingPosition="end"
                               onClick={() => formik.submitForm()} endIcon={<Create/>} variant="contained">
                    {service ? "Update" : "Create"}
                </LoadingButton>
            </Modal.Footer>
        </Modal>
    );
};

ServiceModal.propTypes = {
    estateId: PropTypes.number.isRequired,
    services: PropTypes.array.isRequired,
    service: PropTypes.object,
    showModal: PropTypes.bool
};

export default ServiceModal;
