import { Children, cloneElement, forwardRef, memo, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
} from 'react-table';

const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = useRef();

        const resolvedRef = ref || defaultRef;

        useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <Form.Check type="checkbox" className="form-check fs-0 mb-0 me-2 d-flex align-items-center">
                <Form.Check.Input type="checkbox" ref={resolvedRef} {...rest} />
            </Form.Check>
        );
    }
);

const AdvanceTableWrapper = ({
    children,
    columns,
    data,
    sortable,
    selection,
    selectionColumnWidth,
    pagination,
    perPage = 10,
}) => {
    const {
        getTableProps,
        headers,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        setPageSize,
        gotoPage,
        pageCount,
        state: { pageIndex, pageSize, selectedRowIds, globalFilter },
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            disableSortBy: !sortable,
            initialState: { pageSize: pagination ? perPage : data.length }
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            if (selection) {
                hooks.visibleColumns.push(columns => [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        headerProps: {
                            style: {
                                maxWidth: selectionColumnWidth
                            }
                        },
                        cellProps: {
                            style: {
                                maxWidth: selectionColumnWidth
                            }
                        },
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        )
                    },
                    ...columns
                ]);
            }
        }
    );

    const recursiveMap = children => {
        return Children.map(children, child => {
            if (child.props?.children) {
                return cloneElement(child, {
                    children: recursiveMap(child.props.children)
                });
            } else {
                if (child.props?.table) {
                    return cloneElement(child, {
                        ...child.props,
                        getTableProps,
                        headers,
                        page,
                        prepareRow,
                        canPreviousPage,
                        canNextPage,
                        nextPage,
                        previousPage,
                        gotoPage,
                        pageCount,
                        pageIndex,
                        selectedRowIds,
                        pageSize,
                        setPageSize,
                        globalFilter,
                        setGlobalFilter
                    });
                } else {
                    return child;
                }
            }
        });
    };

    return <>{recursiveMap(children)}</>;
};

export default memo(AdvanceTableWrapper);
