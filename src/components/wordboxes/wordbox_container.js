import React from 'react';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';

import wordStore from './../../stores/wordstore';
import Button from '../_general/button/button';
import './wordbox.scss';

const WordBox = inject('wordStore')(observer((props) => {
    let key = 1;
    const w = props.wordObject;

    return (
        <div className="wb" onClick={w.handleClick}>
            <div className="wb__word" onWheel={w.handleWheel}>
                <div className="wb__word wb__word--prev2">{w.prev2word}</div>
                <div className="wb__word wb__word--prev1">{w.prev1word}</div>
                <div className="wb__word wb__word--current">{w.word}</div>
                <div className="wb__word wb__word--next1">{w.next1word}</div>
                <div className="wb__word wb__word--next2">{w.next2word}</div>
            </div>
            <div className="wb__code">
                {w.code.split('').map((i) =>
                    <div className={"wb__code wb__code--common wb__code--" + i}
                         key={"code_" + w.id + key++}/>
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

export {WordBox};
export default WordBoxContainer;