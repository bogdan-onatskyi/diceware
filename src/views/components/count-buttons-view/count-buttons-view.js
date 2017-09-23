import React from 'react';
import PropTypes from 'prop-types';

import Button from '../_general/button/button';

import './count-buttons-view.scss';

const CountButtonsView = ({usedWords, maxWords, handleUsedWords, handleResetAllWords}) => {

    const countButtons = [];
    for (let i = 1; i <= maxWords; i++) {
        countButtons[i] =
            <Button key={"count-button_" + i} onClick={handleUsedWords[i - 1]}
                    type="count" selected={i === usedWords}
                    text={i.toString()}/>;
    }

    return (
        <div className="buttons-container">
            {countButtons}
            <div>
                <Button onClick={handleResetAllWords}
                        type="reset-all-words" text="Изменить все"/>
            </div>
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