import { useMemo, useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { Col, Row, Table } from 'react-bootstrap';
import DebouncedInput from '@/components/DebouncedInput';
import { rankItem } from '@tanstack/match-sorter-utils';
import { KeyboardArrowDown, KeyboardArrowUp, Sort } from '@mui/icons-material';
import Filter from '@/components/common/datatable/Filter';
import IndeterminateCheckbox from '@/components/common/datatable/IndeterminateCheckbox';
import Header from '@/components/common/datatable/Header';
import Footer from '@/components/common/datatable/Footer';
import PropTypes from 'prop-types';

const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the ranking info
    addMeta(itemRank);

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

const DataTable = ({ title, data, columns, onCreateRow, viewAllLink }) => {
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState(false);

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
            ...columns,
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

    return (
        <>
            <Header table={table} rowSelection={rowSelection} filtering={filtering} setFiltering={setFiltering}
                    title={title} onCreateRow={onCreateRow}/>
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
                                            {header.column.getCanSort() && (
                                                {
                                                    asc: <KeyboardArrowUp sx={{ ml: 1 }}/>,
                                                    desc: <KeyboardArrowDown sx={{ ml: 1 }}/>
                                                }[header.column.getIsSorted()] ?? <Sort sx={{ ml: 1 }}/>
                                            )}
                                        </div>
                                        {filtering && header.column.getCanFilter() && (
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
                            <td key={cell.id} className={'py-2'}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
            <Footer table={table} rowSelection={rowSelection} viewAllLink={viewAllLink}/>
        </>
    );
};

DataTable.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCreateRow: PropTypes.func,
    viewAllLink: PropTypes.string,
};

export default DataTable;
