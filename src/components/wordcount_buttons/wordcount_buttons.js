import React from 'react';
import {observer, inject} from 'mobx-react';
import cn from 'classnames';

import Button from '../button/button';

import './wordcount_buttons.scss';
import '../button/button';

const Component = inject('wordStore')(observer(({wordStore}) => {
    const buttons = [];
    for (let i = 1; i <= wordStore.maxWords; i++) {
        buttons[i] =
            <Button className={cn('btn btn__count', {'btn__selected': i === wordStore.usedWords})}
                    key={'wcb_' + i} onClick={wordStore.handleUsedWords[i - 1]} text={i}/>;
    }
    return (
        <div className="buttons-container">
            {buttons}
            <div>
                <Button className="btn btn__reset-all-words"
                        onClick={wordStore.handleResetAllWords}
                        text="Изменить все"/>
            </div>
        </div>
    );
}));

Component.displayName = 'WordCountButtonsContainer';
export default Component;