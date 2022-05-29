import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Container, Modal, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import { Create, Delete, Edit, ReadMore } from '@mui/icons-material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import ValidationErrors from '@/components/ValidationErrors';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';

const MySwal = withReactContent(Swal);

const validationSchema = yup.object({
    name: yup.string().required(),
    location: yup.string().required()
});

const Index = ({ estates }) => {
    console.log(estates);
    const [showModal, setShowModal] = useState(false);
    const [formAction, setFormAction] = useState("create");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: { name: '', location: '', },
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            Inertia.post(route('dashboard.estates.store'), values, {
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

    const handleUpdate = estate => {
        setFormAction('update');

        formik.setValues(estate, true);
        setShowModal(true);
    };

    const handleDelete = estate => {
        if (estate) {
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
                if (result.isConfirmed) Inertia.delete(route('dashboard.estates.destroy', { estate: estate.id }));
            });
        }
    };

    return (
        <Dashboard title={'Estates'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Estates" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Card>
                        <DataTable title={'Estates'} columns={[
                            {
                                accessor: 'name',
                                Header: 'Name',
                            },
                            {
                                accessor: 'address',
                                Header: 'Address',
                            },
                            {
                                accessor: 'owner',
                                Header: 'Owner',
                                Cell: ({ row }) => row.original.user.last_name
                            },
                            {
                                accessor: 'properties_count',
                                Header: 'Properties',
                                Cell: ({ row }) => row.original.properties_count + row.original.units_count
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
                                            <Link href={route('dashboard.estates.show', { estate: row.original.id })}>
                                                <ReadMore fontSize={'small'}/>
                                            </Link>
                                            <IconButton onClick={() => handleDelete(row.original)}
                                                        size={"small"} color={"error"}>
                                                <Delete fontSize={'small'}/>
                                            </IconButton>
                                        </>
                                    );
                                }
                            }
                        ]} data={estates} onCreateRow={handleCreate}/>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1 translate-y-50">
                    <button className="btn-close btn btn-sm btn-circle d-flex" onClick={() => setShowModal(false)}/>
                </div>
                <Modal.Body className={'modal-body'}>
                    <div className="pb-3">
                        <h4 className="mb-1">{(formAction === "create" ? "New" : "Update") + " Estate"}</h4>
                    </div>

                    <ValidationErrors errors={errors}/>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField size={"small"} label="Name" placeholder="Estate's name..." name={'name'}
                                       value={formik.values.name} fullWidth onChange={formik.handleChange}
                                       error={formik.touched.name && Boolean(formik.errors.name)}
                                       helperText={formik.touched.name && formik.errors.name}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size={"small"} label="Location" placeholder="Estate's location..."
                                       name={'location'}
                                       value={formik.values.location} fullWidth onChange={formik.handleChange}
                                       error={formik.touched.location && Boolean(formik.errors.location)}
                                       helperText={formik.touched.location && formik.errors.location}/>
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
