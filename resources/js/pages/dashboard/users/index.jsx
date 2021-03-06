import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import { Avatar, IconButton, Paper, Tooltip } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import TableDate from '@/components/TableDate';
import PhoneChip from '@/components/chips/PhoneChip';
import StatusChip from '@/components/chips/StatusChip';
import { Role } from '@/utils/enums';
import TableActions from '@/components/TableActions';
import { HowToReg, MarkEmailRead } from '@mui/icons-material';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import DataTable from '@/components/common/datatable';

const Index = ({ users }) => {
    console.log(users);

    return (
        <Dashboard title={'Users'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Users" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper className={'p-3'}>
                        <DataTable title={'Users'} onCreateRow={() => Inertia.get(route("dashboard.users.create"))}
                                    data={users} columns={[
                            {
                                header: 'Name',
                                accessorKey: 'name',
                                accessorFn: row => `${row.full_name}: ${row.email}`,
                                cell: ({ row }) => (
                                    <Tooltip title={row.original.user_roles_str}>
                                        <div className={'d-flex align-items-center'}>
                                            <Avatar sx={{ width: 24, height: 24, fontSize: '7pt', mr: .5 }}
                                                    src={`/images/users/${row.original.image}`}>
                                                {row.original.initials}
                                            </Avatar>
                                            <span>{row.original.full_name} <br/><small>{row.original.email}</small></span>
                                        </div>
                                    </Tooltip>
                                )
                            },
                            {
                                header: 'Phone',
                                accessorKey: 'phone',
                                cell: ({ row }) => <PhoneChip phone={row.original.phone}/>
                            },
                            {
                                header: 'Role',
                                accessorKey: 'role',
                                accessorFn: row => row.user_roles_str,
                            },
                            {
                                header: 'Date Joined',
                                accessorKey: 'created_at',
                                accessorFn: row => moment(row.created_at).calendar(),
                                cell: ({ row }) => <TableDate date={row.original.created_at}/>,
                            },
                            {
                                header: 'Status',
                                accessorKey: 'status',
                                cell: ({ row }) => <StatusChip status={row.original.status} entity={'user'}
                                                               entityId={row.original.id}/>
                            },
                            {
                                id: 'actions',
                                cell: ({ row }) => {
                                    const [isLoadingAcc, setIsLoadingAcc] = useState(false);
                                    const [isLoadingEmail, setIsLoadingEmail] = useState(false);

                                    const handleApproveAccount = () => {
                                        Inertia.get(route(`approve.account`, row.original), {}, {
                                            preserveScroll: true,
                                            onBefore: () => setIsLoadingAcc(true),
                                            onError: errors => console.log(errors),
                                            onFinish: () => setIsLoadingAcc(false)
                                        });
                                    };

                                    const handleVerifyEmail = () => {
                                        Inertia.put(route(`verify.email`, row.original), {}, {
                                            preserveScroll: true,
                                            onBefore: () => setIsLoadingEmail(true),
                                            onError: errors => console.log(errors),
                                            onFinish: () => setIsLoadingEmail(false)
                                        });
                                    };

                                    return (
                                        <>
                                            {!row.original.approved_at && (
                                                <Tooltip title={'Approve Account'}>
                                                    <IconButton component={LoadingButton} loading={isLoadingAcc}
                                                                onClick={() => handleApproveAccount()}
                                                                color={"primary"}><HowToReg/>
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            {!row.original.email_verified_at && (
                                                <Tooltip title={'Verify Email'}>
                                                    <IconButton component={LoadingButton} loading={isLoadingEmail}
                                                                onClick={() => handleVerifyEmail()} color={"primary"}>
                                                        <MarkEmailRead/>
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            <TableActions row={row.original} entity={'user'}/>
                                        </>
                                    );
                                }
                            },
                        ]}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
