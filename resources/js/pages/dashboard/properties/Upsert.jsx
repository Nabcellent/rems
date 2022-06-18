import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import {
    Autocomplete,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import { PropertyType, Status } from '@/utils/enums';
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

// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize, FilePondPluginFileRename);

const validationSchema = yup.object({
    estate: yup.object().required('Estate is required.'),
    name: yup.string().required("Name is required"),
    type: yup.string().oneOf(Object.values(PropertyType), 'Invalid property type').required(),
    status: yup.string().oneOf(Object.values(Status), 'Invalid status.'),
});

const Upsert = ({ property, action, estates }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            estate: property?.estate_id ? estates.find(e => e.id === property.estate_id) : '',
            estate_id: property?.estate_id ?? '',
            name: property?.name ?? '',
            type: property?.type ?? '',
            status: property?.status ?? Status.ACTIVE,
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            values.estate_id = values.estate.id;

            let url = route(`dashboard.properties.store`);

            if (property) {
                url = route(`dashboard.properties.update`, { property: property.id });
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

    return (
        <Dashboard title={str.headline(`${action} Property`)}>
            <Breadcrumbs title={"Properties"} breadcrumbItem={str.ucFirst(action)}/>

            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={12} xl={7}>
                    <Paper className={'p-3'} component={'form'} onSubmit={formik.handleSubmit}>
                        <ValidationErrors errors={errors}/>

                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <Autocomplete name={'estate'} freeSolo value={formik.values.estate}
                                              getOptionLabel={o => o.name ?? o}
                                              options={estates.map(e => ({ name: str.headline(e.name), id: e.id }))}
                                              onChange={(event, value) => {
                                                  formik.setFieldValue('estate', value, true);
                                              }} renderInput={(params) => (
                                    <TextField {...params} label="Estate" required placeholder={'Estate...'}
                                               error={formik.touched.estate && Boolean(formik.errors.estate)}
                                               helperText={formik.touched.estate && formik.errors.estate}/>
                                )}/>
                            </Grid>
                            <Grid item lg={6}>
                                <TextField label="Name" placeholder="Property name..." name={'name'} autoFocus
                                           value={formik.values.name} fullWidth onChange={formik.handleChange}
                                           error={formik.touched.name && Boolean(formik.errors.name)}
                                           helperText={formik.touched.name && formik.errors.name}/>
                            </Grid>
                            <Grid item lg={6}>
                                <TextField label="Type" placeholder="Select type..." name={'type'} autoFocus select
                                           value={formik.values.type} fullWidth onChange={formik.handleChange}
                                           error={formik.touched.type && Boolean(formik.errors.type)}
                                           helperText={formik.touched.type && formik.errors.type}>
                                    {
                                        Object.values(PropertyType).map((pt, i) => (
                                            <MenuItem key={`type-${i}`} value={pt}>{str.headline(pt)}</MenuItem>
                                        ))
                                    }
                                </TextField>
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
                                          files={property?.image && `/images/properties/${property?.image}`}
                                          labelMaxFileSizeExceeded={'Image is too large.'}
                                          labelFileTypeNotAllowed={'Invalid image type. allowed(jpg, png, jpeg)'}
                                          labelIdle='Drag & Drop an image or <span class="filepond--label-action">Browse</span>'
                                          acceptedFileTypes={['image/jpg', 'image/png', 'image/jpeg']} dropOnPage
                                          imageResizeTargetWidth={300} imageResizeTargetHeight={300}
                                          onupdatefiles={image => formik.setFieldValue('image', image[0]?.file, true)}
                                          onremovefile={() => formik.setFieldValue('image', null, true)}/>
                            </Grid>
                            <Grid item xs={12} textAlign={'right'} mt={2}>
                                <LoadingButton type={'submit'} size="small" color="primary" loading={isLoading}
                                               loadingPosition="end" onClick={() => formik.submitForm()}
                                               endIcon={<Create/>} variant="contained">{action}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
};

export default Upsert;
