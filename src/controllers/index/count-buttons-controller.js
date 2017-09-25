import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import CountButtonsView from '../../views/components/count-buttons-view/count-buttons-view';

const CountButtonsController = observer(({passwordObject}) => {
    return (
        <CountButtonsView usedWords={passwordObject.usedWords}
                          maxWords={passwordObject.maxWords}
                          handleUsedWords={passwordObject.handleUsedWords}
                          handleResetAllWords={passwordObject.handleResetAllWords}/>
    );
});

CountButtonsController.propTypes = {
    passwordObject: PropTypes.object
};

export default CountButtonsController;