import React from 'react';
import {observer, inject} from 'mobx-react';

import './wordbox.scss';
import './../../views/btn.scss';

const Component = inject('wordStore')(observer((wordStore => {
    let key = 0;
    const w = wordStore.word;

    const handleWheel = (e) => {
        e.preventDefault();
        if (!e.target.className.includes("word--")) return;
        e.deltaY > 0 ? w.onPlus() : w.onMinus();
    };

    return (
        <div className="word-box__container" onWheel={handleWheel}>
            <div className="word-box__element">
                <div className="word word--prev2" onClick={() => w.onNewWord(w.prev2index)}>
                    {w.prev2word}
                </div>
                <div className="word word--prev" onClick={() => w.onNewWord(w.prev1index)}>
                    {w.prev1word}
                </div>
                <div className="word word--current">
                    {w.word}
                </div>
                <div className="word word--next" onClick={() => w.onNewWord(w.next1index)}>
                    {w.next1word}
                </div>
                <div className="word word--next2" onClick={() => w.onNewWord(w.next2index)}>
                    {w.next2word}
                </div>
            </div>

            <div className="word-box__element h35">
                {w.code.split('').map((i) =>
                    <div className={'code code--' + i} key={'code_' + w.id + key++}/>
                )}
            </div>

            <div className="word-box__element">
                <button className="btn btn__minus h20 w20" onClick={() => w.onMinus()}>-</button>
                <button className="btn h20 w75" onClick={() => w.onNewWord()}>Изменить</button>
                <button className="btn btn__plus h20 w20" onClick={() => w.onPlus()}>+</button>
            </div>
        </div>
    );
})));

Component.displayName = "WordBoxContainer";
export default Component;