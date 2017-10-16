import React from 'react';

import Index from '../index';
import passwordObject from '../../models/password-object';

describe("Index component", () => {
    it("should match saved snapshot", () => {
        passwordObject.wordArray.forEach((wordObject) => {
            wordObject.index = 0;
        });
        const stores = {passwordObject};

        const wrapper = shallow(
            <Index/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should not have any props", () => {
        expect(Index.propTypes).toBe(undefined);
    });
});