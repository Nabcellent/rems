import { Alert, Autocomplete, Button, Grid, TextField } from '@mui/material';
import { Create, DeleteSweep, Edit, FitnessCenter, LocalPoliceTwoTone } from '@mui/icons-material';
import { Card, Modal } from 'react-bootstrap';
import { useState } from 'react';
import ValidationErrors from '@/components/ValidationErrors';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingShield } from '@fortawesome/free-solid-svg-icons';
import { handleDelete } from '@/utils/helpers';
import map from 'lodash/map';

const Amenities = ({ amenities, allAmenities, amenitiable, amenitiableId }) => {
    const [amenity, setAmenity] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: { amenity: '', amenity_id: '', description: '', amenitiable_id: amenitiableId, amenitiable, },
        validationSchema: yup.object({
            amenitiable: yup.string().required(),
            amenitiable_id: yup.number().required(),
            amenity_id: yup.number().oneOf(map(allAmenities, 'id'), 'Invalid amenity.')
                           .required('Amenity is required!'),
            description: yup.string()
        }),
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.amenitiable.store`);

            if (amenity) {
                url = route(`dashboard.amenitiable.update`, { amenity: amenity.id });
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
        setAmenity(undefined);
        setShowModal(true);
    };

    const handleUpdate = amenity => {
        setAmenity(amenity);
        formik.setFieldValue('amenity', amenity ?? '', true);
        formik.setFieldValue('description', amenity.description ?? '', true);
        setShowModal(true);
    };

    return (
        <>
            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                <h5 className={'mb-0'}>Amenities</h5>
                <Button startIcon={<FitnessCenter/>} onClick={() => handleCreate()}>Add</Button>
            </Card.Header>
            <Card.Body>
                {
                    !amenities.length
                        ? <Alert severity="info">This {amenitiable} hasn't any amenity yet.</Alert>
                        : amenities.map(amenity => (
                            <div key={`amenity-${amenity.id}`}
                                 className="border border-1 rounded-2 px-3 py-2 ask-analytics-item position-relative mb-3 hover-actions-trigger">
                                <div className="d-flex align-items-center mb-1">
                                    <FontAwesomeIcon icon={faBuildingShield} className={'text-primary'} role={'img'}/>
                                    <a className="stretched-link text-decoration-none">
                                        <h6 className="fs--1 text-600 mb-0 ps-3">{amenity.title}</h6>
                                    </a>
                                </div>
                                <div className="hover-actions end-0 top-50 translate-middle-y me-2">
                                    <button onClick={() => handleUpdate(amenity)}
                                            className="border-300 me-1 text-600 btn btn-light btn-sm">
                                        <Edit fontSize={'small'}/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(route('dashboard.amenities.destroy', { amenity: amenity.id }), 'Amenity')}
                                        className="border-300 text-600 btn btn-danger btn-sm">
                                        <DeleteSweep fontSize={'small'}/>
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
                        <h4 className="mb-1">{(amenity ? 'Update' : 'New') + ' Amenity'}</h4>
                    </div>
                    <ValidationErrors errors={errors}/>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete name={'amenity_id'} getOptionLabel={opt => opt?.title ?? ''}
                                          options={allAmenities} value={formik.values.amenity}
                                          onChange={(event, value) => {
                                              formik.setFieldValue('amenity_id', value?.id, true);
                                          }} renderInput={(params) => (
                                <TextField {...params} label="Amenity" required placeholder={'Amenity...'}
                                           error={formik.touched.amenity_id && Boolean(formik.errors.amenity_id)}
                                           helperText={formik.touched.amenity_id && formik.errors.amenity_id}/>
                            )}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description" multiline rows={2}
                                       placeholder="Start describing your brief amenity..." name={'description'}
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
                        {amenity ? "Update" : "Create"}
                    </LoadingButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

Amenities.propTypes = {
    amenities: PropTypes.array.isRequired,
    allAmenities: PropTypes.array.isRequired,
    amenitiable: PropTypes.string.isRequired,
    amenitiableId: PropTypes.number.isRequired
};

export default Amenities;
