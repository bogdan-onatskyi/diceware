import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Button from '../button/button';
import ToolTip from '../tooltip/tooltip';

import './modal-dialog.scss';

const ModalDialog = ({title, isOpen, handlerClose, children}) => {
    return (
        <ReactModal isOpen={isOpen}
                    contentLabel="onRequestClose Example"
                    onRequestClose={handlerClose}
                    shouldCloseOnOverlayClick={false}
                    className="modal"
                    overlayClassName="overlay">

            <div className="modal__title">
                <span className="modal__title--content">{title}</span>
                <span className="modal__title--close-button"
                      data-tip="Закрыть"
                      onClick={handlerClose}>&nbsp;&times;&nbsp;</span>
            </div>
            <div className="modal__content">
                <div className="modal__content--children">
                    {children}
                    <Button type="dialog-close" onClick={handlerClose}>Закрыть</Button>
                </div>
            </div>
            <ToolTip/>
        </ReactModal>
    );
};

ModalDialog.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    handlerClose: PropTypes.func
};

export default ModalDialog;
