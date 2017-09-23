import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import WordView from '../../views/components/word-view/word-view';

const WordController = observer(({wordObject}) => {
    return (
        <WordView handleClick={wordObject.handleClick}
                  handleWheel={wordObject.handleWheel}
                  prev2word={wordObject.prev2word}
                  prev1word={wordObject.prev1word}
                  word={wordObject.word}
                  next1word={wordObject.next1word}
                  next2word={wordObject.next2word}
                  code={wordObject.code}
                  id={wordObject.id}/>
    );
});

WordController.propTypes = {
    wordObject: PropTypes.object
};

export default WordController;