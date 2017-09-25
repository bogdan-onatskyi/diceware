import React from 'react';
import PropTypes from 'prop-types';

import ModalDialog from '../_general/modal-dialog/modal-dialog';
import Button from '../_general/button/button';

const EditorDialog = ({wordViewId, toggleEditor, handlerFilter, wordView}) => {

    let key = 1;
    const alfabet = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

    const letterButtuns = [] = alfabet.map((row, i) =>
        <div key={'row_' + i}>
            {row.split('').map((letter) =>
                <Button type="letter" text={letter} key={'letter_' + key++}
                        onClick={handlerFilter.bind(this, letter)}
                />
            )}
        </div>
    );

    return (
        <ModalDialog title={"Редактор " + wordViewId + " слова в пароле"}
                     isOpen={true}
                     handlerClose={toggleEditor}>

            {wordView}
            {letterButtuns}
        </ModalDialog>);
};

EditorDialog.propTypes = {
    wordViewId: PropTypes.number,
    toggleEditor: PropTypes.func,
    handlerFilter: PropTypes.func,
    wordView: PropTypes.element
};

export default EditorDialog;