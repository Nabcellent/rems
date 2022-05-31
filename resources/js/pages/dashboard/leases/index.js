import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { IconButton } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { currencyFormat, handleDelete } from '@/utils/helpers';
import CountUp from 'react-countup';
import TableDate from '@/components/TableDate';
import moment from 'moment';
import StatusBadge from '@/components/StatusBadge';

const Index = ({ leases }) => {
    console.log(leases);

    return (
        <Dashboard title={'Leases'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Leases" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Card>
                        <DataTable title={'Leases'} columns={[
                            {
                                accessor: 'owner',
                                Header: 'Owner',
                                Cell: ({ row }) => (
                                    <span>
                                        {row.original.unit.user.full_name} <br/>
                                        <Link href={route('dashboard.users.show', { user: row.original.unit.user.id })}>
                                            <small>{row.original.user.email}</small>
                                        </Link>
                                    </span>
                                )
                            },
                            {
                                accessor: 'tenant',
                                Header: 'Tenant',
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
                                accessor: 'rent_amount',
                                Header: 'Rent',
                                Cell: ({ row }) => currencyFormat(row.original.rent_amount)
                            },
                            {
                                accessor: 'duration',
                                Header: 'Duration',
                                Cell: ({ row }) => (
                                    <span>
                                        {moment(row.original.start_date).format("D.M.YY")}
                                        &nbsp;-&nbsp;
                                        {moment(row.original.end_date).format("D.M.YY")}
                                    </span>
                                )
                            },
                            {
                                accessor: 'status',
                                Header: 'Status',
                                Cell: ({ row }) => <StatusBadge status={row.original.status} bg={false}/>
                            },
                            {
                                accessor: 'actions',
                                disableSortBy: true,
                                className: 'text-end',
                                Cell: ({ row }) => {
                                    const lease = row.original;

                                    return (
                                        <>
                                            <IconButton onClick={() => Inertia.get(route('dashboard.leases.create'))}
                                                        size={"small"} color={"primary"}>
                                                <Edit fontSize={'small'}/>
                                            </IconButton>
                                            <Link
                                                href={route('dashboard.leases.show', { lease: lease.id })}>
                                                <ReadMore fontSize={'small'}/>
                                            </Link>
                                            <IconButton
                                                onClick={() => handleDelete(route('dashboard.leases.destroy', { lease: lease.id }), 'lease')}
                                                size={"small"} color={"error"}>
                                                <Delete fontSize={'small'}/>
                                            </IconButton>
                                        </>
                                    );
                                }
                            }
                        ]} data={leases} onCreateRow={() => Inertia.get(route('dashboard.leases.create'))}/>
                    </Card>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
