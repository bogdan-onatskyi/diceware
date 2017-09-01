import React from 'react';
import {Provider} from 'mobx-react';
// import DevTools from 'mobx-react-devtools'

/* components */
import WordBox from '../components/wordbox/wordbox';
import WordCountButtons from './_wordcount_buttons';
import PassPhrase from './_passphrase';

/* stores */
import wordStore from '../stores/wordstore';
wordStore.init(5);

/* styles */
import './index.scss';

const stores = {wordStore};

let key = 1;

const App = props => (
    <Provider {...stores}>
        <div className="app">
            <div className="app-content">
                {wordStore.wordArray.map((id, i) =>
                    <WordBox word={id} key={"WordBox_" + key++}/>)
                }
                <WordCountButtons maxWords={wordStore.wordArray.length}/>
                <hr/>
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

export default App;
