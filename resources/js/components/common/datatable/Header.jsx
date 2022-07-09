import { Col, Form, Row } from 'react-bootstrap';
import { Button, Checkbox, ListItemText, Menu, MenuItem, Switch, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

const Header = ({
    table, rowSelection, filtering = false, setFiltering = () => {
    }, title, onCreateRow
}) => {
    const [action, setAction] = useState(undefined);
    const [anchorEl, setAnchorEl] = useState(undefined);

    const selectedRowsCount = Object.keys(rowSelection).length;
    const tableTitle = pluralize(title, selectedRowsCount);

    const executeBulkAction = () => {
        const ids = table.getSelectedRowModel().rows.map(row => row.original.id);

        if (action === 'delete') {
            Sweet.fire({
                title: 'Are you sure?',
                text: `You won't be able to revert this!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: `Yes, delete ${tableTitle}!`,
                showLoaderOnConfirm: true
            }).then(result => result.isConfirmed && Inertia.post(route("dashboard.delete"), {
                ids,
                model: pluralize(title, 1)
            }));
        }
    };

    return (
        <Row className="justify-content-between">
            <Col>
                <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
                    {selectedRowsCount ? `You have selected ${selectedRowsCount} ${tableTitle}` : title}
                </h5>
            </Col>
            <Col sm="auto" className={'text-end'}>
                {selectedRowsCount ? (
                    <div className="d-flex">
                        <Form.Select size="sm" aria-label="Bulk actions" onChange={e => setAction(e.target.value)}>
                            <option value={''} hidden>Bulk Actions</option>
                            <option value="refund">Refund</option>
                            <option value="delete">Delete</option>
                        </Form.Select>
                        <Button type="button" variant="contained" size="small" className="ms-2"
                                onClick={() => executeBulkAction()}>
                            Apply
                        </Button>
                    </div>
                ) : (
                    <>
                        {onCreateRow && (
                            <Button size="small" startIcon={<Add/>} transform="shrink-3" className="me-2"
                                    onClick={onCreateRow} variant={'contained'}>
                                <span className="d-none d-sm-inline-block ms-1">New</span>
                            </Button>
                        )}
                        <Tooltip title={`${filtering ? 'Disable' : 'Enable'} Filtering`}>
                            <Switch checked={filtering} onChange={() => setFiltering(!filtering)}/>
                        </Tooltip>
                        <Button id="demo-positioned-button"
                                aria-controls={Boolean(anchorEl) ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true" aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                                onClick={e => setAnchorEl(e.currentTarget)}>
                            Show Columns
                        </Button>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
                              anchorOrigin={{ vertical: 'top', horizontal: 'left', }}
                              transformOrigin={{ vertical: 'top', horizontal: 'left', }}>
                            <MenuItem>
                                <Checkbox checked={table.getIsAllColumnsVisible()}
                                          onChange={table.getToggleAllColumnsVisibilityHandler()}/>
                                <ListItemText primary={'Toggle All'}/>
                            </MenuItem>
                            {table.getAllLeafColumns().map(column => (
                                <MenuItem key={column.id}>
                                    <Checkbox checked={column.getIsVisible()}
                                              onChange={column.getToggleVisibilityHandler()}/>
                                    <ListItemText primary={column.id}/>
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                )}
            </Col>
        </Row>
    );
};

Header.propTypes = {
    table: PropTypes.object.isRequired,
    rowSelection: PropTypes.object.isRequired,
    setFiltering: PropTypes.func,
    title: PropTypes.string.isRequired,
    onCreateRow: PropTypes.func
};

export default Header;
