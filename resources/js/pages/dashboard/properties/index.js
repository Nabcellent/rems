import Dashboard from '@/layouts/Dashboard';
import { Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { Paper } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import TableActions from '@/components/TableActions';

const Index = ({ properties }) => {
    console.log(properties);

    return (
        <Dashboard title={'Properties'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Properties" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper className={'p-3'}>
                        <DataTable title={'Properties'} columns={[
                            {
                                accessor: 'name',
                                Header: 'Name',
                                Cell: ({ row }) => row.original.name || ' - '
                            },
                            {
                                accessor: 'estate',
                                Header: 'Estate',
                                Cell: ({ row }) => (
                                    <span>
                                        <Link
                                            href={route('dashboard.estates.show', { estate: row.original.estate.id })}>
                                            {row.original.estate.name}
                                        </Link><br/>
                                        <small>{row.original.estate.address}</small>
                                    </span>
                                )
                            },
                            {
                                accessor: 'owner',
                                Header: 'Owner',
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
                                accessor: 'units_count',
                                Header: 'Units',
                                Cell: ({ row }) => row.original.units_count
                            },
                            {
                                accessor: 'actions',
                                disableSortBy: true,
                                className: 'text-end',
                                Cell: ({ row }) => <TableActions entityId={row.original.id} entity={'property'}/>
                            }
                        ]} data={properties} onCreateRow={() => Inertia.get(route('dashboard.properties.create'))}/>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
