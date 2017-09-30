import React from 'react';
import PropTypes from 'prop-types';

import Button from '../_general/button/button';
import ToolTip from '../_general/tooltip/tooltip';

import './word-view.scss';

const WordView = ({
                      handleClick, handleWheel,
                      prev2word, prev1word, word, next1word, next2word,
                      code, filter, wordViewId
                  }) => {
    let key = 1;

    const filtered = (filter !== '')
        ? (
            <div className="wv__word--filter"
                 data-tip="Фильтр для этого слова">Фильтр:&nbsp;
                <span className="wv__word--filter-text">{filter}*</span>
            </div>)
        : (
            <div className="wv__word wv__word--prev2"
                 data-tip="Выбрать это слово">&nbsp;{prev2word}&nbsp;
            </div>);

    return (
        <div className="wv" onClick={handleClick}>
            <div className="wv__word" onWheel={handleWheel}>
                {filtered}
                <div className="wv__word wv__word--prev1" data-tip="Выбрать это слово">&nbsp;{prev1word}&nbsp;</div>
                <div className="wv__word wv__word--current" data-tip="Фильтр для этого слова">&nbsp;{word}&nbsp;</div>
                <div className="wv__word wv__word--next1" data-tip="Выбрать это слово">&nbsp;{next1word}&nbsp;</div>
                <div className="wv__word wv__word--next2" data-tip="Выбрать это слово">&nbsp;{next2word}&nbsp;</div>
            </div>
            <div className="wv__code" data-tip="Новое слово">
                {code.split('').map((i) =>
                    <div className={"wv__code wv__code--common wv__code--" + i}
                         key={"code_" + wordViewId + "_" + key++}/>
                )}
            </div>
            <div>
                <Button type="minus" data-tip="Предыдующее слово">-</Button>
                <Button type="reset-word" data-tip="Новое слово">Изменить</Button>
                <Button type="plus" data-tip="Следующее слово">+</Button>
            </div>
            <ToolTip/>
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