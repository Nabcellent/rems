import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const Container = styled('div')({
    padding: '.3rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
});

const Leaders = styled('div')({
    borderBottom: `1px dotted rgba(0, 0, 0, 0.3)`,
    flex: 1,
    margin: '0px 4px'
});

const LeaderList = ({ items }) => {
    return (
        <>
            {
                items.map((item, i) => (
                    <Container key={`lease-item-${i}`}>
                        {/*Left side*/}
                        <div>{item.key}</div>

                        {/*Dots*/}
                        <Leaders/>

                        {/*Right side*/}
                        <div>{item.value}</div>
                    </Container>
                ))
            }
        </>
    );
};

LeaderList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    })).isRequired
};

export default LeaderList;
