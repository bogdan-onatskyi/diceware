import React from 'react';
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

export default Button;