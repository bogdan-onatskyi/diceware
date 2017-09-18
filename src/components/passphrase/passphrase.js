import React from 'react';
import {observer, inject} from 'mobx-react';
import cn from 'classnames';
import Clipboard from 'clipboard';

import wordStore from '../../stores/wordstore';
import Button from '../_general/button/button';

import './passphrase.scss';

new Clipboard('.clipboard');

const PassPhraseContainer = inject('wordStore')(observer(({wordStore}) => {
    return (
        <div className="pass-container">
            <i className={cn("pass__before-text", {"pass__before-text--opened": wordStore.opened})}
               onClick={wordStore.toggleOpened}/>
            <span id="pass" className={"pass__text"}>{wordStore.separatePassphrase(' ')}</span>
            <i className="clipboard pass__after-text" data-clipboard-target={"#pass"}/>

            <div className="pass__dropbox">
                {wordStore.opened && wordStore.separators.map((separator, i) =>
                    <div className="pass__dropbox--elem" key={"pass_" + i}>
                        <Button type="caps" text="CAPS"
                                onClick={wordStore.toggleCAPS.bind(this, i)}/>
                        <input id={"pass_input_" + i} type="text" readOnly={true}
                               value={wordStore.separatePassphrase(separator, i)}/>
                        <Button className="clipboard" type="copy"
                                data-clipboard-target={"#pass_input_" + i}/>
                    </div>)
                }
            </div>
        </div>
    );
}));

export default PassPhraseContainer;