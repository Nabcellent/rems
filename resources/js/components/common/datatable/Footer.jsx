import Flex from '@/components/common/Flex';
import { Form } from 'react-bootstrap';
import { IconButton } from '@mui/material';
import { NavigateBefore, NavigateNext, SkipNext, SkipPrevious } from '@mui/icons-material';
import PropTypes from 'prop-types';

const Footer = ({table, rowSelection}) => {
    return (
        <Flex alignItems={'center'} justifyContent={'between'}>
            <Flex alignItems="center" className="fs--1">
                <p className="mb-0">
                    <span>Page </span>
                    <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
                </p>
                <p className="mb-0 ms-2">Rows per page:</p>
                <Form.Select size="sm" className="w-auto mx-2" value={table.getState().pagination.pageSize}
                             onChange={e => table.setPageSize(Number(e.target.value))}>
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                    ))}
                </Form.Select>
                <div>
                    {Object.keys(rowSelection).length} of{' '}
                    {table.getPreFilteredRowModel().rows.length} Total Rows Selected
                </div>
            </Flex>
            <Flex>
                <IconButton disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}>
                    <SkipPrevious/>
                </IconButton>
                <IconButton disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
                    <NavigateBefore/>
                </IconButton>
                <IconButton disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
                    <NavigateNext/>
                </IconButton>
                <IconButton disabled={!table.getCanNextPage()}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                    <SkipNext/>
                </IconButton>
            </Flex>
        </Flex>
    );
};

Footer.propTypes = {
    table: PropTypes.object.isRequired,
    rowSelection: PropTypes.object.isRequired,
}

export default Footer;
