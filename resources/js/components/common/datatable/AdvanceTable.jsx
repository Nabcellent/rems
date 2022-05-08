import { memo } from 'react';
import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import { Table } from 'react-bootstrap';

// Create a default prop getter
const defaultPropGetter = () => ({});

const AdvanceTable = ({
    getTableProps,
    headers,
    page,
    prepareRow,
    headerClassName,
    rowClassName,
    tableProps,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
}) => {
    return (
        <SimpleBarReact>
            <Table {...getTableProps(tableProps)}>
                <thead className={headerClassName}>
                <tr>
                    {headers.map((column, index) => (
                        <th
                            {...column.getHeaderProps(
                                {
                                    className: column.className,
                                    style: column.style,
                                },
                                getColumnProps(column),
                                getHeaderProps(column),
                                column.getSortByToggleProps(column.headerProps)
                            )}
                        >
                            {column.render('Header')}
                            {column.canSort ? (
                                column.isSorted ? (
                                    column.isSortedDesc ? (
                                        <span className="sort desc"/>
                                    ) : (
                                        <span className="sort asc"/>
                                    )
                                ) : (
                                    <span className="sort"/>
                                )
                            ) : (
                                ''
                            )}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {page.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr key={i} className={rowClassName} {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        // Return an array of prop objects and react-table will merge them appropriately
                                        {...cell.getCellProps([
                                            {
                                                className: cell.column.className,
                                                style: cell.column.style,
                                            },
                                            getColumnProps(cell.column),
                                            getCellProps(cell),
                                        ])}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </SimpleBarReact>
    );
};
AdvanceTable.propTypes = {
    getTableProps: PropTypes.func,
    headers: PropTypes.array,
    page: PropTypes.array,
    prepareRow: PropTypes.func,
    headerClassName: PropTypes.string,
    rowClassName: PropTypes.string,
    tableProps: PropTypes.object
};

export default memo(AdvanceTable);
