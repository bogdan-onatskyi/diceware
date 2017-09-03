import React from 'react';
import {Provider} from 'mobx-react';

// import DevTools from 'mobx-react-devtools'

/* components */
import WordBoxController from '../components/wordbox/wordboxcontroller';
import WordCountButtons from './_wordcount_buttons';
import PassPhrase from './_passphrase';

/* stores */
import wordStore from '../stores/wordstore';
wordStore.init(8, 5);

/* styles */
import './index.scss';

const stores = {wordStore};

const Component = props => (
    <Provider {...stores}>
        <div className="app">
            <h1>Генератор diceware паролей</h1>
            <div className="app-content">
                <WordBoxController/>
                <WordCountButtons maxWords={wordStore.wordArray.length}/>
                <PassPhrase/>
            </div>
            <div className="app-footer">
                <i className="fa-phone"/>+38 (097) 499-73-82&thinsp;&thinsp;
                <a href="mailto: gentoo.user@ukr.net">
                    &#64;&nbsp;Богдан&nbsp;Онацкий
                </a>
            </div>
            {/*<DevTools />*/}
        </div>
    </Provider>
);

export default Component;
