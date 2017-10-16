import React from 'react';

import Info from "../info";

describe("Info component", () => {
    it("should match saved snapshot", () => {
        const wrapper = shallow(
            <Info/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should not have any props", () => {
        expect(Info.propTypes).toBe(undefined);
    });
});