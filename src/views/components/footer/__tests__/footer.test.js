import React from 'react';

import Footer from '../footer';

describe("Footer component", () => {
    it("should match saved snapshot", () => {
        const wrapper = shallow(
            <Footer/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should have 1 prop", () => {
        const propsStr = 'className';
        const props = [];
        for (let prop in Footer.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});