import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { handleDelete } from '@/utils/helpers';
import StatusBadge from '@/components/StatusBadge';

const Index = ({ tickets }) => {
    console.log(tickets);

    return (
        <Dashboard title={'Tickets'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Tickets" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <DataTable title={'Tickets'} columns={[
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
                            accessor: 'title',
                            Header: 'Title',
                            Cell: ({ row }) => (
                                <div className={'text-truncate'} style={{ maxWidth: '10rem' }}>{row.original.title}</div>
                            )
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
                            accessor: 'status',
                            Header: 'Status',
                            Cell: ({ row }) => <StatusBadge status={row.original.status}/>
                        },
                        {
                            accessor: 'actions',
                            disableSortBy: true,
                            className: 'text-end',
                            Cell: ({ row }) => {
                                const ticket = row.original;

                                return (
                                    <>
                                        <IconButton onClick={() => Inertia.get(route('dashboard.tickets.create'))}
                                                    size={"small"} color={"primary"}>
                                            <Edit fontSize={'small'}/>
                                        </IconButton>
                                        <Link href={route('dashboard.tickets.show', { ticket: ticket.id })}>
                                            <ReadMore fontSize={'small'}/>
                                        </Link>
                                        <IconButton
                                            onClick={() => handleDelete(route('dashboard.tickets.destroy', { ticket: ticket.id }), 'ticket')}
                                            size={"small"} color={"error"}>
                                            <Delete fontSize={'small'}/>
                                        </IconButton>
                                    </>
                                );
                            }
                        }
                    ]} data={tickets} onCreateRow={() => Inertia.get(route('dashboard.tickets.create'))}/>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
