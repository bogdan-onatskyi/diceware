import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import WordController from './index/word-controller';
import CountButtonsController from './index/count-buttons-controller';
import PasswordController from './index/password-controller';

import './index-controller.scss';

const IndexController = observer(({passwordObject}) => {
    return (
        <div className="app__content">
            <div className="words-view">
                {passwordObject.wordArray.map((wordObject, i) =>
                    <WordController wordObject={wordObject} key={"WordController_" + i + 1}/>)}
                <CountButtonsController passwordObject={passwordObject}/>
            </div>
            <PasswordController passwordObject={passwordObject}/>
        </div>
    );
});

IndexController.propTypes = {
    passwordObject: PropTypes.object
};

export default IndexController;