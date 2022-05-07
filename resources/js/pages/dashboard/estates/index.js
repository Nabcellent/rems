import Dashboard from '@/layouts/Dashboard';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Breadcrumbs from '@/components/common/Breadcrumb';
import DataTable from '@/components/common/datatable';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as yup from 'yup';
import { useFormik } from 'formik';

const MySwal = withReactContent(Swal);

const validationSchema = yup.object({
    type: yup.string().required(),
    value: yup.string().required()
});

const Index = ({ estates }) => {
    console.log(estates);

    const formik = useFormik({
        initialValues: { type: "", value: "" },
        validationSchema: validationSchema,
        onSubmit: async values => {
            // const setting = await upsertEstate(values).unwrap();

            // setShowModal(false);

            if (setting?.id) toast({
                msg: `Setting ${formik.dirty ? "Updated" : "Created"}!`,
                type: "success"
            });

            // if (result.error) toast({msg: result.error.toString(), type: 'warning'});
        },
    });

    const handleCreate = () => {
        formik.resetForm();
    };

    const handleUpdate = estate => {

    };

    const handleDelete = estate => {
        if (estate) {
            MySwal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                showLoaderOnConfirm: true
            }).then(async result => {
                // if (result.isConfirmed) await deleteSetting(String(setting.id));
            });
        }
    };


    return (
        <Dashboard title={'Estates'}>
            <Container fluid>
                {/* Render Breadcrumbs */}
                <Breadcrumbs title="Estates" breadcrumbItem="list"/>

                <Row>
                    <Col className="col-12">
                        <Card>
                            <DataTable title={'Estates'} columns={[
                                {
                                    accessor: 'name',
                                    Header: 'Name',
                                },
                                {
                                    accessor: 'location',
                                    Header: 'Location',
                                },
                                {
                                    accessor: 'owner',
                                    Header: 'Owner',
                                    Cell: ({ row }) => row.original.user.last_name
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
                                                <IconButton onClick={() => handleUpdate(row.original)}
                                                            size={"small"} color={"primary"}>
                                                    <Edit fontSize={'small'}/>
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(row.original)}
                                                            size={"small"} color={"error"}>
                                                    <Delete fontSize={'small'}/>
                                                </IconButton>
                                            </>
                                        );
                                    }
                                }
                            ]} data={estates} onCreateRow={handleCreate}/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Dashboard>
    );
};

export default Index;
