import React from 'react';
import {Provider} from 'mobx-react';

import Header from './components/header/header';
import Menu from './components/menu/menu';
import IndexController from '../controllers/index-controller';
import Footer from './components/footer/footer';

import passwordObject from '../models/password-object';

import './index.scss';

passwordObject.init(2, 8);

const stores = {passwordObject};

const Index = props => (
    <Provider {...stores}>
        <div className="app">
            <Header text="Генератор diceware паролей"/>
            <Menu/>
            <IndexController passwordObject={passwordObject}/>
            <Footer/>
        </div>
    </Provider>
);

export default Index;
