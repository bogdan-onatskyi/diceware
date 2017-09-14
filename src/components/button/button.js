import React from 'react';
import cn from 'classnames';
import './button.scss';

const Button = props => {
    const {text, icon, ...elemProps} = props;
    return (
        <button {...elemProps}>
            {icon && <i className={icon}/>}
            {text && text}
        </button>
    )
};

Button.displayName = "Button";
export default Button;