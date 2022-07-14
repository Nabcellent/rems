import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import {
    Autocomplete,
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
import { Morphable, Purpose, Status, UnitType } from '@/utils/enums';
import { str as Str, str } from '@/utils/helpers';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import React, { useEffect, useState } from 'react';
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
    house_number: yup.string().required('House number is required.'),
    purpose: yup.string().oneOf(Object.values(Purpose), 'Invalid purpose.').required('Purpose is required.'),
    type: yup.string().oneOf(Object.values(UnitType), 'Invalid type.').required('Type is required.'),
    description: yup.string(),
    price: yup.number(),
    status: yup.string().oneOf(Object.values(Status), 'Invalid status.'),
});

const Upsert = ({ unit, action, estates }) => {
    console.log(unit);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [properties, setProperties] = useState([]);

    const formik = useFormik({
        initialValues: {
            house_number: unit?.house_number ?? '',
            type: unit?.type ?? '',
            price: unit?.price ?? '',
            rent_amount: unit?.rent_amount ?? '',
            purpose: unit?.purpose ?? '',
            description: unit?.description ?? '',
            estate: unit?.estate ?? '',
            property: unit?.unitable_name === Morphable.PROPERTY ? unit.unitable : '',
            unitable: unit?.unitable_name ?? '',
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            values.unitable_id = Boolean(values.property) ? values.property.id : values.estate.id;

            let url = route(`dashboard.units.store`);

            if (unit) {
                url = route(`dashboard.units.update`, { unit: unit.id });
                values._method = Method.PUT;
            }

            Inertia.post(url, values, {
                forceFormData: true,
                preserveState: false,
                onBefore: () => setIsLoading(true),
                onSuccess: () => formik.resetForm(),
                onError: errors => setErrors(errors),
                onFinish: () => setIsLoading(false)
            });
        }
    });

    useEffect(() => {
        if (unit) setProperties(estates.find(e => e.id === unit.estate.id).properties);
    }, [unit]);

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
                                              options={estates.map(e => ({ name: str.headline(e.name), ...e }))}
                                              onChange={(event, value) => {
                                                  formik.setFieldValue('unitable', Morphable.ESTATE, true);
                                                  formik.setFieldValue('estate', value, true);
                                                  setProperties(value.properties);
                                              }} renderInput={(params) => (
                                    <TextField {...params} label="Estate" required placeholder={'Estate...'}
                                               error={formik.touched.estate && Boolean(formik.errors.estate)}
                                               helperText={formik.touched.estate && formik.errors.estate}/>
                                )}/>
                            </Grid>
                            <Grid item lg={6}>
                                <Autocomplete name={'property'} freeSolo value={formik.values.property}
                                              getOptionLabel={o => o.name ?? o} disabled={!properties.length}
                                              options={properties.map(e => ({ name: e.name, id: e.id }))}
                                              onChange={(event, value) => {
                                                  formik.setFieldValue('unitable', Morphable.PROPERTY, true);
                                                  formik.setFieldValue('property', value, true);
                                              }} renderInput={(params) => (
                                    <TextField {...params} label="Property" required placeholder={'Property...'}
                                               error={formik.touched.property && Boolean(formik.errors.property)}
                                               helperText={formik.touched.property && formik.errors.property}/>
                                )}/>
                            </Grid>
                            <Grid item md={6}>
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
                                        <FormControlLabel className={'mb-0'} value={UnitType.FURNISHED}
                                                          control={<Radio/>}
                                                          label="Furnished"/>
                                        <FormControlLabel className={'mb-0'} value={UnitType.UNFURNISHED}
                                                          control={<Radio/>}
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
                                                value={formik.values.purpose} onChange={formik.handleChange}>
                                        {Object.values(Purpose).map((purpose, i) => (
                                            <FormControlLabel key={`purpose-${i}`} className={'mb-0'} value={purpose} control={<Radio/>}
                                                              label={Str.headline(purpose)}/>
                                        ))}
                                    </RadioGroup>
                                    <FormHelperText className={'mt-0'}>
                                        {formik.touched.purpose && formik.errors.purpose}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            {
                                [Purpose.SALE, Purpose.EITHER].includes(formik.values.purpose) && (
                                    <Grid item md={6}>
                                        <TextField label={"Unit Price"} type={'number'} placeholder="Unit price..."
                                                   name={'price'} value={formik.values.price} fullWidth
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.price && formik.errors.price}
                                                   helperText={formik.errors.price}/>
                                    </Grid>
                                )
                            }
                            {
                                [Purpose.RENT, Purpose.EITHER].includes(formik.values.purpose) && (
                                    <Grid item md={6}>
                                        <TextField label={"Monthly Rent Amount"} type={'number'}
                                                   placeholder="Monthly rent amount..."
                                                   name={'rent_amount'} value={formik.values.rent_amount} fullWidth
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.rent_amount && formik.errors.rent_amount}
                                                   helperText={formik.errors.rent_amount}/>
                                    </Grid>
                                )
                            }
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
