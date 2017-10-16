import React from 'react';

import ModalDialog from '../modal-dialog';
import Button from '../../button/button';

describe("ModalDialog component", () => {
    it("should match saved snapshot (type === 'sometype')", () => {
        const handleClose = jest.fn();
        const wrapper = shallow(
            <ModalDialog title="Title" isOpen={true} handlerClose={handleClose}>
                <span>text</span>
            </ModalDialog>
        );
        expect(wrapper).toMatchSnapshot();
        wrapper.find('.modal__title--close-button').simulate('click');
        expect(handleClose).toHaveBeenCalled();

        wrapper.find(Button).simulate('click');
        expect(handleClose).toHaveBeenCalled();
    });

    it("should have 3 props", () => {
        const propsStr = 'title isOpen handlerClose';
        const props = [];
        for (let prop in ModalDialog.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});
