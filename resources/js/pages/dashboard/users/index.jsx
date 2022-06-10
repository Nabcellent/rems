import Dashboard from '@/layouts/Dashboard';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Avatar, IconButton, Paper, useTheme } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import TableDate from '@/components/TableDate';
import PhoneBadge from '@/components/PhoneBadge';
import StatusBadge from '@/components/StatusBadge';
import { Role } from '@/utils/enums';

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

const Index = ({ users }) => {
    const theme = useTheme();

    return (
        <Dashboard title={'Users'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Users" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper className={'p-3'}>
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
                                    const { id } = row.original;

                                    return (
                                        <>
                                            <IconButton
                                                onClick={() => Inertia.get(route("dashboard.users.edit", { user: id }))}
                                                color={"primary"}>
                                                <Edit fontSize={'small'}/>
                                            </IconButton>
                                            <Link href={route('dashboard.users.show', { user: id })}>
                                                <ReadMore fontSize={'small'}/>
                                            </Link>
                                            <IconButton
                                                onClick={() => handleDelete(route('dashboard.users.destroy', { user: id }), 'User')}
                                                color={"error"}>
                                                <Delete fontSize={'small'}/>
                                            </IconButton>
                                        </>
                                    );
                                }
                            }
                        ]} data={users} onCreateRow={() => Inertia.get(route("dashboard.users.create"))}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
