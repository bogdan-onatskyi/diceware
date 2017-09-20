import React from 'react';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';

import Button from '../_general/button/button';

import './wordcount-buttons.scss';

const WordCountButtonsContainer = inject('wordStore')(observer(({wordStore}) => {
    const buttons = [];
    for (let i = 1; i <= wordStore.maxWords; i++) {
        buttons[i] =
            <Button type="count" selected={i === wordStore.usedWords} text={i.toString()}
                    key={"wcb_" + i} onClick={wordStore.handleUsedWords[i - 1]}/>;
    }
    return (
        <div className="buttons-container">
            {buttons}
            <div>
                <Button type="reset-all-words" text="Изменить все"
                        onClick={wordStore.handleResetAllWords}/>
            </div>
        </div>
    );
}));

WordCountButtonsContainer.propTypes = {
    wordStore: PropTypes.object
};

export default WordCountButtonsContainer;