import Dashboard from '@/layouts/Dashboard';
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Avatar, IconButton, Paper, useTheme } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Inertia, Method } from '@inertiajs/inertia';
import TableDate from '@/components/TableDate';
import { isValidPhoneNumber } from 'libphonenumber-js';
import PhoneChip from '@/components/chips/PhoneChip';
import StatusChip from '@/components/chips/StatusChip';
import { Role } from '@/utils/enums';
import UserModal from '@/pages/dashboard/users/components/UserModal';

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
import { handleDelete } from '@/utils/helpers';

// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize, FilePondPluginFileRename);

const validationSchema = yup.object({
    role: yup.string().oneOf(Object.values(Role), 'Invalid role').required('Role is required.'),
});

const Index = ({ providers }) => {
    const theme = useTheme();
    const [showModal, setShowModal] = useState(false);
    const [formAction, setFormAction] = useState("store");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            user_id: ''
        },
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: values => {
            let url = route(`dashboard.providers.store`);

            if (formAction === 'update') {
                url = route(`dashboard.providers.update`, { user: values.id });
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

    return (
        <Dashboard title={'Service Providers'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Service Providers" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper className={'p-3'}>
                        <DataTable title={'Service Providers'} columns={[
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
                                            }} src={`/images/providers/${row.original.image}`}>
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
                                    ? <PhoneChip phone={row.original.phone}/>
                                    : "N/A"
                            },
                            {
                                accessor: 'status',
                                Header: 'Status',
                                Cell: ({ row }) => <StatusChip status={row.original.status} bg={false}/>
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
                                            <Link
                                                href={route('dashboard.users.show', { user: row.original.id })}>
                                                <ReadMore fontSize={'small'}/>
                                            </Link>
                                            <IconButton
                                                onClick={() => handleDelete(route('dashboard.users.destroy', { user: row.original.id }), 'Provider')}
                                                size={"small"} color={"error"}>
                                                <Delete fontSize={'small'}/>
                                            </IconButton>
                                        </>
                                    );
                                }
                            }
                        ]} data={providers} onCreateRow={handleCreate}/>
                    </Paper>
                </Col>
            </Row>

            <UserModal showModal={showModal} errors={errors} setShowModal={setShowModal} action={formAction}
                       formik={formik} isLoading={isLoading}/>
        </Dashboard>
    );
};

export default Index;
