import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import WordView from '../../views/components/word-view/word-view';
import EditorDialog from '../../views/components/word-view/editor-dialog';

const WordController = observer(({wordObject}) => {
    const wordView = (
        <WordView handleClick={wordObject.handlerClick}
                  handleWheel={wordObject.handlerWheel}
                  prev2word={wordObject.prev2word}
                  prev1word={wordObject.prev1word}
                  word={wordObject.word}
                  next1word={wordObject.next1word}
                  next2word={wordObject.next2word}
                  code={wordObject.code}
                  filter={wordObject.filter}
                  toggleEditor={wordObject.toggleEditor}
                  wordViewId={wordObject.wordViewId}/>
    );

    const editorDialog = (
        <EditorDialog wordViewId={wordObject.wordViewId}
                      toggleEditor={wordObject.toggleEditor}
                      handlerFilter={wordObject.handlerFilter}
                      wordView={wordView}/>
    );

    return (
        <div>
            {wordView}
            {wordObject.editorOpened && editorDialog}
        </div>

    );
});

WordController.propTypes = {
    wordObject: PropTypes.object
};

export default WordController;