import Dashboard from '@/layouts/Dashboard';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Avatar, Paper, useTheme } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import TableDate from '@/components/TableDate';
import PhoneChip from '@/components/chips/PhoneChip';
import StatusChip from '@/components/chips/StatusChip';
import { Role } from '@/utils/enums';
import TableActions from '@/components/TableActions';

// Import React FilePond with plugins & styles
import { registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

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
                                    ? <PhoneChip phone={row.original.phone}/>
                                    : "N/A"
                            },
                            {
                                accessor: 'role',
                                Header: 'Role',
                                Cell: ({ row }) => <i>{row.original.user_roles_str}</i>
                            },
                            {
                                accessor: 'created_at',
                                Header: 'Date Joined',
                                className: 'text-end',
                                Cell: ({ row }) => <TableDate date={row.original.created_at}/>
                            },
                            {
                                accessor: 'status',
                                Header: 'Status',
                                Cell: ({ row }) => <StatusChip status={row.original.status} canUpdate={true}
                                                               entity={'user'} entityId={row.original.id}/>
                            },
                            {
                                accessor: 'actions',
                                disableSortBy: true,
                                className: 'text-end',
                                Cell: ({ row }) => <TableActions entityId={row.original.id} entity={'user'}/>
                            }
                        ]} data={users} onCreateRow={() => Inertia.get(route("dashboard.users.create"))}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
