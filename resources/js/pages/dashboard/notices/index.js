import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { handleDelete } from '@/utils/helpers';
import { NoticeType } from '@/utils/enums';
import moment from 'moment';
import NoticeModal from '@/pages/dashboard/notices/components/NoticeModal';
import { useState } from 'react';

const Index = ({ notices }) => {
    console.log(notices);
    const [notice, setNotice] = useState(undefined);
    const [showNoticeModal, setShowNoticeModal] = useState(false);

    const handleCreate = () => {
        setNotice(undefined)
        setShowNoticeModal(true)
    }

    const handleUpdate = notice => {
        setNotice(notice)
        setShowNoticeModal(true)
    }

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
                                accessor: 'created_at',
                                Header: 'Date',
                                Cell: ({ row }) => {
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
                                accessor: 'actions',
                                disableSortBy: true,
                                className: 'text-end',
                                Cell: ({ row }) => {
                                    const notice = row.original;

                                    return (
                                        <>
                                            <IconButton onClick={() => handleUpdate(notice)}
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
                        ]} data={notices} onCreateRow={() => handleCreate()}/>
                    </Paper>
                </Col>
            </Row>

            <NoticeModal showModal={showNoticeModal} setShowModal={setShowNoticeModal} notice={notice} />
        </Dashboard>
    );
};

export default Index;
