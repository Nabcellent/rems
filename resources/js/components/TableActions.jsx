import { Box, IconButton } from '@mui/material';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Link } from '@inertiajs/inertia-react';
import { handleDelete, str } from '@/utils/helpers';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

const TableActions = ({ entity, entityId, showViewLink = true }) => {
    const entityPlural = pluralize(entity);

    return (
        <Box display={'flex'}>
            <IconButton component={Link} href={route(`dashboard.${entityPlural}.edit`, { [entity]: entityId })}
                        color={"primary"}><Edit/>
            </IconButton>
            {
                showViewLink && (
                    <Link href={route(`dashboard.${entityPlural}.show`, { [entity]: entityId })} className={'mx-1'}>
                        <ReadMore/>
                    </Link>
                )
            }
            <IconButton onClick={() => handleDelete(route(`dashboard.${entityPlural}.destroy`, {
                [entity]: entityId
            }), str.ucFirst(entity))} color={"error"}><Delete/>
            </IconButton>
        </Box>
    );
};

TableActions.propTypes = {
    entity: PropTypes.string.isRequired,
    entityId: PropTypes.number.isRequired,
    showViewLink: PropTypes.bool,
};

export default TableActions;
