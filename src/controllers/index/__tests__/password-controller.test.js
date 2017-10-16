import React from 'react';

import PasswordController from '../password-controller';
import passwordObject from '../../../models/password-object';

describe("PasswordController component", () => {
    it("should match saved snapshot (passwordObject.isVariantsOpened === false)", () => {
        passwordObject.wordArray.forEach((wordObject) => {
            wordObject.index = 0;
        });

        const wrapper = shallow(
            <PasswordController passwordObject={passwordObject}/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should match saved snapshot (passwordObject.isVariantsOpened === true)", () => {
        passwordObject.wordArray.forEach((wordObject) => {
            wordObject.index = 0;
        });
        passwordObject.isVariantsOpened = true;

        const wrapper = shallow(
            <PasswordController passwordObject={passwordObject}/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should have 1 prop", () => {
        const propsStr = 'passwordObject';
        const props = [];
        for (let prop in PasswordController.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});