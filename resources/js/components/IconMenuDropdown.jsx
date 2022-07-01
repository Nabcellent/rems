import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

const IconMenuDropdown = ({ icon, menuItems, tooltipTitle = "" }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Tooltip title={tooltipTitle}>
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                    {icon}
                </IconButton>
            </Tooltip>
            <Menu id="account-menu" anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}
                  PaperProps={{
                      elevation: 0,
                      sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                          },
                          '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                          },
                      },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    menuItems.map((item, i) => {
                        return <MenuItem key={`item-${i}`} onClick={item.onClick}>{item.avatar} {item.title}</MenuItem>;
                    })
                }
            </Menu>
        </>
    );
};

IconMenuDropdown.propTypes = {
    tooltipTitle: PropTypes.string,
    icon: PropTypes.node.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        avatar: PropTypes.node,
        onClick: PropTypes.func
    })).isRequired
};

export default IconMenuDropdown;
