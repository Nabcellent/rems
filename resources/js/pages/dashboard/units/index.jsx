import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { IconButton, Paper } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { handleDelete } from '@/utils/helpers';
import TableActions from '@/components/TableActions';

const Index = ({ units }) => {
    console.log(units);

    return (
        <Dashboard title={'Units'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Units" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Paper className={'mb-3'}>
                        <Card.Body>
                            <DataTable title={'Units'} columns={[
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
                                    accessor: 'estate',
                                    Header: 'Estate',
                                    Cell: ({ row }) => row.original.estate.name
                                },
                                {
                                    accessor: 'house_number',
                                    Header: 'House Number',
                                },
                                {
                                    accessor: 'purpose',
                                    Header: 'Rent / Sale',
                                },
                                {
                                    accessor: 'type',
                                    Header: 'Type',
                                },
                                {
                                    accessor: 'rooms_count',
                                    Header: 'Rooms',
                                },
                                {
                                    accessor: 'actions',
                                    disableSortBy: true,
                                    className: 'text-end',
                                    Cell: ({ row }) => <TableActions entityId={row.original.id} entity={'unit'}/>                                }
                            ]} data={units} onCreateRow={() => Inertia.get(route('dashboard.units.create'))}/>
                        </Card.Body>
                    </Paper>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
