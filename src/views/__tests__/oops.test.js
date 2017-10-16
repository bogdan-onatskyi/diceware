import React from 'react';

import Oops from "../oops";

describe("Oops component", () => {
    it("should match saved snapshot", () => {
        const wrapper = shallow(
            <Oops/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should not have any props", () => {
        expect(Oops.propTypes).toBe(undefined);
    });
});