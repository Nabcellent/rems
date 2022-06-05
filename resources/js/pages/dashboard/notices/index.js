import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { handleDelete } from '@/utils/helpers';

const Index = ({ notices }) => {
    console.log(notices);

    return (
        <Dashboard title={'Notices'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Notices" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper className={'p-3'}>
                        <DataTable title={'Notices'} columns={[
                            {
                                accessor: 'user',
                                Header: 'User',
                                Cell: ({ row }) => (
                                    <span>
                                    {row.original.user.full_name} <br/>
                                    <Link href={route('dashboard.users.show', { user: row.original.user.id })}>
                                        <small>{row.original.user.email}</small>
                                    </Link>
                                </span>
                                )
                            },
                            {
                                accessor: 'type',
                                Header: 'Type',
                            },
                            {
                                accessor: 'description',
                                Header: 'Description',
                                Cell: ({ row }) => (
                                    <Tooltip title={row.original.description || 'N / A'}>
                                        <Typography variant={"body2"} style={{
                                            display: "-webkit-box",
                                            overflow: "hidden",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 3,
                                            cursor: "context-menu",
                                            maxWidth: '20rem'
                                        }}>{row.original.description || 'N / A'}</Typography>
                                    </Tooltip>
                                )
                            },
                            {
                                accessor: 'actions',
                                disableSortBy: true,
                                className: 'text-end',
                                Cell: ({ row }) => {
                                    const notice = row.original;

                                    return (
                                        <>
                                            <IconButton onClick={() => Inertia.get(route('dashboard.notices.create'))}
                                                        size={"small"} color={"primary"}>
                                                <Edit fontSize={'small'}/>
                                            </IconButton>
                                            <Link href={route('dashboard.notices.show', { notice: notice.id })}>
                                                <ReadMore fontSize={'small'}/>
                                            </Link>
                                            <IconButton
                                                onClick={() => handleDelete(route('dashboard.notices.destroy', { notice: notice.id }), 'Notice')}
                                                size={"small"} color={"error"}>
                                                <Delete fontSize={'small'}/>
                                            </IconButton>
                                        </>
                                    );
                                }
                            }
                        ]} data={notices} onCreateRow={() => Inertia.get(route('dashboard.notices.create'))}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
