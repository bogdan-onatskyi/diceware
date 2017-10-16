import React from 'react';

import Header from './components/header/header';
import Menu from './components/menu/menu';
import Footer from './components/footer/footer';

import './index.scss';

const Oops = () => (
    <div className="app">
        <Header text="Не реализовано еще..."/>
        <Menu/>
        <div className="app__content app__content--oops">
            <div className="app__content app__content--oops-box">
                <p>Ой, то что Вы запросили, еще не реализовано, но я над этим работаю...</p>
            </div>
        </div>
        <Footer/>
    </div>
);

export default Oops;