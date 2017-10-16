import React from 'react';

import EditorDialog from '../editor-dialog';
import WordView from '../word-view';
import WordObject from '../../../../models/word-object';

describe("EditorDialog component", () => {
    const wordObject = new WordObject(1);

    const setup = ({
                       toggleEditor = wordObject.toggleEditor,
                       handleFilter = wordObject.handleFilter,
                       handleCountWords = wordObject.handleCountWords,
                       filter = wordObject.filter,
                       handleBackspace = wordObject.handleBackspace,
                       wordView = <WordView/>
                   }) => {

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
        const {wrapper} = setup({handleFilter: handleFilter});
        const alfabet = 'qwertyuiopasdfghjklzxcvbnm'.split('');

        const charButtons = wrapper.find({type: 'char'});
        charButtons.forEach((button, i) => {
            button.simulate('click');
            expect(handleFilter).toHaveBeenCalledWith(alfabet[i]);
        });
    });

    it("should call handleBackspace when the back-space button is pressed", () => {
        wordObject.filter = 'any';
        const handleBackspace = spyOn(wordObject, 'handleBackspace').and.callThrough();
        const {wrapper} = setup({handleBackspace: handleBackspace});

        wrapper.find({type: 'back-space'}).simulate('click');
        expect(handleBackspace).toHaveBeenCalled();
        expect(wordObject.filter).toEqual('an');
    });

    it("should have 6 props", () => {
        const propsStr = 'toggleEditor handleFilter handleCountWords filter handleBackspace wordView';
        const props = [];
        for (let prop in EditorDialog.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});
