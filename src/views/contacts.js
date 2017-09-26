import React from 'react';

import Header from './components/header/header';
import Menu from './components/menu/menu';
import Footer from './components/footer/footer';

import './index.scss';

const Contacts = props => (
    <div className="app">
        <Header text="Контакты"/>
        <Menu/>
        <div className="app__content app__content--contacts">
            <div className="app__content app__content--contacts-box">
                <span className="row">
                    <span className="col1">Телефон: </span>
                    <span className="col2">+38&nbsp;(097)&nbsp;499&#8209;73&#8209;82</span>
                </span>
                <span className="row">
                    <span className="col1">e&#8209;mail: </span>
                    <a className="col2" href="mailto:gentoo.user@ukr.net">gentoo.user@ukr.net</a>
                </span>
                <span className="row">
                    <span className="col1">резюме: </span>
                    <a className="col2" href="#/oops">ссылка</a>
                </span>
            </div>
        </div>
        <Footer/>
    </div>
);

export default Contacts;