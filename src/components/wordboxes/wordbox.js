import React from 'react';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';

import wordStore from './../../stores/wordstore';
import Button from '../_general/button/button';

import './wordbox.scss';

const WordBox = inject('wordStore')(observer(({wordObject}) => {
    let key = 1;

    return (
        <div className="wb" onClick={wordObject.handleClick}>
            <div className="wb__word" onWheel={wordObject.handleWheel}>
                <div className="wb__word wb__word--prev2">{wordObject.prev2word}</div>
                <div className="wb__word wb__word--prev1">{wordObject.prev1word}</div>
                <div className="wb__word wb__word--current">{wordObject.word}</div>
                <div className="wb__word wb__word--next1">{wordObject.next1word}</div>
                <div className="wb__word wb__word--next2">{wordObject.next2word}</div>
            </div>
            <div className="wb__code">
                {wordObject.code.split('').map((i) =>
                    <div className={"wb__code wb__code--common wb__code--" + i}
                         key={"code_" + wordObject.id + key++}/>
                )}
            </div>
            <div>
                <Button type="minus" text="-"/>
                <Button type="reset-word" text="Изменить"/>
                <Button type="plus" text="+"/>
            </div>
        </div>
    );
}));
WordBox.propTypes = {
    wordObject: PropTypes.object
};

const WordBoxContainer = inject('wordStore')(observer(({wordStore}) =>
    <div className="words-container">
        {wordStore.wordArray.map((wordObject, i) =>
            <WordBox wordObject={wordObject} key={"WordBox_" + i}/>)}
    </div>
));
WordBoxContainer.propTypes = {
    wordStore: PropTypes.object
};


export {WordBox};
export default WordBoxContainer;