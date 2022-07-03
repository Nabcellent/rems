import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Paper, Tooltip, Typography } from '@mui/material';
import { Link } from '@inertiajs/inertia-react';
import { NoticeType } from '@/utils/enums';
import moment from 'moment';
import { Inertia } from '@inertiajs/inertia';
import TableActions from '@/components/TableActions';

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
                                accessorKey: 'type',
                                header: 'Type',
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
                                accessorKey: 'created_at',
                                header: 'Date',
                                cell: ({ row }) => {
                                    let date, notice = row.original;

                                    if (notice.type === NoticeType.VACATION) {
                                        date = <strong>{moment(notice.end_at).format("D.M.y")}</strong>;
                                    } else {
                                        date = (
                                            <>
                                                <strong>{moment(notice.start_at).format("D.M.y")}</strong>
                                                &nbsp; to &nbsp;
                                                <strong>{moment(notice.end_at).format("D.M.y")}</strong>
                                            </>
                                        );
                                    }

                                    return date;
                                }
                            },
                            {
                                id: 'actions',
                                cell: ({ row }) => <TableActions entityId={row.original.id} entity={'estate'}/>
                            }
                        ]} data={notices} onCreateRow={() => Inertia.get(route('dashboard.notices.create'))}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
