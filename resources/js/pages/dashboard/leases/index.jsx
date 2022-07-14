import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Paper } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import moment from 'moment';
import StatusChip from '@/components/chips/StatusChip';
import TableActions from '@/components/TableActions';
import TableDate from '@/components/TableDate';
import { Morphable } from '@/utils/enums';

const Index = ({ leases }) => {
    console.log(leases);

    return (
        <Dashboard title={'Leases'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Leases" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper className={'p-3'}>
                        <DataTable title={'Leases'} columns={[
                            {
                                accessorKey: 'unit',
                                header: 'Unit',
                                cell: ({ row }) => (
                                    <span>
                                        {row.original.unit.estate.name} <br/>
                                        <Link href={route('dashboard.units.show', row.original.unit)}>
                                            <small>
                                                HSE NO: {' '}
                                                <b>
                                                    {row.original.unit.unitable_name === Morphable.PROPERTY && row.original.unit.unitable.name}
                                                    {row.original.unit.house_number}
                                                </b>
                                            </small>
                                        </Link>
                                    </span>
                                )
                            },
                            {
                                accessorKey: 'owner',
                                header: 'Owner',
                                cell: ({ row }) => (
                                    <span>
                                        {row.original.unit.user.full_name} <br/>
                                        <Link href={route('dashboard.users.show', { user: row.original.unit.user.id })}>
                                            <small>{row.original.unit.user.email}</small>
                                        </Link>
                                    </span>
                                )
                            },
                            {
                                accessorKey: 'tenant',
                                header: 'Tenant',
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
                                accessorKey: 'expires_at',
                                header: 'Expiry',
                                cell: ({ row }) => moment(row.original.expires_at).format("ddd Do MMM YYYY")
                            },
                            {
                                accessorKey: 'created_at',
                                header: 'Date Created',
                                cell: ({ row }) => <TableDate date={row.original.created_at}/>
                            },
                            {
                                accessorKey: 'status',
                                header: 'Status',
                                cell: ({ row }) => <StatusChip status={row.original.status} entity={'lease'}
                                                               entityId={row.original.id}/>
                            },
                            {
                                id: 'actions',
                                cell: ({ row }) => <TableActions row={row.original} entity={'lease'}/>
                            }
                        ]} data={leases}
                                   onCreateRow={can.create.lease ? () => Inertia.get(route('dashboard.leases.create')) : undefined}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
