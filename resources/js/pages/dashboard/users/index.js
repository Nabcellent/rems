import Dashboard from '@/layouts/Dashboard';
import { Badge, Card, Col, Container, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Autocomplete, Button, Grid, IconButton, TextField } from '@mui/material';
import { Create, Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import ValidationErrors from '@/components/ValidationErrors';
import { Inertia } from '@inertiajs/inertia';
import TableDate from '@/components/TableDate';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import PhoneBadge from '@/components/PhoneBadge';
import StatusBadge from '@/components/StatusBadge';
import { Role } from '@/utils/enums';

const MySwal = withReactContent(Swal);

const validationSchema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    phone: yup.string().test({
        name: 'is-valid-phone',
        message: 'Invalid phone number',
        test: value => isValidPhoneNumber(String(value), 'KE')
    }).required('Phone number is required.'),
    gender: yup.string(),
    email: yup.string().email().required(),
    role: yup.string().oneOf(Object.values(Role), 'Invalid role').required(),
});

const Index = ({ users }) => {
    console.log(users);

    const [showModal, setShowModal] = useState(false);
    const [formAction, setFormAction] = useState("create");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: { first_name: '', last_name: '', phone: '', gender: '', email: '', role: '', },
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            Inertia.post(route('dashboard.users.store'), values, {
                onBefore: () => setIsLoading(true),
                onSuccess: () => {
                    setShowModal(false);
                    formik.resetForm();
                },
                onError: errors => setErrors(errors),
                onFinish: () => setIsLoading(false)
            });
        }
    });

    const handleCreate = () => {
        setFormAction('create');
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
                                    <OverlayTrigger overlay={<Tooltip>{row.original.user_roles_str}</Tooltip>}>
                                        <span>
                                            {row.original.full_name} <br/>
                                            <small>{row.original.email}</small>
                                        </span>
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
                                Header: 'Date',
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
                        <h4 className="mb-1">{(formAction === "create" ? "New" : "Update") + " User"}</h4>
                    </div>

                    <ValidationErrors errors={errors}/>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="First Name" placeholder="First name..." name={'first_name'}
                                       value={formik.values.first_name} fullWidth onChange={formik.handleChange}
                                       error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                       helperText={formik.touched.first_name && formik.errors.first_name}/>
                        </Grid>
                        <Grid item xs={6}>
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
                        <Grid item md={4}>
                            <TextField label="Phone Number" placeholder="Phone number..." name={'phone'}
                                       value={formik.values.phone} fullWidth onChange={formik.handleChange}
                                       error={formik.touched.phone && Boolean(formik.errors.phone)}
                                       helperText={formik.touched.phone && formik.errors.phone}/>
                        </Grid>
                        <Grid item md={4}>
                            <TextField label="Gender" placeholder="Gender..." name={'gender'}
                                       value={formik.values.gender} fullWidth onChange={formik.handleChange}
                                       error={formik.touched.gender && Boolean(formik.errors.gender)}
                                       helperText={formik.touched.gender && formik.errors.gender}/>
                        </Grid>
                        <Grid item md={4}>
                            <Autocomplete name={'role'} options={Object.values(Role).map(r => r.replaceAll('_', ' '))}
                                          freeSolo
                                          onChange={(event, newValue) => {
                                              formik.setFieldValue('role', newValue, true);
                                          }} renderInput={(params) => (
                                <TextField {...params} label="Role" value={formik.values.role} required
                                           placeholder={'Role...'}
                                           error={formik.touched.role && Boolean(formik.errors.role)}
                                           helperText={formik.touched.role && formik.errors.role}/>
                            )}
                            />
                        </Grid>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button size={'small'} className={'me-2'} onClick={() => setShowModal(false)}
                            color={'inherit'}>Cancel</Button>
                    <LoadingButton size="small" color="primary" loading={isLoading} loadingPosition="end"
                                   onClick={() => formik.submitForm()} endIcon={<Create/>} variant="contained">
                        {formAction === "create" ? "Create" : "Update"}
                    </LoadingButton>
                </Modal.Footer>
            </Modal>
        </Dashboard>
    );
};

export default Index;
