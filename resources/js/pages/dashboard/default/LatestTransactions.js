import { Link, usePage } from '@inertiajs/inertia-react';
import DataTable from '@/components/common/datatable';
import { ReadMore } from '@mui/icons-material';
import { Card, Col, Row } from 'react-bootstrap';

const LatestTransactions = ({latestTransactions}) => {
    return (
        <Row>
            <Col className="col-12">
                <Card>
                    <DataTable title={'Latest Transactions'} columns={[
                        {
                            accessor: 'user',
                            Header: 'User',
                            Cell: ({ row }) => row.original.user.email
                        },
                        {
                            accessor: 'status',
                            Header: 'Status',
                            // Cell: ({ row }) => row.original.user.email
                        },
                        /*{
                            accessor: 'created_at',
                            Header: 'Date',
                            Cell: ({ row }) => {
                                const { created_at } = row.original;

                                let date;
                                if (isToday(moment(created_at))) {
                                    date = "Today";
                                } else if (isYesterday(moment(created_at))) {
                                    date = "Yesterday";
                                } else {
                                    date = moment(created_at).format("D.M.y");
                                }

                                return <div style={{ textAlign: "end" }}>
                                    <strong>{moment(created_at).format("hh:mm A")}</strong><br/>
                                    <Typography variant={"caption"}>{date}</Typography>
                                </div>;
                            }
                        },*/
                        /*{
                            accessor: 'actions',
                            disableSortBy: true,
                            className: 'text-end',
                            Cell: ({ row }) => (
                                <Link href={`/notifications/${row.original.id}`}><ReadMore fontSize={'small'}/></Link>
                            )
                        }*/
                    ]} data={latestTransactions}/>
                </Card>
            </Col>
        </Row>
    );
};

export default LatestTransactions;
