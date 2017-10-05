import React from 'react';
import PropTypes from 'prop-types';

import Button from '../_general/button/button';
import ToolTip from '../_general/tooltip/tooltip';

import './count-buttons-view.scss';

const CountButtonsView = ({usedWords, maxWords, handleUsedWords, handleResetAllWords}) => {

    const countButtons = [];
    let dataTip = '';
    for (let i = 1; i <= maxWords; i++) {
        dataTip = (i === usedWords) ? "" : "Выбрать количество слов в пароле: " + i;
        countButtons[i] =
            <Button type="count" disabled={i === usedWords} onClick={handleUsedWords.bind(this, i)}
                    data-tip={dataTip} key={"count-button_" + i}>
                {i.toString()}
            </Button>;
    }

    return (
        <div className="buttons-view">
            {countButtons}
            <div>
                <Button type="reset-all-words" onClick={handleResetAllWords}
                        data-tip="Изменить все слова в пароле">
                    Изменить все
                </Button>
            </div>
            <ToolTip/>
        </div>
    );
};

CountButtonsView.propTypes = {
    usedWords: PropTypes.number,
    maxWords: PropTypes.number,
    handleUsedWords: PropTypes.func,
    handleResetAllWords: PropTypes.func
};

export default CountButtonsView;