import React from 'react';

import Menu from '../menu';

describe("Menu component", () => {
    it("should match saved snapshot", () => {
        const wrapper = shallow(
            <Menu/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should have 1 prop", () => {
        const propsStr = 'className';
        const props = [];
        for (let prop in Menu.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});