import { Modal } from 'react-bootstrap';
import ValidationErrors from '@/components/ValidationErrors';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { Gender, Role } from '@/utils/enums';
import { str } from '@/utils/helpers';
import { FilePond } from 'react-filepond';
import { LoadingButton } from '@mui/lab';
import { Create } from '@mui/icons-material';
import PropTypes from 'prop-types';

const UserModal = ({ showModal, setShowModal, action, isLoading, formik, errors }) => {
    return (
        <Modal size={'lg'} show={showModal} onHide={() => setShowModal(false)}>
            <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1 translate-y-50">
                <button className="btn-close btn btn-sm btn-circle d-flex" onClick={() => setShowModal(false)}/>
            </div>
            <Modal.Body className={'modal-body'}>
                <div className="pb-3">
                    <h4 className="mb-1">{(action === "store" ? "New" : "Update") + " User"}</h4>
                </div>

                <ValidationErrors errors={errors}/>

                <Grid container spacing={2}>
                    {
                        action === "store" && (
                            <Grid item lg={4}>
                                <Autocomplete name={'role'} freeSolo value={formik.values.role}
                                              options={Object.values(Role).map(r => ({ label: str.headline(r), value: r }))}
                                              onChange={(event, value) => {
                                                  formik.setFieldValue('role', value?.value, true);
                                              }} renderInput={(params) => (
                                    <TextField {...params} label="Role" required placeholder={'Role...'}
                                               error={formik.touched.role && Boolean(formik.errors.role)}
                                               helperText={formik.touched.role && formik.errors.role}/>
                                )}/>
                            </Grid>
                        )
                    }
                    <Grid item lg={action === "store" ? 4 : 6}>
                        <TextField label="First Name" placeholder="First name..." name={'first_name'}
                                   value={formik.values.first_name} fullWidth onChange={formik.handleChange}
                                   error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                   helperText={formik.touched.first_name && formik.errors.first_name}/>
                    </Grid>
                    <Grid item lg={action === "store" ? 4 : 6}>
                        <TextField label="Last Name" placeholder="Last name..." name={'last_name'}
                                   value={formik.values.last_name} fullWidth onChange={formik.handleChange}
                                   error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                   helperText={formik.touched.last_name && formik.errors.last_name}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Email" placeholder="Email..." name={'email'}
                                   value={formik.values.email} fullWidth onChange={formik.handleChange}
                                   error={formik.touched.email && Boolean(formik.errors.email)}
                                   helperText={formik.touched.email && formik.errors.email}/>
                    </Grid>
                    <Grid item md={6}>
                        <TextField label="Phone Number" placeholder="Phone number..." name={'phone'}
                                   value={formik.values.phone} fullWidth onChange={formik.handleChange}
                                   error={formik.touched.phone && Boolean(formik.errors.phone)}
                                   helperText={formik.touched.phone && formik.errors.phone}/>
                    </Grid>
                    <Grid item md={6}>
                        <Autocomplete name={'gender'} freeSolo
                                      options={Object.values(Gender)
                                                     .map(r => ({ label: str.headline(r), value: r }))}
                                      onChange={(event, { value }) => {
                                          formik.setFieldValue('gender', value, true);
                                      }} renderInput={(params) => (
                            <TextField {...params} label="Gender" value={formik.values.gender}
                                       placeholder={'Gender...'}
                                       error={formik.touched.gender && Boolean(formik.errors.gender)}
                                       helperText={formik.touched.gender && formik.errors.gender}/>
                        )}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FilePond maxFiles={3} name="image" maxFileSize={'1MB'} className={'mb-0'}
                                  labelMaxFileSizeExceeded={'Image is too large.'}
                                  labelFileTypeNotAllowed={'Invalid image type. allowed(jpg, png, jpeg)'}
                                  labelIdle='Drag & Drop an image or <span class="filepond--label-action">Browse</span>'
                                  acceptedFileTypes={['image/jpg', 'image/png', 'image/jpeg']} dropOnPage
                                  imageResizeTargetWidth={300} imageResizeTargetHeight={300}
                                  onupdatefiles={image => formik.setFieldValue('image', image[0]?.file, true)}
                                  onremovefile={() => formik.setFieldValue('image', null, true)}/>
                    </Grid>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <Button size={'small'} className={'me-2'} onClick={() => setShowModal(false)}
                        color={'inherit'}>Cancel</Button>
                <LoadingButton size="small" color="primary" loading={isLoading} loadingPosition="end"
                               onClick={() => formik.submitForm()} endIcon={<Create/>} variant="contained">
                    {action === "store" ? "Create" : "Update"}
                </LoadingButton>
            </Modal.Footer>
        </Modal>
    );
};

UserModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errors:PropTypes.object
};

export default UserModal;
