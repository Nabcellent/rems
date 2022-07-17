import { Alert, Button, Grid, TextField } from '@mui/material';
import { Create, DeleteSweep, Edit, HomeRepairService } from '@mui/icons-material';
import { Card, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ValidationErrors from '@/components/ValidationErrors';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleDelete } from '@/utils/helpers';
import map from 'lodash/map';
import { Link } from '@inertiajs/inertia-react';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import ControlledAutoComplete from '@/components/ControlledAutoComplete';

const Services = ({ estateServices, allServices, estateId }) => {
    const [service, setService] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        formik.setValues({
            estate_id: estateId,
            service: service ?? '',
            service_id: service?.id ?? '',
            description: service?.pivot.description ?? '',
        }, true);
    }, [service]);

    const formik = useFormik({
        initialValues: { estate_id: estateId, service_id: '', service: '', description: '', },
        validationSchema: yup.object({
            description: yup.string(),
            estate_id: yup.number().required(),
            service_id: yup.number().oneOf(map(allServices, 'id'), 'Invalid service.').required('Service is required!'),
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

    const handleCreate = () => {
        setService(undefined);
        setShowModal(true);
    };

    const handleUpdate = service => {
        setService(service);
        setShowModal(true);
    };

    useEffect(() => {
        formik.setValues({
            estate_id: estateId,
            service: service ?? '',
            service_id: service?.id ?? '',
            description: service?.pivot.description ?? '',
        }, true);
    }, [service]);

    return (
        <>
            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                <h5 className={'m-0'}>Services</h5>
                <Button startIcon={<HomeRepairService/>} onClick={() => handleCreate()}>Add</Button>
            </Card.Header>
            <Card.Body>
                {
                    !estateServices.length
                        ? <Alert severity="info">This Estate Hasn't any service(s) yet.</Alert>
                        : estateServices.map(service => (
                            <div key={`service-${service.id}`}
                                 className="border border-1 rounded-2 px-3 py-2 ask-analytics-item position-relative mb-3 hover-actions-trigger">
                                <div className="d-flex align-items-center mb-1">
                                    {service.icon ??
                                        <FontAwesomeIcon icon={faScrewdriverWrench}
                                                         className={'text-primary'}
                                                         role={'img'}/>}
                                    <Link className="stretched-link text-decoration-none" href="#">
                                        <h5 className="fs--1 text-600 mb-0 ps-3">{service.name}</h5>
                                    </Link>
                                </div>
                                <h6 className="fs--1 text-800">
                                    {service.pivot.description ?? service.description}
                                </h6>
                                <div className="hover-actions end-0 top-50 translate-middle-y me-2">
                                    <button onClick={() => handleUpdate(service)}
                                            className="border-300 me-1 text-600 btn btn-light btn-sm">
                                        <Edit/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(route('dashboard.estate-services.destroy', { estate_service: service.pivot.id }), 'Service')}
                                        className="border-300 text-600 btn btn-danger btn-sm">
                                        <DeleteSweep/>
                                    </button>
                                </div>
                            </div>
                        ))
                }
            </Card.Body>

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
                            <ControlledAutoComplete name={'service_id'} getOptionLabel={opt => opt?.name ?? ''}
                                          options={allServices} value={formik.values.service}
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
                        {service ? "Update" : "Add"}
                    </LoadingButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

Services.propTypes = {
    estateServices: PropTypes.array.isRequired,
    allServices: PropTypes.array.isRequired,
    estateId: PropTypes.number.isRequired
};

export default Services;
