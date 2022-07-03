import Dashboard from '@/layouts/Dashboard';
import { useMemo, useState } from 'react';
import {
    flexRender,
    getCoreRowModel, getFacetedMinMaxValues,
    getFacetedRowModel, getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { Col, Form, Row, Table } from 'react-bootstrap';
import { Button, Checkbox, IconButton, ListItemText, Menu, MenuItem } from '@mui/material';
import DebouncedInput from '@/components/DebouncedInput';
import { rankItem } from '@tanstack/match-sorter-utils';
import TableDate from '@/components/TableDate';
import moment from 'moment';
import StatusChip from '@/components/chips/StatusChip';
import Flex from '@/components/common/Flex';
import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    NavigateBefore,
    NavigateNext,
    SkipNext,
    SkipPrevious,
    Sort
} from '@mui/icons-material';
import Filter from '@/components/common/datatable/Filter';
import PhoneChip from '@/components/chips/PhoneChip';
import IndeterminateCheckbox from '@/components/common/datatable/IndeterminateCheckbox';
import pluralize from 'pluralize';

const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the ranking info
    addMeta(itemRank);

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

const ReactTable = ({ title, data, columns }) => {
    const [columnVisibility, setColumnVisibility] = useState({});
    const [anchorEl, setAnchorEl] = useState(undefined);
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data,
        columns: useMemo(() => [
            {
                id: 'select',
                header: ({ table }) => (
                    <IndeterminateCheckbox {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                    }}/>
                ),
                cell: ({ row }) => (
                    <div className="px-1">
                        <IndeterminateCheckbox {...{
                            checked: row.getIsSelected(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler(),
                        }}/>
                    </div>
                ),
            },
            ...columns
        ], []),
        state: {
            columnVisibility,
            globalFilter,
            columnFilters,
            sorting,
            rowSelection
        },
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        globalFilterFn: fuzzyFilter,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        getCoreRowModel: getCoreRowModel(),

        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    const selectedRowsCount = Object.keys(rowSelection).length;
    const tableTitle = pluralize(title, selectedRowsCount);

    return (
        <>
            <Row className="justify-content-between">
                <Col>
                    <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
                        {
                            selectedRowsCount ? `You have selected ${selectedRowsCount} ${tableTitle}` : title
                        }
                    </h5>
                </Col>
                <Col className={'text-end'}>
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
                </Col>
            </Row>
            <Row>
                <Col xs="auto" sm={6} lg={4}>
                    <div className="search-box me-2 mb-2 d-inline-block">
                        <div className="position-relative">
                            <DebouncedInput type={'search'} value={globalFilter ?? ''}
                                            onChange={value => setGlobalFilter(String(value))}
                                            className="shadow" placeholder="Search..." label={'Search all columns...'}/>
                            <i className="bx bx-search-alt search-icon"/>
                        </div>
                    </div>
                </Col>
            </Row>
            <Table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {!header.isPlaceholder && (
                                    <>
                                        <div {...{
                                            className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {{
                                                asc: <KeyboardArrowUp sx={{ ml: 1 }}/>,
                                                desc: <KeyboardArrowDown sx={{ ml: 1 }}/>
                                            }[header.column.getIsSorted()] ?? <Sort sx={{ ml: 1 }}/>}
                                        </div>
                                        {header.column.getCanFilter() && (
                                            <div><Filter column={header.column} table={table}/></div>
                                        )}
                                    </>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
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
        </>
    );
};

const DataTable = ({ users }) => {
    console.log(users);

    return (
        <Dashboard title={'React Table'}>
            <ReactTable title={'React Table'} data={users} columns={[
                {
                    header: 'Name',
                    accessorKey: 'name',
                    accessorFn: row => row.full_name,
                    cell: info => info.getValue(),
                },
                {
                    header: 'Phone',
                    accessorKey: 'phone',
                    cell: ({ row }) => <PhoneChip phone={row.original.phone}/>
                },
                {
                    header: 'Role',
                    accessorKey: 'role',
                    accessorFn: row => row.user_roles_str,
                },
                {
                    header: 'Date Joined',
                    accessorKey: 'created_at',
                    accessorFn: row => moment(row.created_at).calendar(),
                    cell: ({ row }) => <TableDate date={row.original.created_at}/>,
                },
                {
                    header: 'Status',
                    accessorKey: 'status',
                    cell: ({ row }) => <StatusChip status={row.original.status} entity={'user'}
                                                   entityId={row.original.id}/>
                },
            ]}/>
        </Dashboard>
    );
};

export default DataTable;
