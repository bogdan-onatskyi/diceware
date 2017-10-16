import React from 'react';

import AppRouter from "../routes";

describe("AppRouter component", () => {
    it("should match saved snapshot", () => {
        const wrapper = shallow(
            <AppRouter/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should not have any props", () => {
        expect(AppRouter.propTypes).toBe(undefined);
    });
});