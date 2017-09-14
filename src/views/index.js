import React from 'react';
import {Provider} from 'mobx-react';

/* components */
import Header from '../components/header/header';
import Menu from '../components/menu/menu';
import WordBoxContainer from '../components/wordboxes/wordbox_container';
import WordCountButtons from '../components/wordcount_buttons/wordcount_buttons';
import PassPhrase from '../components/passphrase/passphrase';
import Footer from '../components/footer/footer';

/* stores */
import wordStore from '../stores/wordstore';

wordStore.init(8, 3);

/* styles */
import './index.scss';

const stores = {wordStore};

const Component = props => (
    <Provider {...stores}>
        <div className="app">
            <Header text="Генератор diceware паролей"/>
            <Menu/>
            <div className="app__content">
                <WordBoxContainer/>
                <WordCountButtons/>
                <PassPhrase/>
            </div>
            <Footer/>
        </div>
    </Provider>
);

export default Component;
