import React from 'react';
import {observer, inject} from 'mobx-react';
import cn from 'classnames';

import './btn.scss';

const Component = inject('wordStore')(observer(({wordStore}) => {
    const buttons = [];

    for (let i = 1; i <= wordStore.maxWords; i++) {
        buttons[i] =
            <button
                key={'wcb_' + i}
                className={cn('btn h25 w25', 'app-content__button',
                    {'app-content__button--active': i === wordStore.usedWords})}
                onClick={() => wordStore.handleUsedWords(i)}>
                {i}
            </button>;
    }

    return (
        <div>
            {buttons}
            <div>
                <button className="btn h25 w100 app-content__button"
                        onClick={() => wordStore.handleChangeAllWords()}>
                    Изменить все
                </button>
            </div>
        </div>
    );
}));

Component.displayName = "WordCountButtonsContainer";
export default Component;