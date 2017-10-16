import React from 'react';

import WordController from '../word-controller';
import Word from '../../../models/word-object';

describe("WordController component", () => {
    it("should match saved snapshot (wordObject.editorOpened === false)", () => {
        const wordObject = new Word(1);
        wordObject.index = 0;

        const wrapper = shallow(
            <WordController wordObject={wordObject}/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should match saved snapshot (wordObject.editorOpened === true)", () => {
        const wordObject = new Word(1);
        wordObject.index = 0;
        wordObject.editorOpened = true;

        const wrapper = shallow(
            <WordController wordObject={wordObject}/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should have 1 prop", () => {
        const propsStr = 'wordObject';
        const props = [];
        for (let prop in WordController.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});