import { memo } from 'react';
import classNames from 'classnames';
import { Form } from 'react-bootstrap';
import Flex from '../Flex';
import { Button } from '@mui/material';

export const AdvanceTableFooter = ({
    table = true,
    page = null,
    pageSize = null,
    pageIndex = null,
    rowCount,
    setPageSize = null,
    canPreviousPage = false,
    canNextPage = false,
    nextPage = null,
    previousPage = null,
    rowInfo = true,
    rowsPerPageSelection = true,
    navButtons = true,
    rowsPerPageOptions = [5, 10, 20, 50],
    className = null
}) => {
    return (
        <Flex className={classNames(className, 'align-items-center justify-content-between')}>
            <Flex alignItems="center" className="fs--1">
                {rowInfo && (
                    <p className="mb-0">
                        <span className="d-none d-sm-inline-block me-2">
                            {pageSize * pageIndex + 1} to {pageSize * pageIndex + page.length}{' '}
                            of {rowCount}
                        </span>
                    </p>
                )}
                {rowsPerPageSelection && (
                    <>
                        <p className="mb-0 mx-2">Rows per page:</p>
                        <Form.Select
                            size="sm"
                            className="w-auto"
                            onChange={e => setPageSize(e.target.value)}
                            defaultValue={pageSize}
                        >
                            {rowsPerPageOptions.map(value => (
                                <option value={value} key={value}>
                                    {value}
                                </option>
                            ))}
                        </Form.Select>
                    </>
                )}
            </Flex>
            {navButtons && (
                <Flex>
                    <Button size="small" variant={canPreviousPage ? 'contained' : 'outlined'}
                            disabled={!canPreviousPage} onClick={() => previousPage()}>
                        Previous
                    </Button>
                    <Button disabled={!canNextPage} size="small" variant={canNextPage ? 'contained' : 'outlined'}
                            className={'ms-2'} onClick={() => nextPage()}>
                        Next
                    </Button>
                </Flex>
            )}
        </Flex>
    );
};

export default memo(AdvanceTableFooter);
