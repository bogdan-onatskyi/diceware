import React from 'react';

import Word from '../word';

describe("Word component", () => {
    it("should render a word with tooltip", () => {
        const wrapper = shallow(
            <Word mod="prev1" word="word" tip="Выбрать это слово"/>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('div').prop('data-tip')).toEqual("Выбрать это слово");
    });

    it("should render a word without tooltip", () => {
        const wrapper = shallow(
            <Word mod="prev1" word="" tip="Выбрать это слово"/>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('div').prop('data-tip')).toEqual("");
    });

    it("should have 4 props", () => {
        const propsStr = 'className mod word tip';
        const props = [];
        for (let prop in Word.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});
