import { IconButton } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import { Delete, Edit, ReadMore } from '@mui/icons-material';
import { Link, usePage } from '@inertiajs/inertia-react';
import { handleDelete, str } from '@/utils/helpers';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

const TableActions = ({ entity, entityId }) => {
    const { can } = usePage().props;

    const entityPlural = pluralize(entity);

    return (
        <>
            <IconButton
                onClick={() => Inertia.get(route(`dashboard.${entityPlural}.edit`, { [entity]: entityId }))}
                color={"primary"}>
                <Edit fontSize={'small'}/>
            </IconButton>
            <Link href={route(`dashboard.${entityPlural}.show`, { [entity]: entityId })}>
                <ReadMore fontSize={'small'}/>
            </Link>
            <IconButton
                onClick={() => handleDelete(route(`dashboard.${entityPlural}.destroy`, {
                    [entity]: entityId
                }), str.ucFirst(entity))}
                color={"error"}>
                <Delete fontSize={'small'}/>
            </IconButton>
        </>
    );
};

TableActions.propTypes = {
    entity: PropTypes.string.isRequired,
    entityId: PropTypes.number.isRequired
};

export default TableActions;
