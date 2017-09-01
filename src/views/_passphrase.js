import React from 'react';
import {observer, inject} from 'mobx-react';

import wordStore from "../stores/wordstore";

let key = 1;

const Component = inject('wordStore')(observer(({wordStore}) => (
    <div>
        <p className="app-content__passphrase--title">Ваш пароль:</p>
        <div className="app-content__passphrase--text">{wordStore.separatePassphrase(' ')}</div>
        <span className="app-content__passphrase--delimiters"
              onClick={() => wordStore.toggleOpened()}>
              Посмотреть пароль с другими разделителями</span>

        {wordStore.opened && wordStore.separators.map((separator, i) =>
            <div key={'pb_' + key++}>
                <button className="dw-btn h25 app-content__passphrase--button"
                        onClick={() => wordStore.caps[i] = !wordStore.caps[i]}>CAPS
                </button>
                <input type="text" className="h25 app-content__passphrase--input"
                       value={wordStore.separatePassphrase(separator, wordStore.caps[i])}
                       readOnly={true}/>
            </div>)
        }
    </div>
)));

Component.displayName = "PassPhraseContainer";
export default Component;