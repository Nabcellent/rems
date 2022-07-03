import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Avatar, Paper, Tooltip } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import TableDate from '@/components/TableDate';
import PhoneChip from '@/components/chips/PhoneChip';
import StatusChip from '@/components/chips/StatusChip';
import { Role } from '@/utils/enums';
import TableActions from '@/components/TableActions';

const Index = ({ providers }) => {
    console.log(providers);

    return (
        <Dashboard title={'Service Providers'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Service Providers" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper className={'p-3'}>
                        <DataTable title={'Service Providers'} columns={[
                            {
                                accessorKey: 'name',
                                header: 'Name',
                                cell: ({ row }) => (
                                    <Tooltip title={<strong>{row.original.user_roles_str}</strong>}>
                                        <div className={'d-flex align-items-center'}>
                                            <Avatar sx={{
                                                width: 24,
                                                height: 24,
                                                fontSize: '9pt',
                                                marginRight: .5,
                                            }} src={`/images/users/${row.original.image}`}>
                                                {row.original.initials}
                                            </Avatar>
                                            <span>
                                                {row.original.full_name} <br/>
                                                <small>{row.original.email}</small>
                                            </span>
                                        </div>
                                    </Tooltip>
                                )
                            },
                            {
                                accessorKey: 'phone',
                                header: 'Phone',
                                cell: ({ row }) => <PhoneChip phone={row.original.phone}/>
                            },
                            {
                                accessorKey: 'status',
                                header: 'Status',
                                cell: ({ row }) => <StatusChip status={row.original.status} entity={'user'}
                                                               entityId={row.original.id}/>
                            },
                            {
                                accessorKey: 'created_at',
                                header: 'Date Joined',
                                className: 'text-end',
                                cell: ({ row }) => <TableDate date={row.original.created_at}/>
                            },
                            {
                                accessorKey: 'actions',
                                disableSortBy: true,
                                className: 'text-end',
                                cell: ({ row }) => <TableActions entityId={row.original.id} entity={'user'}/>
                            }
                        ]} data={providers}
                                   onCreateRow={() => Inertia.get(route('dashboard.users.create', { role: Role.SERVICE_PROVIDER }))}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
