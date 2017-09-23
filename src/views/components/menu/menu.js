import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './menu.scss';

const menuData = {
    links: [
        {id: 1, fa: 'fa-home', title: 'diceware пароли', ref: '/'},
        {id: 2, fa: 'fa-info-circle', title: 'Что это', ref: '/info'},
        {id: 3, fa: 'fa-phone-square', title: 'Контакты', ref: '/contacts'}
    ],
    all: function () {
        return this.links;
    },
};

const Menu = ({className}) => {
    const classNames = cn(className, "menu");
    return (
        <ul className={classNames}>
            {menuData.all().map((item) =>
                <li className="menu__item" key={"menu_" + item.id}>
                    <Link to={item.ref} className={item.fa}>{item.title}</Link>
                </li>
            )}
        </ul>
    );
};

Menu.propTypes = {
    className: PropTypes.string
};

export default Menu;