import Flex from '@/components/common/Flex';
import { Form } from 'react-bootstrap';
import { Button, IconButton } from '@mui/material';
import { ArrowRightAltRounded, NavigateBefore, NavigateNext, SkipNext, SkipPrevious } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { Inertia } from '@inertiajs/inertia';

const Footer = ({table, rowSelection, viewAllLink}) => {
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
                {
                    viewAllLink &&
                    <Button size="small" icon="external-link-alt" transform="shrink-3"
                            onClick={() => Inertia.get(viewAllLink)}>
                        <span className="d-none d-sm-inline-block ms-1">View All</span>
                        <ArrowRightAltRounded/>
                    </Button>
                }
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
    viewAllLink: PropTypes.string,
}

export default Footer;
