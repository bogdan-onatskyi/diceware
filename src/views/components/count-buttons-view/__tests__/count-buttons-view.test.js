import React from 'react';

import CountButtonsView from '../count-buttons-view';
import {Password} from '../../../../models/password-object';

describe("CountButtonsView component", () => {
    const passwordObject = new Password();

    const setup = ({
                       usedWords = passwordObject.usedWords,
                       maxWords = passwordObject.maxWords,
                       handleUsedWords = passwordObject.handleUsedWords,
                       handleResetAllWords = passwordObject.handleResetAllWords
                   }) => {

        const wrapper = shallow(<CountButtonsView usedWords={usedWords}
                                                  maxWords={maxWords}
                                                  handleUsedWords={handleUsedWords}
                                                  handleResetAllWords={handleResetAllWords}/>
        );
        return {wrapper};
    };

    it("should match saved snapshot", () => {
        const {wrapper} = setup({});
        expect(wrapper).toMatchSnapshot();
    });

    it("should set passwordObject.UsedWords", () => {
        const handleUsedWords = spyOn(passwordObject, 'handleUsedWords').and.callThrough();
        const {wrapper} = setup({handleUsedWords: handleUsedWords});

        wrapper.find({type: "count"}).forEach((button, i) => {
            button.simulate('click');
            expect(passwordObject.usedWords).toEqual(i + 1);
            expect(handleUsedWords).toHaveBeenCalledWith(i + 1);
        });
    });

    it("should reset all words in passwordObject.wordArray", () => {
        const handleResetAllWords = spyOn(passwordObject, 'handleResetAllWords').and.callThrough();
        const {wrapper} = setup({handleResetAllWords: handleResetAllWords});

        const wordArray = passwordObject.wordArray.map((wordObject) => wordObject.word);

        wrapper.find({type: "reset-all-words"}).simulate('click');
        expect(handleResetAllWords).toHaveBeenCalled();

        wordArray.forEach((word, i) => {
            expect(passwordObject.wordArray[i]).not.toEqual(word);
        });
    });

    it("should have 4 props", () => {
        const propsStr = 'usedWords maxWords handleUsedWords handleResetAllWords';
        const props = [];
        for (let prop in CountButtonsView.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});