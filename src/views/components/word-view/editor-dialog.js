import React from 'react';
import PropTypes from 'prop-types';

import ModalDialog from '../_general/modal-dialog/modal-dialog';
import Button from '../_general/button/button';

const EditorDialog = ({toggleEditor, handleFilter, handleCountWords, filter, handleBackspace, wordView}) => {
    let key = 1;
    const alfabet = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

    const charButtuns = [] = alfabet.map((row, i) =>
        <div key={'row_' + i}>
            {row.split('').map((char) =>
                <Button type="char" text={char} key={'char_' + key++}
                        disabled={handleCountWords(char) === 0}
                        onClick={handleFilter.bind(this, char)}/>
            )}
        </div>
    );

    return (
        <ModalDialog title={"Редактор слова"} isOpen={true} handlerClose={toggleEditor}>
            {wordView}
            {charButtuns}
            <div>
                <Button type="back-space" text="backspace"
                        disabled={filter === ''}
                        onClick={handleBackspace}/>
            </div>
        </ModalDialog>);
};

EditorDialog.propTypes = {
    toggleEditor: PropTypes.func,
    handleFilter: PropTypes.func,
    handleCountWords: PropTypes.func,
    filter: PropTypes.string,
    handleBackspace: PropTypes.func,
    wordView: PropTypes.element
};

export default EditorDialog;