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
            <Button key={"count-button_" + i} onClick={handleUsedWords[i - 1]}
                    data-tip={dataTip}
                    type="count" disabled={i === usedWords}
                    text={i.toString()}/>;
    }

    return (
        <div className="buttons-view">
            {countButtons}
            <div>
                <Button onClick={handleResetAllWords}
                        data-tip="Изменить все слова в пароле"
                        type="reset-all-words" text="Изменить все"/>
            </div>
            <ToolTip/>
        </div>
    );
};

CountButtonsView.propTypes = {
    usedWords: PropTypes.number,
    maxWords: PropTypes.number,
    handleUsedWords: PropTypes.array,
    handleResetAllWords: PropTypes.func
};

export default CountButtonsView;