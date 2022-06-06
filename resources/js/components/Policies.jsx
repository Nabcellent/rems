import { Alert, Button, Grid, TextField } from '@mui/material';
import { AddBusiness, Create, DeleteSweep, Edit } from '@mui/icons-material';
import { Card, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ValidationErrors from '@/components/ValidationErrors';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingShield } from '@fortawesome/free-solid-svg-icons';
import { handleDelete } from '@/utils/helpers';

const Policies = ({ policies, policeable, policeableId }) => {
    const [policy, setPolicy] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: { description: '', policeable_id: policeableId, policeable: policeable, },
        validationSchema: yup.object({ description: yup.string().required(), }),
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.policies.store`);

            if (policy) {
                url = route(`dashboard.policies.update`, { policy: policy.id });
                values._method = Method.PUT;
            }

            Inertia.post(url, values, {
                    forceFormData: true,
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
        setPolicy(undefined);
        setShowModal(true);
    };

    const handleUpdate = policy => {
        setPolicy(policy);
        formik.setValues(policy, true);
        setShowModal(true);
    };

    return (
        <>
            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                <h5 className={'mb-0'}>Policies</h5>
                <Button startIcon={<AddBusiness/>} onClick={() => handleCreate()}>Add</Button>
            </Card.Header>
            <Card.Body>
                {
                    !policies.length
                        ? <Alert severity="info">This {policeable} hasn't any policy yet.</Alert>
                        : policies.map(policy => (
                            <div key={`policy-${policy.id}`}
                                 className="border border-1 rounded-2 px-3 py-2 ask-analytics-item position-relative mb-3 hover-actions-trigger">
                                <div className="d-flex align-items-center mb-1">
                                    <FontAwesomeIcon icon={faBuildingShield} className={'text-primary'} role={'img'}/>
                                    <a className="stretched-link text-decoration-none">
                                        <h6 className="fs--1 text-600 mb-0 ps-3">{policy.description}</h6>
                                    </a>
                                </div>
                                <div className="hover-actions end-0 top-50 translate-middle-y me-2">
                                    <button onClick={() => handleUpdate(policy)}
                                            className="border-300 me-1 text-600 btn btn-light btn-sm">
                                        <Edit fontSize={'small'}/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(route('dashboard.policies.destroy', { policy: policy.id }), 'Policy')}
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
                        <h4 className="mb-1">{(policy ? "Update" : "New") + " Policy"}</h4>
                    </div>
                    <ValidationErrors errors={errors}/>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Description" multiline rows={2}
                                       placeholder="Start describing your brief policy..." name={'description'}
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
                        {policy ? "Update" : "Create"}
                    </LoadingButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

Policies.propTypes = {
    policies: PropTypes.array.isRequired,
    policeable: PropTypes.string.isRequired,
    policeableId: PropTypes.number.isRequired
};

export default Policies;
