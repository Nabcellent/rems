import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import { Status } from '@/utils/enums';
import { str } from '@/utils/helpers';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Create } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

// Import React FilePond with plugins & styles
import { FilePond, registerPlugin } from 'react-filepond';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import ValidationErrors from '@/components/ValidationErrors';
import Map from '@/components/Map';

// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize, FilePondPluginFileRename);

const validationSchema = yup.object({
    name: yup.string().required('First name is required.'),
    address: yup.string().required('Last name is required.'),
    latitude: yup.number().required('Latitude is required.'),
    longitude: yup.number().required('Longitude is required.'),
    status: yup.string().oneOf(Object.values(Status), 'Invalid status.'),
});

const Upsert = ({ estate, action, googleMapsKey }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [mapPosition, setMapPosition] = useState({
        lat: -1.265788,
        lng: 36.760435
    });

    const formik = useFormik({
        initialValues: {
            name: estate?.first_name ?? '',
            address: estate?.last_name ?? '',
            latitude: estate?.phone ?? '',
            longitude: estate?.gender ?? '',
            email: estate?.email ?? '',
            status: estate?.status ?? Status.ACTIVE,
            image: '',
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.estates.store`);

            if (estate) {
                url = route(`dashboard.estates.update`, { user: user.id });
                values._method = Method.PUT;
            }

            Inertia.post(url, values, {
                forceFormData: true,
                onBefore: () => setIsLoading(true),
                onSuccess: () => formik.resetForm(),
                onError: errors => setErrors(errors),
                onFinish: () => setIsLoading(false)
            });
        }
    });

    const handlePositionChange = e => {
        formik.setFieldValue(e.target.name, e.target.value);

        setMapPosition({
            lat: e.target.name === 'latitude' ? parseFloat(e.target.value) : mapPosition.lat,
            lng: e.target.name === 'longitude' ? parseFloat(e.target.value) : mapPosition.lng,
        });
    };

    return (
        <Dashboard title={str.headline(`${action} User`)}>
            <Breadcrumbs title={"Users"} breadcrumbItem={str.ucFirst(action)}/>

            <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} xl={6}>
                    <Paper className={'p-3'}>
                        <ValidationErrors errors={errors}/>

                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <TextField label="Name" placeholder="Estate name..." name={'name'} autoFocus
                                           value={formik.values.name} fullWidth onChange={formik.handleChange}
                                           error={formik.touched.name && Boolean(formik.errors.name)}
                                           helperText={formik.touched.name && formik.errors.name}/>
                            </Grid>
                            <Grid item lg={6}>
                                <TextField label="Address" placeholder="Address..." name={'last_name'}
                                           value={formik.values.address} fullWidth onChange={formik.handleChange}
                                           error={formik.touched.address && Boolean(formik.errors.address)}
                                           helperText={formik.touched.address && formik.errors.address}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type={'number'} label="Latitude" placeholder="Latitude..." name={'latitude'}
                                           value={formik.values.latitude} fullWidth
                                           onChange={e => handlePositionChange(e)}
                                           error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                                           helperText={formik.touched.latitude && formik.errors.latitude}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type={'number'} label="Longitude" placeholder="Longitude..."
                                           name={'longitude'}
                                           value={formik.values.longitude} fullWidth
                                           onChange={e => handlePositionChange(e)}
                                           error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                                           helperText={formik.touched.longitude && formik.errors.longitude}/>
                            </Grid>
                            <Grid item md={6}>
                                <FormControl error={formik.touched.status && Boolean(formik.errors.status)}>
                                    <FormLabel className={'m-0'} id="status">Status</FormLabel>
                                    <RadioGroup row aria-labelledby="status" name="status" value={formik.values.status}
                                                onChange={formik.handleChange}>
                                        <FormControlLabel className={'mb-0'} value={Status.ACTIVE} control={<Radio/>}
                                                          label="Active"/>
                                        <FormControlLabel className={'mb-0'} value={Status.INACTIVE} control={<Radio/>}
                                                          label="Inactive"/>
                                    </RadioGroup>
                                    <FormHelperText className={'mt-0'}>
                                        {formik.touched.status && formik.errors.status}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FilePond maxFiles={3} name="image" maxFileSize={'1MB'} className={'mb-0'}
                                          files={estate?.image && `/images/estates/${estate?.image}`}
                                          labelMaxFileSizeExceeded={'Image is too large.'}
                                          labelFileTypeNotAllowed={'Invalid image type. allowed(jpg, png, jpeg)'}
                                          labelIdle='Drag & Drop an image or <span class="filepond--label-action">Browse</span>'
                                          acceptedFileTypes={['image/jpg', 'image/png', 'image/jpeg']} dropOnPage
                                          imageResizeTargetWidth={300} imageResizeTargetHeight={300}
                                          onupdatefiles={image => formik.setFieldValue('image', image[0]?.file)}
                                          onremovefile={() => formik.setFieldValue('image', null)}/>
                            </Grid>
                            <Grid item xs={12} textAlign={'right'} mt={2}>
                                <LoadingButton size="small" color="primary" loading={isLoading} loadingPosition="end"
                                               onClick={() => formik.submitForm()} endIcon={<Create/>}
                                               variant="contained">{action}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} xl={6}>
                    <Paper className={'p-3'}>
                        <Map apiKey={googleMapsKey}
                             position={{
                                 lat: parseFloat(mapPosition.lat),
                                 lng: parseFloat(mapPosition.lng)
                             }}
                             onLocationChange={pos => {
                                 formik.setFieldValue('latitude', pos.lat, true);
                                 formik.setFieldValue('longitude', pos.lng, true);
                             }}/>
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
};

export default Upsert;
