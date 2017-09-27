import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './button.scss';

const Button = ({
                    className, type,
                    selected = false, disabled = false,
                    onClick, children, ...elemProps
                }) => {

    const classNames = cn(className, "button",
        {"button--selected": selected},
        {"button--disabled": disabled},
        {["button--" + type]: type !== undefined});
    const dataTip = elemProps['data-tip'];

    if (disabled) onClick = '';

    return (
        <button className={classNames} onClick={onClick} data-tip={dataTip}>
            {children}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;