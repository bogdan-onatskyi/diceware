import React from 'react';
import {observer, inject} from 'mobx-react';

import wordStore from "../stores/wordstore";

const Component = inject('wordStore')(observer(({wordStore}) => (
    <div>
        <div className="app-content__passphrase--box">
            <span className=" app-content__passphrase--text"
                  onClick={() => wordStore.toggleOpened()}>
                {wordStore.separatePassphrase(' ')}
            </span>
            {wordStore.opened && wordStore.separators.map((separator, i) =>
                <div key={'pb_' + i}>
                    <button className="btn h25 app-content__passphrase--button"
                            onClick={() => wordStore.caps[i] = !wordStore.caps[i]}>CAPS
                    </button>
                    <input type="text" className="h25 app-content__passphrase--input"
                           value={wordStore.separatePassphrase(separator, wordStore.caps[i])}
                           readOnly={true}/>
                </div>)
            }
        </div>
    </div>
)));

Component.displayName = "PassPhraseContainer";
export default Component;