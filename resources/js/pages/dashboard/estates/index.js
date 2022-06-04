import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { IconButton } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { handleDelete } from '@/utils/helpers';

const Index = ({ estates }) => {
    console.log(estates);

    return (
        <Dashboard title={'Estates'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Estates" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Card>
                        <Card.Body>
                            <DataTable title={'Estates'} columns={[
                                {
                                    accessor: 'name',
                                    Header: 'Name',
                                },
                                {
                                    accessor: 'address',
                                    Header: 'Address',
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
                                    accessor: 'properties_count',
                                    Header: 'Properties',
                                    Cell: ({ row }) => row.original.properties_count + row.original.units_count
                                },
                                {
                                    accessor: 'actions',
                                    disableSortBy: true,
                                    className: 'text-end',
                                    Cell: ({ row }) => {
                                        return (
                                            <>
                                                <IconButton
                                                    onClick={() => Inertia.get(route('dashboard.estates.create'))}
                                                    size={"small"} color={"primary"}>
                                                    <Edit fontSize={'small'}/>
                                                </IconButton>
                                                <Link
                                                    href={route('dashboard.estates.show', { estate: row.original.id })}>
                                                    <ReadMore fontSize={'small'}/>
                                                </Link>
                                                <IconButton
                                                    onClick={() => handleDelete(route('dashboard.estates.destroy', { property: row.original.id }), 'estate')}
                                                    size={"small"} color={"error"}>
                                                    <Delete fontSize={'small'}/>
                                                </IconButton>
                                            </>
                                        );
                                    }
                                }
                            ]} data={estates} onCreateRow={() => Inertia.get(route('dashboard.estates.create'))}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
