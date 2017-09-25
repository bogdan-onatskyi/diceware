import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './button.scss';

const Button = ({className, type, selected = false, disabled = false, text, onClick, ...elemProps}) => {
    const classNames = cn(className, "button",
        {"button--selected": selected},
        {"button--disabled": disabled},
        {["button--" + type]: type !== undefined});
    if (disabled) onClick = () => false;
    return (
        <button className={classNames} onClick={onClick} {...elemProps}>
            {text ? text : <i/>}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    onClick: PropTypes.func
};

export default Button;