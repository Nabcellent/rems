import { memo, ReactNode } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Flex = ({
    justifyContent,
    alignItems,
    alignContent,
    inline,
    wrap,
    className,
    tag: Tag = 'div',
    children,
    breakpoint,
    direction,
    ...rest
}) => {
    return (
        // @ts-ignore
        <Tag className={classNames(
            {
                [`d-${breakpoint ? breakpoint + '-' : ''}flex`]: !inline,
                [`d-${breakpoint ? breakpoint + '-' : ''}inline-flex`]: inline,
                [`flex-${direction}`]: direction,
                [`justify-content-${justifyContent}`]: justifyContent,
                [`align-items-${alignItems}`]: alignItems,
                [`align-content-${alignContent}`]: alignContent,
                [`flex-${wrap}`]: wrap
            },
            className
        )} {...rest}>
            {children}
        </Tag>
    );
};

Flex.propTypes = {
    children: PropTypes.node.isRequired,
    justifyContent: PropTypes.string,
    inline: PropTypes.bool,
    alignItems: PropTypes.string,
    alignContent: PropTypes.string,
    wrap: PropTypes.string,
    className: PropTypes.string,
    tag: PropTypes.string,
    breakpoint: PropTypes.string,
    direction: PropTypes.string
};

export default memo(Flex);
