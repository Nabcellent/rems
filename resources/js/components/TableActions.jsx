import { Box, IconButton } from '@mui/material';
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
                <IconButton component={Link} href={route(`dashboard.${entityPlural}.edit`, { [entity]: row.id })}
                            color={"primary"}><Edit/>
                </IconButton>
            )}
            {row.can?.view && showViewLink && (
                <Link href={route(`dashboard.${entityPlural}.show`, { [entity]: row.id })} className={'mx-1'}>
                    <ReadMore/>
                </Link>
            )}
            {row.can?.destroy && (
                <IconButton onClick={() => handleDelete(route(`dashboard.${entityPlural}.destroy`, {
                    [entity]: row.id
                }), str.ucFirst(entity))} color={"error"}><Delete/>
                </IconButton>
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
