import React from 'react';
import PropTypes from 'prop-types';

import Button from '../_general/button/button';

import './word-view.scss';

const WordView = ({
                      handleClick, handleWheel,
                      prev2word, prev1word, word, next1word, next2word,
                      code, filter, wordViewId
                  }) => {
    let key = 1;

    return (
        <div className="wv" onClick={handleClick}>
            <div className="wv__word" onWheel={handleWheel}>
                {filter !== '' && <div>Фильтр: <span className="wv__word--filter">{filter}*</span></div>}
                {filter === '' && <div className="wv__word wv__word--prev2">&nbsp;{prev2word}&nbsp;</div>}
                <div className="wv__word wv__word--prev1">&nbsp;{prev1word}&nbsp;</div>
                <div className="wv__word wv__word--current">&nbsp;{word}&nbsp;</div>
                <div className="wv__word wv__word--next1">&nbsp;{next1word}&nbsp;</div>
                <div className="wv__word wv__word--next2">&nbsp;{next2word}&nbsp;</div>
            </div>
            <div className="wv__code">
                {code.split('').map((i) =>
                    <div className={"wv__code wv__code--common wv__code--" + i}
                         key={"code_" + wordViewId + key++}/>
                )}
            </div>
            <div>
                <Button type="minus" text="-"/>
                <Button type="reset-word" text="Изменить"/>
                <Button type="plus" text="+"/>
            </div>
        </div>
    );
};
WordView.propTypes = {
    handleClick: PropTypes.func,
    handleWheel: PropTypes.func,
    prev2word: PropTypes.string,
    prev1word: PropTypes.string,
    word: PropTypes.string,
    next1word: PropTypes.string,
    next2word: PropTypes.string,
    code: PropTypes.string,
    filter: PropTypes.string,
    wordViewId: PropTypes.number
};

export default WordView;