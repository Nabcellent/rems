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
import ControlledAutoComplete from '@/components/ControlledAutoComplete';

// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize, FilePondPluginFileRename);

const validationSchema = yup.object({
    manager: yup.object(),
    name: yup.string().required('First name is required.'),
    city: yup.string().required('City is required.'),
    address: yup.string().required('Address is required.'),
    latitude: yup.number().required('Latitude is required.'),
    longitude: yup.number().required('Longitude is required.'),
    service_charge: yup.number(),
    status: yup.string().oneOf(Object.values(Status), 'Invalid status.'),
});

const Upsert = ({ estate, action, users, googleMapsKey }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            manager: estate?.manager_id ? users.find(u => u.id === estate.manager_id) : '',
            name: estate?.name ?? '',
            address: estate?.address ?? '',
            county: estate?.county ?? '',
            latitude: estate?.latitude ?? '',
            longitude: estate?.longitude ?? '',
            service_charge: estate?.service_charge ?? 0,
            status: estate?.status ?? Status.ACTIVE,
            image: '',
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.estates.store`);

            if (estate) {
                url = route(`dashboard.estates.update`, { estate: estate.id });
                values._method = Method.PUT;
            }

            let data = {
                ...values,
                manager_id: values.manager?.id
            };

            Inertia.post(url, data, {
                preserveState: false,
                forceFormData: true,
                onBefore: () => setIsLoading(true),
                onSuccess: () => formik.resetForm(),
                onError: errors => setErrors(errors),
                onFinish: () => setIsLoading(false)
            });
        }
    });

    return (
        <Dashboard title={str.headline(`${action} User`)}>
            <Breadcrumbs title={"Users"} breadcrumbItem={str.ucFirst(action)}/>

            <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} xl={6}>
                    <Paper className={'p-3'} component={'form'} onSubmit={formik.handleSubmit}>
                        <ValidationErrors errors={errors}/>

                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <TextField label="Name" placeholder="Estate name..." name={'name'} autoFocus
                                           value={formik.values.name} onChange={formik.handleChange}
                                           error={formik.touched.name && Boolean(formik.errors.name)}
                                           helperText={formik.touched.name && formik.errors.name}/>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ControlledAutoComplete name={'manager'} value={formik.values.manager} options={users}
                                                        getOptionLabel={o => {
                                                            let label = o.email;
                                                            if (label) label += ': ';
                                                            label += o.full_name;
                                                            if (!label) label = o;

                                                            return label;
                                                        }}
                                                        onChange={(event, value) => formik.setFieldValue('manager', value)}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Select Manager"
                                                                       placeholder={'Select property manager...'}
                                                                       error={formik.touched.manager && Boolean(formik.errors.manager)}
                                                                       helperText={formik.touched.manager && formik.errors.manager}/>
                                                        )}/>
                            </Grid>
                            <Grid item lg={6}>
                                <ControlledAutoComplete options={['Nairobi', 'Mombasa']} name={'county'}
                                                        value={formik.values.county} getOptionLabel={o => o}
                                                        onChange={(event, value) => formik.setFieldValue('county', value)}
                                                        renderInput={params => (
                                                            <TextField {...params} label="County"
                                                                       placeholder="County..."
                                                                       error={formik.touched.county && Boolean(formik.errors.county)}
                                                                       helperText={formik.touched.county && formik.errors.county}/>
                                                        )}/>
                            </Grid>
                            <Grid item lg={6}>
                                <TextField label="Address" placeholder="Address..." name={'address'}
                                           value={formik.values.address} onChange={formik.handleChange}
                                           error={formik.touched.address && Boolean(formik.errors.address)}
                                           helperText={formik.touched.address && formik.errors.address}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type={'number'} label="Latitude" placeholder="Latitude..." name={'latitude'}
                                           disabled
                                           value={formik.values.latitude} onChange={formik.handleChange}
                                           error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                                           helperText={formik.touched.latitude && formik.errors.latitude}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type={'number'} label="Longitude" placeholder="Longitude..."
                                           name={'longitude'} disabled
                                           value={formik.values.longitude} onChange={formik.handleChange}
                                           error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                                           helperText={formik.touched.longitude && formik.errors.longitude}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type={'number'} label="Service charge" placeholder="Service charge..."
                                           name={'service_charge'}
                                           value={formik.values.service_charge} onChange={formik.handleChange}
                                           error={formik.touched.service_charge && Boolean(formik.errors.service_charge)}
                                           helperText={formik.touched.service_charge && formik.errors.service_charge}/>
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
                                <LoadingButton disabled={!formik.dirty} type={'submit'} size="small" color="primary"
                                               loading={isLoading}
                                               loadingPosition="end" onClick={() => formik.submitForm()}
                                               endIcon={<Create/>} variant="contained">{action}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} xl={6}>
                    <Paper className={'p-3'}>
                        <Map apiKey={googleMapsKey} searchable={true} editable={true}
                             center={{ lat: estate?.latitude, lng: estate?.longitude }}
                             onLocationChange={pos => {
                                 console.log(pos);
                                 pos?.name && formik.setFieldValue('name', pos.name);
                                 pos?.address && formik.setFieldValue('address', pos.address);
                                 formik.setFieldValue('county', pos.location.city);
                                 formik.setFieldValue('latitude', pos.lat);
                                 formik.setFieldValue('longitude', pos.lng);
                             }}/>
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
};

export default Upsert;
