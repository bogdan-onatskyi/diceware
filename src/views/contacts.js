import React from 'react';

import Header from '../components/header/header';
import Menu from '../components/menu/menu';
import Footer from '../components/footer/footer';

import './index.scss';

const Contacts = props => (
    <div className="app">
        <Header text="Контакты"/>
        <Menu/>
        <div className="app__content app__content--contacts">
            <div className="app__content app__content--contacts-box">
                <p>
                    <span className="col1">Телефон: </span>
                    <span className="col2">+38&nbsp;(097)&nbsp;499&#8209;73&#8209;82</span>
                </p>
                <p>
                    <span className="col1">e&#8209;mail: </span>
                    <span className="col2"><a href="mailto:gentoo.user@ukr.net">gentoo.user@ukr.net</a></span>
                </p>
                <p>
                    <span className="col1">резюме: </span>
                    <span className="col2"><a href="#">ссылка</a></span>
                </p>
            </div>
        </div>
        <Footer/>
    </div>
);

export default Contacts;