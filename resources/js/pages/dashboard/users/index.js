import Dashboard from '@/layouts/Dashboard';
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Avatar, IconButton, useTheme } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Inertia, Method } from '@inertiajs/inertia';
import TableDate from '@/components/TableDate';
import { isValidPhoneNumber } from 'libphonenumber-js';
import PhoneBadge from '@/components/PhoneBadge';
import StatusBadge from '@/components/StatusBadge';
import { Role } from '@/utils/enums';
import ModalForm from '@/pages/dashboard/users/ModalForm';

// Import React FilePond with plugins & styles
import { registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Link } from '@inertiajs/inertia-react';

// Register filepond plugins
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
                                accessor: 'role',
                                Header: 'Role',
                                Cell: ({ row }) => <i>{row.original.user_roles_str}</i>
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
                                            <Link href={route('dashboard.users.show', { user: row.original.id })}>
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
                        ]} data={users} onCreateRow={handleCreate}/>
                    </Card>
                </Col>
            </Row>

            <ModalForm showModal={showModal} errors={errors} setShowModal={setShowModal} action={formAction}
                       formik={formik} isLoading={isLoading}/>
        </Dashboard>
    );
};

export default Index;
