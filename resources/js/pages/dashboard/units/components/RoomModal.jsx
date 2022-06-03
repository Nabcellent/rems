import { Modal } from 'react-bootstrap';
import ValidationErrors from '@/components/ValidationErrors';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Create } from '@mui/icons-material';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import * as yup from 'yup';

// Import React FilePond with plugins & styles
import { FilePond, registerPlugin } from 'react-filepond';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { RoomType } from '@/utils/enums';

// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize, FilePondPluginFileRename);

const validationSchema = yup.object({
    length: yup.number(),
    width: yup.number(),
    unit_id: yup.number().required(),
    type: yup.string().oneOf(Object.values(RoomType), 'Invalid type').required('Type is required.')
});

const RoomModal = ({ unitId, room, showModal, setShowModal }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: { unit_id: unitId, length: '', width: '', type: '', image: '', },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.rooms.store`);

            if (room) {
                url = route(`dashboard.rooms.update`, { room: room.id });
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

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1 translate-y-50">
                <button className="btn-close btn btn-sm btn-circle d-flex" onClick={() => setShowModal(false)}/>
            </div>
            <Modal.Body className={'modal-body'}>
                <div className="pb-3">
                    <h4 className="mb-1">{(room ? "Update" : "New") + " Room"}</h4>
                </div>
                <ValidationErrors errors={errors}/>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Autocomplete name={'type'} freeSolo options={Object.values(RoomType)}
                                      onChange={(event, value) => {
                                          formik.setFieldValue('type', value, true);
                                      }} renderInput={(params) => (
                            <TextField {...params} label="Type" value={formik.values.type} required
                                       placeholder={'Type...'}
                                       error={formik.touched.type && Boolean(formik.errors.type)}
                                       helperText={formik.touched.type && formik.errors.type}/>
                        )}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Length" type={'number'} placeholder="Room length (in metres)..."
                                   name={'length'} value={formik.values.length} fullWidth onChange={formik.handleChange}
                                   error={formik.touched.length && Boolean(formik.errors.length)}
                                   helperText={formik.touched.length && formik.errors.length}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Width" type={'number'} placeholder="Room width (in metres)..." name={'width'}
                                   value={formik.values.width} fullWidth onChange={formik.handleChange}
                                   error={formik.touched.width && Boolean(formik.errors.width)}
                                   helperText={formik.touched.width && formik.errors.width}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FilePond name="image" maxFileSize={'1MB'} className={'mb-0'}
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
                    {room ? "Update" : "Create"}
                </LoadingButton>
            </Modal.Footer>
        </Modal>
    );
};

RoomModal.propTypes = {
    unitId: PropTypes.number.isRequired,
    room: PropTypes.object,
    showModal: PropTypes.bool
};

export default RoomModal;
