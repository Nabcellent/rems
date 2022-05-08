import { memo } from 'react';
import AdvanceTableWrapper from './AdvanceTableWrapper';
import AdvanceTable from './AdvanceTable';
import AdvanceTableFooter from './AdvanceTableFooter';
import { Card, Col, Form, Row } from 'react-bootstrap';
import AdvanceTableSearchBox from './AdvanceTableSearchBox';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

function BulkAction({ title, onCreateRow, selectedRowIds = [], bulkActions }) {
    return (
        <Row className="flex-between-center mb-3">
            <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
                <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
                    {
                        Object.keys(selectedRowIds).length > 0
                            ? `You have selected ${Object.keys(selectedRowIds).length} rows`
                            : title
                    }
                </h5>
            </Col>
            {
                bulkActions && <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
                    {Object.keys(selectedRowIds).length > 0 ? (
                        <div className="d-flex">
                            <Form.Select size="sm" aria-label="Bulk actions">
                                <option>Bulk Actions</option>
                                <option value="refund">Refund</option>
                                <option value="delete">Delete</option>
                                <option value="archive">Archive</option>
                            </Form.Select>
                            <Button type="button" variant="contained" size="small" className="ms-2">
                                Apply
                            </Button>
                        </div>
                    ) : (
                        <div className={'d-flex align-items-center'}>
                            {
                                onCreateRow &&
                                <Button size="small" startIcon={<Add/>} transform="shrink-3" className="me-2"
                                        onClick={onCreateRow} variant={'contained'}>
                                    <span className="d-none d-sm-inline-block ms-1">New</span>
                                </Button>
                            }
                            <Button size="small" icon="external-link-alt" transform="shrink-3">
                                <span className="d-none d-sm-inline-block ms-1">Export</span>
                            </Button>
                        </div>
                    )}
                </Col>}
        </Row>
    );
}

const DataTable = ({
    columns,
    data,
    title = 'DataTable',
    perPage = 10,
    tableClassName,
    bulkActions = true,
    onCreateRow,
    searchable = true
}) => {
    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <AdvanceTableWrapper columns={columns} data={data} sortable pagination perPage={perPage}
                                     selection={bulkActions} selectionColumnWidth={30}>
                    <BulkAction table title={title} onCreateRow={onCreateRow} bulkActions={bulkActions}/>
                    <Row className="flex-end-center">
                        {
                            searchable && <Col xs="auto" sm={6} lg={4}><AdvanceTableSearchBox table/></Col>
                        }
                    </Row>
                    <AdvanceTable table headerClassName="bg-200 text-900 text-nowrap align-middle"
                                  rowClassName="align-middle"
                                  tableProps={{
                                      striped: true,
                                      className: `fs--1 mb-0 overflow-hidden ${tableClassName}`
                                  }}
                    />
                    <div className="mt-3">
                        <AdvanceTableFooter rowCount={data.length} table rowInfo navButtons rowsPerPageSelection/>
                    </div>
                </AdvanceTableWrapper>
            </Card.Body>
        </Card>
    );
};

export default memo(DataTable);
