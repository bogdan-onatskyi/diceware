import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './button.scss';

const Button = ({className, type, selected = false, disabled = false, text, ...elemProps}) => {
    const classNames = cn(className, "button",
        {"button--selected": selected},
        {"button--disabled": disabled},
        {["button--" + type]: type !== undefined});
    return (
        <button className={classNames} {...elemProps}>
            {text ? text : <i/>}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    text: PropTypes.string
};

export default Button;