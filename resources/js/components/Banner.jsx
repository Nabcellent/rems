import { Avatar, Paper } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const Banner = ({ title }) => {
    return (
        <Paper className={'mb-3 d-flex flex-column'}>
            <div className="position-relative min-vh-25 mb-8 card-header">
                <div className="bg-holder rounded-3 rounded-bottom-0"
                     style={{ backgroundImage: 'url(/images/users/profile-default.jpg)' }}/>
                <Avatar sx={{
                    position: 'absolute',
                    bottom: 0,
                    fontSize: '20pt',
                    transform: 'translateY(50%)',
                    width: '10rem',
                    height: '10rem',
                }}>
                    {title ?? 'REMS'}
                </Avatar>
            </div>
        </Paper>
    );
};

Banner.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export default Banner;
