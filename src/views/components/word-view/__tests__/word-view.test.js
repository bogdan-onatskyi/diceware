import React from 'react';

import WordView from '../word-view';
import WordObject from '../../../../models/word-object';

describe("Word-view component", () => {
    const wordObject = new WordObject(1);

    const setup = ({
                       handleClick = wordObject.handleClick,
                       handleDoubleClick = wordObject.handleDoubleClick,
                       handleWheel = wordObject.handleWheel,
                       prev2word = wordObject.prev2word,
                       prev1word = wordObject.prev1word,
                       word = wordObject.word,
                       next1word = wordObject.next1word,
                       next2word = wordObject.next2word,
                       code = wordObject.code,
                       filter = wordObject.filter,
                       toggleEditor = wordObject.toggleEditor,
                       wordViewId = wordObject.wordViewId
                   }) => {

        const wrapper = shallow(<WordView handleClick={handleClick}
                                          handleDoubleClick={handleDoubleClick}
                                          handleWheel={handleWheel}
                                          prev2word={prev2word}
                                          prev1word={prev1word}
                                          word={word}
                                          next1word={next1word}
                                          next2word={next2word}
                                          code={code}
                                          filter={filter}
                                          toggleEditor={toggleEditor}
                                          wordViewId={wordViewId}/>
        );
        return {wrapper};
    };

    it("should match saved snapshot (wordObject.filter === '')", () => {
        const {wrapper} = setup({
            prev2word: 'prev2word',
            prev1word: 'prev1word',
            word: 'word',
            next1word: 'next1word',
            next2word: 'next2word',
            code: '12345'
        });
        expect(wrapper).toMatchSnapshot();
    });

    it("should match saved snapshot (wordObject.filter === 'a')", () => {
        wordObject.filter = 'a';
        const {wrapper} = setup({});
        expect(wrapper).toMatchSnapshot();
    });

    it("should match saved snapshot (wordObject.filter === 'zom')", () => {
        wordObject.filter = 'zom';
        const {wrapper} = setup({});
        expect(wrapper).toMatchSnapshot();
    });

    it("should have 10 props", () => {
        const propsStr = 'handleClick handleWheel prev2word prev1word word next1word next2word code filter wordViewId';
        const props = [];
        for (let prop in WordView.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});