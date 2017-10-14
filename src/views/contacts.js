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
                        <a className="col2"
                           href="https://www.work.ua/jobseeker/my/resumes/view/?id=4308769">
                            www.work.ua
                        </a>
                    <span className="col1"/>
                        <a className="col2"
                           href="https://rabota.ua/jobsearch/cvbuilder?resumeId=11349311">
                            rabota.ua</a>
                </span>
            </div>
        </div>
        <Footer/>
    </div>
);

export default Contacts;