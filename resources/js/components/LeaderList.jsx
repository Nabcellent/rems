import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const Container = styled('div')({
    padding: '.2rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
});

const Leaders = styled('div')({
    borderBottom: `1px dotted rgba(0, 0, 0, 0.3)`,
    flex: 1,
    margin: '0px 4px'
});

const LeaderList = ({ items, className, component = undefined }) => {
    return (
        <>
            {
                items.map((item, i) => (
                    <Container className={className} key={`lease-item-${i}`}>
                        {/*Left side*/}
                        <Box component={component}>{item.key}</Box>

                        {/*Dots*/}
                        <Leaders/>

                        {/*Right side*/}
                        <Box component={component}>{item.value}</Box>
                    </Container>
                ))
            }
        </>
    );
};

LeaderList.propTypes = {
    component: PropTypes.string,
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    })).isRequired
};

export default LeaderList;
