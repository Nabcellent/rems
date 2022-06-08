import { Card, Modal } from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react';
import {
    Alert,
    Avatar,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import { AddBusiness, Create, Home } from '@mui/icons-material';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Inertia, Method } from '@inertiajs/inertia';
import ValidationErrors from '@/components/ValidationErrors';
import { LoadingButton } from '@mui/lab';
import { Purpose, UnitType } from '@/utils/enums';

// Import React FilePond with plugins & styles
import { FilePond, registerPlugin } from 'react-filepond';

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
    house_number: yup.string().required('House number is required.'),
    purpose: yup.string().oneOf(Object.values(Purpose), 'Invalid purpose.').required('Purpose is required.'),
    type: yup.string().oneOf(Object.values(UnitType), 'Invalid type.').required('Type is required.'),
    description: yup.string(),
});

const Units = ({ unitableId, units, unitable }) => {
    const [unit, setUnit] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: { house_number: '', type: '', purpose: '', description: '', unitable_id: unitableId, unitable },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.units.store`);

            if (unit) {
                url = route(`dashboard.units.update`, { unit: unit.id });
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
        setUnit(undefined);
        setShowModal(true);
    };

    const handleUpdate = unit => {
        setUnit(unit);
        formik.setValues(unit, true);
        setShowModal(true);
    };

    return (
        <>
            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                <h5 className={'mb-0'}>Units</h5>
                <Button startIcon={<AddBusiness/>} onClick={() => handleCreate()}>Add</Button>
            </Card.Header>
            <Card.Body>
                {
                    !units
                        ? <Alert severity="info">This {unitable} hasn't any room yet.</Alert>
                        : units.map(unit => (
                            <Link key={`unit-${unit.id}`} className="d-flex align-items-center p-1"
                                  href={route('dashboard.units.show', { unit: unit.id })}>
                                <Avatar sx={{ width: 30, height: 30 }} className="me-3"><Home/></Avatar>
                                <div className="w-100">
                                    <p className="mb-0">House Number: <strong>{unit.house_number}</strong></p>
                                    <div className={'d-flex justify-content-between'}>
                                        <small className="mb-1">For <strong>{unit.purpose}</strong></small>
                                        <small className="text-muted">
                                            <i>{moment(unit.created_at).format("MMMM D, LT")}</i>
                                        </small>
                                    </div>
                                </div>
                            </Link>
                        ))
                }
            </Card.Body>

            <Modal show={showModal} onHide={() => setShowModal(false)} size={'lg'}>
                <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1 translate-y-50">
                    <button className="btn-close btn btn-sm btn-circle d-flex" onClick={() => setShowModal(false)}/>
                </div>
                <Modal.Body className={'modal-body'}>
                    <div className="pb-3">
                        <h4 className="mb-1">{(unit ? "Update" : "New") + " Unit"}</h4>
                    </div>
                    <ValidationErrors errors={errors}/>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="House No." placeholder="House number..."
                                       name={'house_number'} value={formik.values.house_number} fullWidth
                                       onChange={formik.handleChange}
                                       error={formik.touched.house_number && Boolean(formik.errors.house_number)}
                                       helperText={formik.touched.house_number && formik.errors.house_number}/>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl error={formik.touched.type && Boolean(formik.errors.type)}>
                                <FormLabel className={'m-0'} id="unit-type">Type</FormLabel>
                                <RadioGroup row aria-labelledby="unit-type" name="type" value={formik.values.type}
                                            onChange={formik.handleChange}>
                                    <FormControlLabel className={'mb-0'} value={UnitType.FURNISHED} control={<Radio/>}
                                                      label="Furnished"/>
                                    <FormControlLabel className={'mb-0'} value={UnitType.UNFURNISHED} control={<Radio/>}
                                                      label="Unfurnished"/>
                                </RadioGroup>
                                <FormHelperText className={'mt-0'}>
                                    {formik.touched.type && formik.errors.type}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl error={formik.touched.purpose && Boolean(formik.errors.purpose)}>
                                <FormLabel className={'m-0'} id="unit-purpose">Purpose</FormLabel>
                                <RadioGroup row aria-labelledby="unit-purpose" name="purpose"
                                            value={formik.values.purpose}
                                            onChange={formik.handleChange}>
                                    <FormControlLabel className={'mb-0'} value={Purpose.RENT} control={<Radio/>}
                                                      label="Rent"/>
                                    <FormControlLabel className={'mb-0'} value={Purpose.SALE} control={<Radio/>}
                                                      label="Sale"/>
                                </RadioGroup>
                                <FormHelperText className={'mt-0'}>
                                    {formik.touched.purpose && formik.errors.purpose}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description" multiline rows={3} name={'description'}
                                       placeholder="Start describing your brief policy..."
                                       value={formik.values.description} fullWidth onChange={formik.handleChange}
                                       error={formik.touched.description && Boolean(formik.errors.description)}
                                       helperText={formik.touched.description && formik.errors.description}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FilePond name="image" maxFileSize={'1MB'} className={'mb-0'}
                                      labelMaxFileSizeExceeded={'Image is too large.'}
                                      files={unit?.image && `/images/units/${unit?.image}`}
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
                        {unit ? "Update" : "Create"}
                    </LoadingButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

Units.propTypes = {
    unitableId: PropTypes.number.isRequired,
    units: PropTypes.arrayOf(PropTypes.object).isRequired,
    unitable: PropTypes.string.isRequired
};

export default Units;
