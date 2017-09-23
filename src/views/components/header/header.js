import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './header.scss';

const Header = ({className, text}) => {
    const classNames = cn(className, "header");
    return (
        <header className={classNames}>
            <h1>{text}</h1>
        </header>
    );
};

Header.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string
};

export default Header;