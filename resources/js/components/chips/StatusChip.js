import { Status } from '@/utils/enums';
import PropTypes from 'prop-types';
import { Chip, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Check, Error, Info, Pending, TaskAlt } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import pluralize from 'pluralize';
import { useState } from 'react';
import { Arr } from '@/utils/helpers';
import { usePage } from '@inertiajs/inertia-react';

const statusProps = (status, colorIcon = true) => {
    let color = 'default', icon;
    if ([Status.COMPLETED, Status.ACTIVE, Status.RESOLVED].includes(status)) {
        color = 'success';
        icon = <Check color={colorIcon ? color : 'disabled'}/>;
    } else if (status === Status.PENDING) {
        color = 'warning';
        icon = <Pending color={colorIcon ? color : 'disabled'}/>;
    } else if (status === Status.CANCELLED) {
        color = 'info';
        icon = <Info color={colorIcon ? color : 'disabled'}/>;
    } else if ([Status.FAILED, Status.INACTIVE].includes(status)) {
        color = 'error';
        icon = <Error color={colorIcon ? color : 'disabled'}/>;
    }

    return { color, icon };
};

const StatusChip = ({ status, bg = true, entity, entityId }) => {
    const { canUpdateStatus } = usePage().props;
    const { color, icon } = statusProps(status, false);

    if (!canUpdateStatus) {
        return (
            <Chip sx={{ px: .5 }} variant={bg ? 'filled' : 'outlined'} color={color} className={`fw-bold font-size-11`}
                  label={<span><b>Status:</b> {status}</span>} icon={icon}/>
        );
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(null);
    const handleUpdate = status => Inertia.put(route(`dashboard.${pluralize(entity)}.update`, { [entity]: entityId }), { status }, { preserveState: false });

    let statuses = Object.values(Status);

    if (entity === 'user') {
        statuses = Arr.only(statuses, [Status.ACTIVE, Status.INACTIVE]);
    } else if (['transaction', 'payment'].includes(entity)) {
        statuses = Arr.removeItems(statuses, [Status.ACTIVE, Status.INACTIVE, Status.RESOLVED]);
    }

    const menuItems = statuses.map(status => {
        const { icon } = statusProps(status);

        return { title: `Mark as ${status}`, icon, status };
    });

    return (
        <>
            <Chip sx={{ px: .5 }} onClick={e => setAnchorEl(e.currentTarget)}
                  variant={bg ? 'filled' : 'outlined'}
                  color={color} className={`fw-bold font-size-11`}
                  label={<span><b>Status:</b> {status}</span>}
                  icon={icon}
            />
            <Menu
                anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'left', }}
                transformOrigin={{ vertical: 'top', horizontal: 'left', }}>
                {
                    menuItems.map((item, i) => {
                        return (
                            <MenuItem key={`item-${i}`} onClick={() => handleUpdate(item.status)}>
                                <ListItemIcon>{item.icon}</ListItemIcon> {item.title}
                            </MenuItem>
                        );
                    })
                }
            </Menu>
        </>
    );
};

StatusChip.propTypes = {
    status: PropTypes.string.isRequired,
    bg: PropTypes.bool,
    entity: PropTypes.string,
    entityId: PropTypes.number,
};

export default StatusChip;
