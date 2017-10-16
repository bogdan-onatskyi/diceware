import React from 'react';

import Password from '../password';
import passwordObject from '../../../../models/password-object';

describe("Password component", () => {
    const setup = ({
                       password = passwordObject.password,
                       isVariantsOpened = passwordObject.isVariantsOpened,
                       toggleVariantsOpened = passwordObject.toggleVariantsOpened
                   }) => {

        const wrapper = shallow(<Password password={password}
                                          isVariantsOpened={isVariantsOpened}
                                          toggleVariantsOpened={toggleVariantsOpened}/>
        );
        return {wrapper};
    };

    it("should match saved snapshot (passwordObject.isVariantsOpened === false)", () => {
        const {wrapper} = setup({
            password: 'word1 word2 word3',
            isVariantsOpened: false
        });
        expect(wrapper).toMatchSnapshot();
    });

    it("should match saved snapshot (passwordObject.isVariantsOpened === true)", () => {
        const {wrapper} = setup({
            password: 'word1 word2 word3',
            isVariantsOpened: true
        });
        expect(wrapper).toMatchSnapshot();
    });

    it("should toggle passwordObject.isVariantsOpened", () => {
        passwordObject.isVariantsOpened = false;
        const {wrapper} = setup({});

        wrapper.find('.password__before-text').simulate('click');
        expect(passwordObject.isVariantsOpened).toBe(true);

        wrapper.find('.password__before-text').simulate('click');
        expect(passwordObject.isVariantsOpened).toBe(false);
    });

    it("should have 3 props", () => {
        const propsStr = 'password isVariantsOpened toggleVariantsOpened';
        const props = [];
        for (let prop in Password.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});