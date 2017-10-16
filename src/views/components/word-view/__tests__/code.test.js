import React from 'react';

import Code from '../code';

describe('Code component', () => {
    it('should render a code enabled', () => {
        const wrapper = shallow(
            <Code mod="1" word="word"/>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.hasClass("wv__code--disabled")).toBe(false);
    });

    it('should render a code disabled', () => {
        const wrapper = shallow(
            <Code mod="1" word=""/>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.hasClass("wv__code--disabled")).toBe(true);
    });

    it('should have 3 props', () => {
        const propsStr = 'className mod word';
        const props = [];
        for (let prop in Code.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});
