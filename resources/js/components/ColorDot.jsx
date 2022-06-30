import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const ColorDot = ({ color }) => {
    return (
        <Box component={'span'}
             style={{ backgroundColor: color, width: '1rem', height: '1rem', margin: 3 }}
             className={'rounded-3'}
        />
    );
};

ColorDot.propTypes = {
    color: PropTypes.string.isRequired
};

export default ColorDot;
