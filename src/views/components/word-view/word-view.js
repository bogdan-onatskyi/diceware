import React from 'react';
import PropTypes from 'prop-types';

import Word from './word';
import Code from './code';
import Button from '../_general/button/button';
import ToolTip from '../_general/tooltip/tooltip';

import './word-view.scss';

const tip = (prop, text) => prop ? text : "";

const WordView = ({
                      handleClick, handleWheel,
                      prev2word, prev1word, word, next1word, next2word,
                      code, filter, wordViewId
                  }) => {
    let key = 1;

    return (
        <div className="wv" onClick={handleClick}>
            <div onWheel={handleWheel}>
                {filter === ''
                    ? <Word mod="prev2" word={prev2word} tip="Выбрать это слово"/>
                    : <Word mod="filter" word="Фильтр:" tip="Фильтр для этого слова">
                        <span className="wv__word--filter-text">{filter.toUpperCase()}*</span>
                    </Word>
                }
                <Word mod="prev1" word={prev1word} tip="Выбрать это слово"/>
                <Word mod="current" word={word} tip="Фильтр для этого слова"/>
                <Word mod="next1" word={next1word} tip="Выбрать это слово"/>
                <Word mod="next2" word={next2word} tip="Выбрать это слово"/>
            </div>
            <div data-tip={tip(prev1word + next1word, "Новое слово")}>
                {code.split('').map((i) =>
                    <Code mod={i} word={prev1word + next1word}
                          key={"code_" + wordViewId + "_" + key++}/>
                )}
            </div>
            <div>
                <Button type="minus" disabled={prev1word === ''}
                        data-tip={tip(prev1word, "Предыдующее слово")}>-</Button>
                <Button type="reset-word" disabled={prev1word + next1word === ''}
                        data-tip={tip(prev1word + next1word, "Новое слово")}>Изменить</Button>
                <Button type="plus" disabled={next1word === ''}
                        data-tip={tip(next1word, "Следующее слово")}>+</Button>
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