import { Status } from '@/utils/enums';
import PropTypes from 'prop-types';
import { Chip, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Check, Error, Info, Pending } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';
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
    const handleClose = () => setAnchorEl(null);
    const handleUpdate = status => {
        Inertia.put(route(`dashboard.status.update`), { entity, entity_id: entityId, status }, {
            preserveState: false,
            onError: async errors => {
                let text = `<small class="fw-bold text-danger">Whoops! Something is invalid.🌚</small><br>`;
                Object.keys(errors).map((key, i) => text += `<small>${++i}. ${errors[key]}</small><br/>`);

                await sweet({ message: text, type: 'error', duration: 10 });
            }
        });
    };

    let statuses = Arr.removeItems(Object.values(Status), [status]);

    if (['user', 'lease', 'unit', 'property', 'estate'].includes(entity)) {
        statuses = Arr.only(statuses, [Status.ACTIVE, Status.INACTIVE]);
    } else if (['transaction', 'payment'].includes(entity)) {
        statuses = Arr.removeItems(statuses, [Status.ACTIVE, Status.INACTIVE, Status.RESOLVED]);
    } else if(entity === 'ticket') {
        statuses = Arr.only(statuses, [Status.RESOLVED, Status.PENDING])
    }

    const menuItems = statuses.map(status => {
        const { icon } = statusProps(status);

        return { title: `Mark as ${status}`, icon, status };
    });

    return (
        <>
            <Tooltip title={'Update Status'}>
                <Chip sx={{ px: .5 }} onClick={e => setAnchorEl(e.currentTarget)}
                      variant={bg ? 'filled' : 'outlined'}
                      color={color} className={`fw-bold font-size-11`}
                      label={<span><b>Status:</b> {status}</span>}
                      icon={icon}/>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} onClick={handleClose}
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
