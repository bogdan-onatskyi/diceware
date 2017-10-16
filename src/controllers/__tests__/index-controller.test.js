import React from 'react';

import IndexController from '../index-controller';
import passwordObject from '../../models/password-object';

describe("IndexController component", () => {
    it("should match saved snapshot", () => {
        passwordObject.wordArray.forEach((wordObject) => {
            wordObject.index = 0;
        });
        const wrapper = shallow(
            <IndexController passwordObject={passwordObject}/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should have 1 prop", () => {
        const propsStr = 'passwordObject';
        const props = [];
        for (let prop in IndexController.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});