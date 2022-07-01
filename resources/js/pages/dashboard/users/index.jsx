import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Avatar, IconButton, Paper, Tooltip } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import TableDate from '@/components/TableDate';
import PhoneChip from '@/components/chips/PhoneChip';
import StatusChip from '@/components/chips/StatusChip';
import { Role } from '@/utils/enums';
import TableActions from '@/components/TableActions';
import { HowToReg } from '@mui/icons-material';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';

const Index = ({ users }) => {
    console.log(users);

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
                                    <Tooltip title={row.original.user_roles_str}>
                                        <div className={'d-flex align-items-center'}>
                                            <Avatar sx={{ width: 24, height: 24, fontSize: '7pt', mr: .5 }}
                                                    src={`/images/users/${row.original.image}`}>
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
                                Cell: ({ row }) => <StatusChip status={row.original.status} entity={'user'}
                                                               entityId={row.original.id}/>
                            },
                            {
                                accessor: 'actions',
                                disableSortBy: true,
                                className: 'text-end',
                                Cell: ({ row }) => {
                                    const [isLoading, setIsLoading] = useState(false);
                                    const [errors, setErrors] = useState({});

                                    const handleApproveAccount = () => {
                                        Inertia.get(route(`approve.account`, row.original), {}, {
                                            preserveScroll: true,
                                            onBefore: () => setIsLoading(true),
                                            onError: errors => setErrors(errors),
                                            onFinish: () => setIsLoading(false)
                                        });
                                    };

                                    return (
                                        <>
                                            {
                                                !row.original.approved_at && (
                                                    <Tooltip title={'Approve Account'}>
                                                        <IconButton component={LoadingButton} loading={isLoading}
                                                                    onClick={() => handleApproveAccount()}
                                                                    color={"primary"}>
                                                            <HowToReg/>
                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            }
                                            <TableActions entityId={row.original.id} entity={'user'}/>
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
