import React from 'react';
import {observer, inject} from 'mobx-react';
import cn from 'classnames';
import Clipboard from 'clipboard';

import wordStore from '../../stores/wordstore';
import Button from './../button/button';

import './passphrase.scss';
new Clipboard('.pass__after-text');
new Clipboard('.btn__pass-box--copy');

const Component = inject('wordStore')(observer(({wordStore}) => {
    return (
        <div className="pass-container">
            <i className={cn("pass__before-text", {"pass__before-text--opened": wordStore.opened})}
               onClick={wordStore.toggleOpened} data-title="text text text"/>
            <span id="pass" className={"pass__text"}>{wordStore.separatePassphrase(' ')}</span>
            <i className="pass__after-text" data-clipboard-target={"#pass"}/>

            <div className="pass__dropbox">
                {wordStore.opened && wordStore.separators.map((separator, i) =>
                    <div className="pass__dropbox--elem" key={"pass_" + i}>
                        <Button className="btn btn__pass-box btn__pass-box--caps"
                                onClick={wordStore.toggleCAPS.bind(this, i)} text="CAPS"/>
                        <input id={"pass_input_" + i} type="text" readOnly={true}
                               value={wordStore.separatePassphrase(separator, i)}/>
                        <Button className="btn btn__pass-box btn__pass-box--copy"
                                icon="btn__pass-box--copy-icon"
                                data-clipboard-target={"#pass_input_" + i}/>
                    </div>)
                }
            </div>
        </div>
    );
}));

Component.displayName = 'PassPhraseContainer';
export default Component;