import PropTypes from 'prop-types';

const PermitAction = ({ children, ability = false }) => {
    if (!ability) return <></>;

    return children;
};

PermitAction.propTypes = {
    children: PropTypes.element.isRequired,
    ability: PropTypes.bool.isRequired
};

export default PermitAction;
