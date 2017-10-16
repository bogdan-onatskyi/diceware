import React from 'react';

import Contacts from "../contacts";

describe("Contacts component", () => {
    it("should match saved snapshot", () => {
        const wrapper = shallow(
            <Contacts/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should not have any props", () => {
        expect(Contacts.propTypes).toBe(undefined);
    });
});