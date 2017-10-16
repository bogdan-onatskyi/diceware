import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import WordView from '../../views/components/word-view/word-view';
import EditorDialog from '../../views/components/word-view/editor-dialog';

const WordController = observer(({wordObject}) => {

    const word = <WordView handleClick={wordObject.handleClick}
                           handleDoubleClick={wordObject.handleDoubleClick}
                           handleWheel={wordObject.handleWheel}
                           prev2word={wordObject.prev2word}
                           prev1word={wordObject.prev1word}
                           word={wordObject.word}
                           next1word={wordObject.next1word}
                           next2word={wordObject.next2word}
                           code={wordObject.code}
                           filter={wordObject.filter}
                           toggleEditor={wordObject.toggleEditor}
                           wordViewId={wordObject.wordViewId}/>;

    const editor = wordObject.editorOpened
        ? <EditorDialog toggleEditor={wordObject.toggleEditor}
                        handleFilter={wordObject.handleFilter}
                        handleCountWords={wordObject.handleCountWords}
                        filter={wordObject.filter}
                        handleBackspace={wordObject.handleBackspace}
                        wordView={word}/>
        : "";

    return (
        <div className="w-container">
            {word}
            {editor}
        </div>
    );
});

WordController.propTypes = {
    wordObject: PropTypes.object
};

export default WordController;