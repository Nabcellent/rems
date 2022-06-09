import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const Logo = ({ width, height }) => {
    return <Box component={'img'} src={'/images/rems-logo.png'} alt={'logo'} width={width ?? 50}
                height={height ?? 40} sx={{ objectFit: 'cover' }}/>;
};

Logo.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};

export default Logo;
