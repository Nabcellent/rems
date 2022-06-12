import { Create, ManageAccounts } from '@mui/icons-material';
import { Alert, Autocomplete, Button, CircularProgress, Divider, Grid, TextField } from '@mui/material';
import { Modal } from 'react-bootstrap';
import ValidationErrors from '@/components/ValidationErrors';
import { LoadingButton } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import { str } from '@/utils/helpers';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Inertia } from '@inertiajs/inertia';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/inertia-react';

const ChangeOwner = ({ entity, entityId }) => {
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState(undefined);

    const formik = useFormik({
        initialValues: { entity, entity_id: entityId, user: '', },
        validationSchema: yup.object({ description: yup.string().required(), }),
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.policies.store`);

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
        axios.get(route("dashboard.users.owners", { entity })).then(({ data }) => {
            setUsers(data.users);
        }).catch(err => console.log(err));
    }, []);

    return (
        <>
            <Button variant={'outlined'} onClick={() => setShowModal(true)} startIcon={<ManageAccounts/>}
                    className="px-3 ms-2 btn btn-falcon-default btn-sm">
                Change Owner
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1 translate-y-50">
                    <button className="btn-close btn btn-sm btn-circle d-flex" onClick={() => setShowModal(false)}/>
                </div>
                <Modal.Body className={'modal-body'}>
                    <div className="pb-3"><h4 className="mb-1">New Owner</h4></div>
                    <ValidationErrors errors={errors}/>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {
                                users
                                    ? users.length ? (
                                        <Autocomplete name={'user'} freeSolo value={formik.values.estate}
                                                      getOptionLabel={o => o.email ?? o}
                                                      options={users.map(e => ({
                                                          email: str.headline(e.email),
                                                          id: e.id
                                                      }))}
                                                      onChange={(event, value) => {
                                                          formik.setFieldValue('user', value, true);
                                                      }} renderInput={(params) => (
                                            <TextField {...params} label="Select New Owner" required
                                                       placeholder={'Select new owner...'}
                                                       error={formik.touched.user && Boolean(formik.errors.user)}
                                                       helperText={formik.touched.user && formik.errors.user}/>
                                        )}/>
                                    ) : <Alert severity="info">No existing users.</Alert>
                                    : <CircularProgress/>
                            }
                        </Grid>
                        <Grid item xs={12} textAlign={'center'}>
                            <Divider className={'mb-3'}/>
                            <Button component={Link} href={route("dashboard.users.create", { entity, entityId })}>
                                Create New Owner
                            </Button>
                        </Grid>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button size={'small'} className={'me-2'} onClick={() => setShowModal(false)}
                            color={'inherit'}>Cancel</Button>
                    {
                        users?.length
                            ? (
                                <LoadingButton size="small" color="primary" loading={isLoading} loadingPosition="end"
                                               onClick={() => formik.submitForm()} endIcon={<Create/>} variant="contained">
                                    Change
                                </LoadingButton>
                            ) : ''
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
};

ChangeOwner.propTypes = {
    entity: PropTypes.string.isRequired
};

export default ChangeOwner;
