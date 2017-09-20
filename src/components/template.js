import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './___.scss';

const Component = ({className, text}) => {
    const classNames = cn(className, "___");
    return (
        <div className={classNames}>
            {text}
        </div>
    );
};

Component.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
};

export default Component;
