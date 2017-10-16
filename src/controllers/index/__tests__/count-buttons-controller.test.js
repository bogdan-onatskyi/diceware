import React from 'react';

import CountButtonsController from '../count-buttons-controller';
import passwordObject from '../../../models/password-object';

describe("CountButtonsController component", () => {
    it("should match saved snapshot", () => {
        passwordObject.wordArray.forEach((wordObject) => {
            wordObject.index = 0;
        });

        const wrapper = shallow(
            <CountButtonsController passwordObject={passwordObject}/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should have 1 prop", () => {
        const propsStr = 'passwordObject';
        const props = [];
        for (let prop in CountButtonsController.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});