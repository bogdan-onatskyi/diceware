import React from 'react';
import PropTypes from 'prop-types';

import ModalDialog from '../_general/modal-dialog/modal-dialog';
import Button from '../_general/button/button';

const EditorDialog = ({toggleEditor, handleFilter, handleCountWords, filter, handleBackspace, wordView}) => {
    let key = 1;
    let countWords = 0;

    const alfabet = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
    const charButtuns = [] = alfabet.map((row, i) =>
        <div key={'row_' + i}>
            {row.split('').map((char) => {
                countWords = handleCountWords(char);
                return (
                    <Button type="char" disabled={countWords === 0}
                            onClick={handleFilter.bind(this, char)}
                            data-tip={countWords
                                ? "Добавить букву <" + char.toUpperCase() + "> к фильтру"
                                : ""}
                            key={'char_' + key++}>
                        {char}
                    </Button>
                );
            })}
        </div>
    );

    return (
        <ModalDialog title={"Редактор слова"} isOpen={true} handlerClose={toggleEditor}>
            {wordView}
            {charButtuns}
            <div>
                <Button type="back-space" disabled={filter === ''}
                        onClick={handleBackspace}
                        data-tip={filter !== ''
                            ? "Удалить последнюю букву фильтра"
                            : ""}>
                    backspace
                </Button>
            </div>
        </ModalDialog>
    );
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