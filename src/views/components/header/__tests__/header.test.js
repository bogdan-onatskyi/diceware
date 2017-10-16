import React from 'react';

import Header from '../header';

describe("Header component", () => {
    it("should match saved snapshot", () => {
        const wrapper = shallow(
            <Header text="Заголовок"/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should have 2 props", () => {
        const propsStr = 'className text';
        const props = [];
        for (let prop in Header.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});