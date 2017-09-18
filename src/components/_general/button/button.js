import React from 'react';
import cn from 'classnames';

import './button.scss';

const Button = props => {
    const {className, type, selected = false, text, ...elemProps} = props;
    return (
        <button className={(className ? className + " " : "") + cn("btn",
            {"btn--selected": selected}, {["btn--" + type]: type !== undefined})}
            {...elemProps}>
            {text ? text : <i/>}
        </button>
    );
};

export default Button;