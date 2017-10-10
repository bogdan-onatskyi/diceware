import React from 'react';

import EditorDialog from '../editor-dialog';
import WordView from '../word-view';
import WordObject from '../../../../models/word-object';

describe("EditorDialog component", () => {
    const wordObject = new WordObject(1);

    const setup = ({toggleEditor, handleFilter, handleCountWords, filter, handleBackspace, wordView}) => {
        toggleEditor = toggleEditor ? toggleEditor : wordObject.toggleEditor;
        handleFilter = handleFilter ? handleFilter : wordObject.handleFilter;
        handleCountWords = handleCountWords ? handleCountWords : wordObject.handleCountWords;
        filter = filter ? filter : wordObject.filter;
        handleBackspace = handleBackspace ? handleBackspace : wordObject.handleBackspace;
        wordView = wordView ? wordView : <WordView/>;

        const wrapper = shallow(<EditorDialog toggleEditor={toggleEditor}
                                              handleFilter={handleFilter}
                                              handleCountWords={handleCountWords}
                                              filter={filter}
                                              handleBackspace={handleBackspace}
                                              wordView={wordView}/>);
        return {wrapper};
    };

    beforeEach(() => {
        wordObject.filter = '';
    });

    it("should match saved snapshot", () => {
        const {wrapper} = setup({});
        expect(wrapper).toMatchSnapshot();
    });


    it("should call handleFilter with a char when a char button is pressed", () => {
        const handleFilter = spyOn(wordObject, 'handleFilter').and.callThrough();
        const {wrapper} = setup({handleFilter});
        const alfabet = [] = 'qwertyuiopasdfghjklzxcvbnm'.split('');

        const charButtons = wrapper.find({type: 'char'});
        charButtons.forEach((button, i) => {
            button.simulate('click');
            expect(handleFilter).toHaveBeenCalledWith(alfabet[i]);
        });
    });

    it("should call handleBackspace when the back-space button is pressed", () => {
        wordObject.filter = 'aa';
        const handleBackspace = spyOn(wordObject, 'handleBackspace').and.callThrough();
        const {wrapper} = setup({handleBackspace});

        wrapper.find({type: 'back-space'}).simulate('click');
        expect(handleBackspace).toHaveBeenCalled();
        expect(wordObject.filter).toEqual('a');
    });

    it("should have 6 props", () => {
        const propsStr = 'toggleEditor handleFilter handleCountWords filter handleBackspace wordView';
        const props = [];
        for (let prop in EditorDialog.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});
