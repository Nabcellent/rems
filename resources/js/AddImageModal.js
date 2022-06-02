import { Modal } from 'react-bootstrap';
import ValidationErrors from '@/components/ValidationErrors';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
// Import React FilePond with plugins & styles
import { FilePond, registerPlugin } from 'react-filepond';
import { LoadingButton } from '@mui/lab';
import { Create } from '@mui/icons-material';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import * as yup from 'yup';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize, FilePondPluginFileRename);


const validationSchema = yup.object({
    imageable: yup.string().required(),
    imageable_id: yup.string().required(),
    title: yup.string()
});

const AddImageModal = ({ imageable, imageableId, image, showModal, setShowModal }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            imageable: imageable,
            imageable_id: imageableId,
            image: '',
            title: ''
        },
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.images.store`);

            if (image) {
                url = route(`dashboard.images.update`, { image: image.id });
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
                    <h4 className="mb-1">{(image ? "Update" : "New") + " Image"}</h4>
                </div>
                <ValidationErrors errors={errors}/>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Title" placeholder="Image title..." name={'title'}
                                   value={formik.values.title} fullWidth onChange={formik.handleChange}
                                   error={formik.touched.title && Boolean(formik.errors.title)}
                                   helperText={formik.touched.title && formik.errors.title}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FilePond maxFiles={3} name="image" maxFileSize={'1MB'} className={'mb-0'} required
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
                    {image ? "Update" : "Create"}
                </LoadingButton>
            </Modal.Footer>
        </Modal>
    );
};

AddImageModal.propTypes = {
    imageable: PropTypes.string.isRequired,
    imageableId: PropTypes.number.isRequired,
    image: PropTypes.object,
    showModal: PropTypes.bool
};

export default AddImageModal;
