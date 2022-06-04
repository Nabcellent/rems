import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { IconButton } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { handleDelete } from '@/utils/helpers';

const Index = ({ units }) => {
    console.log(units);

    return (
        <Dashboard title={'Units'}>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Units" breadcrumbItem="list"/>

            <Row>
                <Col className="col-12">
                    <Card>
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
                                accessor: 'actions',
                                disableSortBy: true,
                                className: 'text-end',
                                Cell: ({ row }) => {
                                    const unit = row.original;

                                    return (
                                        <>
                                            <IconButton onClick={() => Inertia.get(route('dashboard.units.create'))}
                                                        size={"small"} color={"primary"}>
                                                <Edit fontSize={'small'}/>
                                            </IconButton>
                                            <Link
                                                href={route('dashboard.units.show', { unit: unit.id })}>
                                                <ReadMore fontSize={'small'}/>
                                            </Link>
                                            <IconButton
                                                onClick={() => handleDelete(route('dashboard.units.destroy', { unit: unit.id }), 'unit')}
                                                size={"small"} color={"error"}>
                                                <Delete fontSize={'small'}/>
                                            </IconButton>
                                        </>
                                    );
                                }
                            }
                        ]} data={units} onCreateRow={() => Inertia.get(route('dashboard.units.create'))}/>
                    </Card>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
