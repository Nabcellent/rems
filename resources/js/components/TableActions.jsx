import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Link } from '@inertiajs/inertia-react';
import { handleDelete, str } from '@/utils/helpers';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';
import Flex from '@/components/common/Flex';

const TableActions = ({ entity, row, showViewLink = true }) => {
    const entityPlural = pluralize(entity);

    return (
        <Flex>
            {row.can?.edit && (
                <Tooltip title={`Edit ${entity}`}>
                    <IconButton component={Link} href={route(`dashboard.${entityPlural}.edit`, { [entity]: row.id })}
                                color={"primary"}><Edit/>
                    </IconButton>
                </Tooltip>
            )}
            {row.can?.view && showViewLink && (
                <Tooltip title={`View ${entity}`}>
                    <Link href={route(`dashboard.${entityPlural}.show`, { [entity]: row.id })} className={'mx-1'}>
                        <ReadMore/>
                    </Link>
                </Tooltip>
            )}
            {row.can?.destroy && (
                <Tooltip title={`Delete ${entity}`}>
                    <IconButton onClick={() => handleDelete(route(`dashboard.${entityPlural}.destroy`, {
                        [entity]: row.id
                    }), str.ucFirst(entity))} color={"error"}><Delete/>
                    </IconButton>
                </Tooltip>
            )}
        </Flex>
    );
};

TableActions.propTypes = {
    entity: PropTypes.string.isRequired,
    row: PropTypes.object.isRequired,
    showViewLink: PropTypes.bool,
};

export default TableActions;
