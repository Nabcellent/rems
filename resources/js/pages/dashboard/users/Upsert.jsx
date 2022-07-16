import Dashboard from '@/layouts/Dashboard';
import Breadcrumbs from '@/components/common/Breadcrumb';
import {
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
import { Role, Status } from '@/utils/enums';
import { str } from '@/utils/helpers';
import { useFormik } from 'formik';
import { Inertia, Method } from '@inertiajs/inertia';
import React, { useState } from 'react';
import * as yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';
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
    first_name: yup.string().required('First name is required.'),
    last_name: yup.string().required('Last name is required.'),
    phone: yup.string().test({
        name: 'is-valid-phone',
        message: 'Invalid phone number',
        test: val => val == null || val === '' || isValidPhoneNumber(String(val), 'KE')
    }),
    gender: yup.string().oneOf(['male', 'female']),
    email: yup.string().email().required('Email is required.'),
    role: yup.string().oneOf(Object.values(Role), 'Invalid role'),
    status: yup.string().oneOf(Object.values(Status), 'Invalid status.'),
    password: yup.string().min(7),
});

const Upsert = ({ user, createsOwnerFor, action, roles, role, defaultPassword }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            first_name: user?.first_name ?? '',
            last_name: user?.last_name ?? '',
            phone: user?.phone ?? '',
            gender: user?.gender ?? '',
            email: user?.email ?? '',
            role: createsOwnerFor ? Role.OWNER : role ?? '',
            status: user?.status ?? Status.ACTIVE,
            image: '',
            password: defaultPassword,
            createsOwnerFor
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.users.store`);

            if (user) {
                url = route(`dashboard.users.update`, { user: user.id });
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
        <Dashboard title={str.headline(`${action} User`)}>
            <Breadcrumbs title={"Users"} breadcrumbItem={str.ucFirst(action)}/>

            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={12} xl={7}>
                    <Paper className={'p-3'} component={'form'} onSubmit={formik.handleSubmit}>
                        <ValidationErrors errors={errors}/>

                        <Grid container spacing={2}>
                            {
                                action === "create" && (
                                    <Grid item lg={4}>
                                        <TextField label="Role" placeholder="Role..." name={'role'} autoFocus select
                                                   disabled={Boolean(createsOwnerFor)}
                                                   value={formik.values.role} fullWidth onChange={formik.handleChange}
                                                   error={formik.touched.role && Boolean(formik.errors.role)}
                                                   helperText={formik.touched.role && formik.errors.role}>
                                            {
                                                roles.map((r, i) => (
                                                    <MenuItem key={`role-${i}`} value={r}>{str.headline(r)}</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Grid>
                                )
                            }
                            <Grid item lg={action === "create" ? 4 : 6}>
                                <TextField label="First Name" placeholder="First name..." name={'first_name'} autoFocus
                                           value={formik.values.first_name} fullWidth onChange={formik.handleChange}
                                           error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                           helperText={formik.touched.first_name && formik.errors.first_name}/>
                            </Grid>
                            <Grid item lg={action === "create" ? 4 : 6}>
                                <TextField label="Last Name" placeholder="Last name..." name={'last_name'}
                                           value={formik.values.last_name} fullWidth onChange={formik.handleChange}
                                           error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                           helperText={formik.touched.last_name && formik.errors.last_name}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type={'email'} label="Email" placeholder="Email..." name={'email'}
                                           value={formik.values.email} fullWidth onChange={formik.handleChange}
                                           error={formik.touched.email && Boolean(formik.errors.email)}
                                           helperText={formik.touched.email && formik.errors.email}/>
                            </Grid>
                            <Grid item md={user ? 12 : 6}>
                                <TextField type={'tel'} label="Phone Number" placeholder="Phone number..."
                                           name={'phone'} value={formik.values.phone} fullWidth
                                           onChange={formik.handleChange}
                                           error={formik.touched.phone && Boolean(formik.errors.phone)}
                                           helperText={formik.touched.phone && formik.errors.phone}/>
                            </Grid>
                            {
                                !user && (
                                    <Grid item md={6}>
                                        <TextField type="password" size={"small"} label="Password" placeholder="Password..."
                                                   name={'password'} value={formik.values.password}
                                                   error={formik.touched.password && Boolean(formik.errors.password)}
                                                   helperText={(formik.touched.password && formik.errors.password) ?? `default - ${defaultPassword}`}
                                                   onChange={formik.handleChange} autoComplete="off" fullWidth required/>
                                    </Grid>
                                )
                            }
                            <Grid item md={6}>
                                <FormControl error={formik.touched.gender && Boolean(formik.errors.gender)}>
                                    <FormLabel className={'m-0'} id="gender">Gender</FormLabel>
                                    <RadioGroup row aria-labelledby="gender" name="gender" value={formik.values.gender}
                                                onChange={formik.handleChange}>
                                        <FormControlLabel className={'mb-0'} value={'male'} control={<Radio/>}
                                                          label="Male"/>
                                        <FormControlLabel className={'mb-0'} value={'female'} control={<Radio/>}
                                                          label="Female"/>
                                    </RadioGroup>
                                    <FormHelperText className={'mt-0'}>
                                        {formik.touched.gender && formik.errors.gender}
                                    </FormHelperText>
                                </FormControl>
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
                                          files={user?.image && `/images/users/${user?.image}`}
                                          labelMaxFileSizeExceeded={'Image is too large.'}
                                          labelFileTypeNotAllowed={'Invalid image type. allowed(jpg, png, jpeg)'}
                                          labelIdle='Drag & Drop an image or <span class="filepond--label-action">Browse</span>'
                                          acceptedFileTypes={['image/jpg', 'image/png', 'image/jpeg']} dropOnPage
                                          imageResizeTargetWidth={300} imageResizeTargetHeight={300}
                                          onupdatefiles={image => formik.setFieldValue('image', image[0]?.file, true)}
                                          onremovefile={() => formik.setFieldValue('image', null, true)}/>
                            </Grid>
                            <Grid item xs={12} textAlign={'right'} mt={2}>
                                <LoadingButton disabled={!formik.dirty} type={'submit'} size="small" color="primary" loading={isLoading}
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
