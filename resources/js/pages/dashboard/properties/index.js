import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { IconButton } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { handleDelete } from '@/utils/helpers';

const Index = ({ properties }) => {
    console.log(properties);

    return (
        <Dashboard title={'Properties'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Properties" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Card>
                        <DataTable title={'Properties'} columns={[
                            {
                                accessor: 'name',
                                Header: 'Name',
                                Cell: ({ row }) => row.original.name || ' - '
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
                                accessor: 'address',
                                Header: 'Address',
                                Cell: ({ row }) => row.original.estate.address
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
                                Cell: ({ row }) => {
                                    return (
                                        <>
                                            <IconButton
                                                onClick={() => Inertia.get(route('dashboard.properties.create'))}
                                                size={"small"}
                                                color={"primary"}>
                                                <Edit fontSize={'small'}/>
                                            </IconButton>
                                            <Link
                                                href={route('dashboard.properties.show', { property: row.original.id })}>
                                                <ReadMore fontSize={'small'}/>
                                            </Link>
                                            <IconButton
                                                onClick={() => handleDelete(route('dashboard.properties.destroy', { property: row.original.id }), 'property')}
                                                size={"small"} color={"error"}>
                                                <Delete fontSize={'small'}/>
                                            </IconButton>
                                        </>
                                    );
                                }
                            }
                        ]} data={properties} onCreateRow={() => Inertia.get(route('dashboard.properties.create'))}/>
                    </Card>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
