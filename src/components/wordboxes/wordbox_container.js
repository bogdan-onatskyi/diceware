import React from 'react';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';

import wordStore from './../../stores/wordstore';
import Button from './../button/button';
import './wordbox.scss';

const WordBox = inject('wordStore')(observer((props) => {
    let key = 1;
    const w = props.wordObject;

    return (
        <div className='wb-container' onClick={w.handleClick}>
            <div className='wb-container__word' onWheel={w.handleWheel}>
                <div className='wb-container__word wb-container__word--word-prev2'>{w.prev2word}</div>
                <div className='wb-container__word wb-container__word--word-prev1'>{w.prev1word}</div>
                <div className='wb-container__word wb-container__word--word-current'>{w.word}</div>
                <div className='wb-container__word wb-container__word--word-next1'>{w.next1word}</div>
                <div className='wb-container__word wb-container__word--word-next2'>{w.next2word}</div>
            </div>
            <div className='wb-container__code'>
                {w.code.split('').map((i) =>
                    <div className={'wb-container__code wb-container__code--common ' +
                    'wb-container__code--code-' + i} key={'code_' + w.id + key++}/>
                )}
            </div>
            <div className='wb-container__buttons'>
                <Button className='btn btn__minus' text='-'>-</Button>
                <Button className='btn btn__reset-word' text='Изменить'/>
                <Button className='btn btn__plus' text='+'/>
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
            <WordBox wordObject={wordObject} key={'WordBox_' + i}/>)}
    </div>
));

WordBox.displayName = 'WordBoxComponent';
WordBoxContainer.displayName = 'WordBoxContainer';
export {WordBox};
export default WordBoxContainer;