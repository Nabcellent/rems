import { IMAGES } from '@/constants/images';
import PropTypes from 'prop-types';

const CardBgCorner = ({ corner }) => {
    corner = `corner_${corner ?? 1}`;

    return <div className="bg-holder bg-card"
                style={{ backgroundImage: `url(${IMAGES.icons.spotIllustrations[corner]})` }}/>;
};

CardBgCorner.propTypes = {
    corner: PropTypes.number
};

export default CardBgCorner;
