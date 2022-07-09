import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { handleDelete } from '@/utils/helpers';
import StatusChip from '@/components/chips/StatusChip';
import TableActions from '@/components/TableActions';

const Index = ({ tickets }) => {
    console.log(tickets);

    return (
        <Dashboard title={'Tickets'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Tickets" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper className={'p-3'}>
                        <DataTable title={'Tickets'} columns={[
                            {
                                accessorKey: 'user',
                                header: 'User',
                                cell: ({ row }) => (
                                    <span>
                                        {row.original.user.full_name} <br/>
                                        <Link href={route('dashboard.users.show', { user: row.original.user.id })}>
                                            <small>{row.original.user.email}</small>
                                        </Link>
                                    </span>
                                )
                            },
                            {
                                accessorKey: 'title',
                                header: 'Title',
                                cell: ({ row }) => (
                                    <div className={'text-truncate'} style={{ maxWidth: '10rem' }}>{row.original.title}</div>
                                )
                            },
                            {
                                accessorKey: 'description',
                                header: 'Description',
                                cell: ({ row }) => (
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
                                accessorKey: 'status',
                                header: 'Status',
                                cell: ({ row }) => <StatusChip status={row.original.status} entity={'payment'}
                                                               entityId={row.original.id}/>
                            },
                            {
                                id: 'actions',
                                cell: ({ row }) => <TableActions row={row.original} entity={'ticket'}/>
                            }
                        ]} data={tickets} onCreateRow={() => Inertia.get(route('dashboard.tickets.create'))}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
