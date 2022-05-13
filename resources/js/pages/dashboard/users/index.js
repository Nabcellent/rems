import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Autocomplete, Avatar, Button, Grid, IconButton, TextField, useTheme } from '@mui/material';
import { Create, Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import ValidationErrors from '@/components/ValidationErrors';
import { Inertia, Method } from '@inertiajs/inertia';
import TableDate from '@/components/TableDate';
import { isValidPhoneNumber } from 'libphonenumber-js';
import PhoneBadge from '@/components/PhoneBadge';
import StatusBadge from '@/components/StatusBadge';
import { Gender, Role } from '@/utils/enums';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
// Import FilePond plugins
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { str } from '@/utils/helpers';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize, FilePondPluginFileRename);

const MySwal = withReactContent(Swal);

const validationSchema = yup.object({
    first_name: yup.string().required('First name is required.'),
    last_name: yup.string().required('Last name is required.'),
    phone: yup.string().test({
        name: 'is-valid-phone',
        message: 'Invalid phone number',
        test: value => isValidPhoneNumber(String(value), 'KE')
    }).required('Phone number is required.'),
    gender: yup.string().oneOf(['male', 'female']),
    email: yup.string().email().required('Email is required.'),
    role: yup.string().oneOf(Object.values(Role), 'Invalid role').required('Role is required.'),
});

const Index = ({ users }) => {
    const theme = useTheme();
    const [showModal, setShowModal] = useState(false);
    const [formAction, setFormAction] = useState("store");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            phone: '',
            gender: '',
            email: '',
            role: '',
            image: '',
            user_id: ''
        },
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.users.store`);

            if (formAction === 'update') {
                url = route(`dashboard.users.update`, { user: values.id });
                values._method = Method.PUT
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
        setFormAction('store');
        formik.resetForm();

        setShowModal(true);
    };

    const handleUpdate = user => {
        setFormAction('update');

        formik.setValues(user, true);
        setShowModal(true);
    };

    const handleDelete = user => {
        if (user) {
            MySwal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                showLoaderOnConfirm: true
            }).then(async result => {
                if (result.isConfirmed) Inertia.delete(route('dashboard.users.destroy', { user: user.id }));
            });
        }
    };

    return (
        <Dashboard title={'Users'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Users" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Card>
                        <DataTable title={'Users'} columns={[
                            {
                                accessor: 'name',
                                Header: 'Name',
                                Cell: ({ row }) => (
                                    <OverlayTrigger overlay={
                                        <Tooltip><strong>{row.original.user_roles_str}</strong></Tooltip>
                                    }>
                                        <div className={'d-flex align-items-center'}>
                                            <Avatar sx={{
                                                width: 24,
                                                height: 24,
                                                fontSize: '9pt',
                                                marginRight: .5,
                                                backgroundColor: theme.palette.primary.main
                                            }} src={`/images/users/${row.original.image}`}>
                                                {row.original.initials}
                                            </Avatar>
                                            <span>
                                                {row.original.full_name} <br/>
                                                <small>{row.original.email}</small>
                                            </span>
                                        </div>
                                    </OverlayTrigger>
                                )
                            },
                            {
                                accessor: 'phone',
                                Header: 'Phone',
                                Cell: ({ row }) => row.original.phone
                                    ? <PhoneBadge phone={row.original.phone}/>
                                    : "N/A"
                            },
                            {
                                accessor: 'status',
                                Header: 'Status',
                                Cell: ({ row }) => <StatusBadge status={row.original.status} bg={false}/>
                            },
                            {
                                accessor: 'created_at',
                                Header: 'Date Joined',
                                className: 'text-end',
                                Cell: ({ row }) => <TableDate date={row.original.created_at}/>
                            },
                            {
                                accessor: 'actions',
                                disableSortBy: true,
                                className: 'text-end',
                                Cell: ({ row }) => {
                                    return (
                                        <>
                                            <IconButton onClick={() => handleUpdate(row.original)}
                                                        size={"small"} color={"primary"}>
                                                <Edit fontSize={'small'}/>
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(row.original)}
                                                        size={"small"} color={"error"}>
                                                <Delete fontSize={'small'}/>
                                            </IconButton>
                                        </>
                                    );
                                }
                            }
                        ]} data={users} onCreateRow={handleCreate}/>
                    </Card>
                </Col>
            </Row>

            <Modal size={'lg'} show={showModal} onHide={() => setShowModal(false)}>
                <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1 translate-y-50">
                    <button className="btn-close btn btn-sm btn-circle d-flex" onClick={() => setShowModal(false)}/>
                </div>
                <Modal.Body className={'modal-body'}>
                    <div className="pb-3">
                        <h4 className="mb-1">{(formAction === "store" ? "New" : "Update") + " User"}</h4>
                    </div>

                    <ValidationErrors errors={errors}/>

                    <Grid container spacing={2}>
                        {
                            formAction === "store" && (
                                <Grid item lg={4}>
                                    <Autocomplete name={'role'} freeSolo
                                                  options={Object.values(Role).map(r => ({ label: str.headline(r), value: r }))}
                                                  onChange={(event, { value }) => {
                                                      formik.setFieldValue('role', value, true);
                                                  }} renderInput={(params) => (
                                        <TextField {...params} label="Role" value={formik.values.role} required
                                                   placeholder={'Role...'}
                                                   error={formik.touched.role && Boolean(formik.errors.role)}
                                                   helperText={formik.touched.role && formik.errors.role}/>
                                    )}/>
                                </Grid>
                            )
                        }
                        <Grid item lg={formAction === "store" ? 4 : 6}>
                            <TextField label="First Name" placeholder="First name..." name={'first_name'}
                                       value={formik.values.first_name} fullWidth onChange={formik.handleChange}
                                       error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                       helperText={formik.touched.first_name && formik.errors.first_name}/>
                        </Grid>
                        <Grid item lg={formAction === "store" ? 4 : 6}>
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
                        {formAction === "store" ? "Create" : "Update"}
                    </LoadingButton>
                </Modal.Footer>
            </Modal>
        </Dashboard>
    );
};

export default Index;
