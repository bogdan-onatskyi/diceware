import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './footer.scss';

const Footer = ({className}) => {
    const classNames = cn(className, "footer");
    return (
        <footer className={classNames}>
            <i className="footer--icon"/>+38 (097) 499-73-82 e&#8209;mail:&nbsp;
            <a href="mailto: gentoo.user@ukr.net">Богдан&nbsp;Онацкий</a>
        </footer>
    );
};

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;