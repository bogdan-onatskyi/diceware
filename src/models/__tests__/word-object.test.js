import Word from '../word-object';

describe("class Word", () => {
    const wordViewId = 1;
    const wordObject = new Word(wordViewId);
    let e = {
        target: {className: ''},
        deltaY: 0,
        preventDefault: () => null
    };

    const classNameFunc = (i, name) => {
        switch (i) {
            case 0:
                return `${name} and something else`;
            case 1:
                return `something else and ${name}`;
            case 2:
                return `something ${name} and something else`;
            case 3:
                return `something--${name} and something else`;
            case 4:
                return `something__${name} and something else`;
            default:
                return '';
        }
    };

    describe("wordObject.constructor(wordViewId)", () => {
        it("_filter should be an empty string", () => {
            expect(wordObject._filter).toBe('');
        });

        it("_indexFiltered should be an empty array", () => {
            expect(wordObject._indexFiltered.length).toBe(0);
        });

        it("_wordViewId starts with 1 (not with 0)", () => {
            expect(wordObject._wordViewId).toBe(wordViewId + 1);
        });

        it("editorOpened is false", () => {
            expect(wordObject.editorOpened).toBe(false);
        });

        it("toggleEditor should toggle editorOpened", () => {
            const editor = wordObject.editorOpened;

            wordObject.toggleEditor();
            expect(wordObject.editorOpened).toBe(!editor);

            wordObject.toggleEditor();
            expect(wordObject.editorOpened).toBe(editor);
        });

        it("_index should be a random index from wordList array", () => {
            expect(wordObject._index).toBeGreaterThan(-1);
            expect(wordObject._index).toBeLessThan(7776);
        });

        describe("handleClick should call appropriate function depending on component's className", () => {
            it("When className contains 'filter' or 'current' it should toggle wordObject.editorOpened", () => {
                spyOn(wordObject, 'toggleEditor').and.callThrough();

                ['filter', 'current'].forEach((name) => {
                    for (let editor, i = 0; i <= 4; i++) {
                        e.target.className = classNameFunc(i, name);
                        editor = wordObject.editorOpened;
                        wordObject.handleClick(e);
                        expect(wordObject.editorOpened).toBe(!editor);
                    }
                });
                expect(wordObject.toggleEditor.calls.count()).toEqual(10);
            });

            describe("Call resetWord", () => {
                const testResetWord = (name, indexes, args) => {
                    for (let i = 0; i <= 4; i++) {
                        e.target.className = classNameFunc(i, name);

                        indexes.forEach((index, i) => {
                            wordObject.index = index;
                            wordObject.handleClick(e);
                            expect(wordObject.resetWord).toHaveBeenCalledWith(args[i]);
                        });
                    }
                };

                it("When className contains 'prev2' it should set wordObject._index two steps back", () => {
                    spyOn(wordObject, 'resetWord').and.callThrough();
                    testResetWord(
                        'prev2',
                        [0, 1, 2, 7775],
                        [7774, 7775, 0, 7773]
                    );
                });

                it("When className contains 'prev1' it should set wordObject._index one step back", () => {
                    spyOn(wordObject, 'resetWord').and.callThrough();
                    testResetWord(
                        'prev1',
                        [0, 1, 1000, 7775],
                        [7775, 0, 999, 7774]
                    );
                });

                it("When className contains 'next1' it should set wordObject._index one step forward", () => {
                    spyOn(wordObject, 'resetWord').and.callThrough();
                    testResetWord(
                        'next1',
                        [0, 1, 1000, 7775],
                        [1, 2, 1001, 0]
                    );
                });

                it("When className contains 'next2' it should set wordObject._index two steps forward", () => {
                    spyOn(wordObject, 'resetWord').and.callThrough();
                    testResetWord(
                        'next2',
                        [0, 1, 7774, 7775],
                        [2, 3, 0, 1]
                    );
                });

                it("When className contains 'code' or 'reset-word' it should set wordObject._index to random value", () => {
                    spyOn(wordObject, 'resetWord').and.callThrough();

                    ['code', 'reset-word'].forEach((name) => {
                        for (let i = 0; i <= 4; i++) {
                            e.target.className = classNameFunc(i, name);

                            for (let j = 0; j < 100; j++) {
                                wordObject.handleClick(e);
                                expect(wordObject.resetWord.calls.mostRecent().args[0]).toBe(undefined);
                                expect(wordObject.index).toBeGreaterThan(-1);
                                expect(wordObject.index).toBeLessThan(7776);
                            }
                        }
                    });
                });
            });
        });

        describe("handleWheel should call appropriate function depending on component's className", () => {
            it("When className contains 'wv__word' it should call wordObject.plusWord or wordObject.minusWord " +
                "depending on e.deltaY", () => {
                spyOn(wordObject, 'minusWord').and.callThrough();
                spyOn(wordObject, 'plusWord').and.callThrough();

                for (let i = 0; i <= 4; i++) {
                    e.target.className = classNameFunc(i, 'anyname');
                    e.deltaY = -10;
                    wordObject.handleWheel(e);

                    e.deltaY = 10;
                    wordObject.handleWheel(e);
                }
                expect(wordObject.minusWord.calls.count()).toEqual(0);
                expect(wordObject.plusWord.calls.count()).toEqual(0);

                for (let i = 0; i <= 4; i++) {
                    e.target.className = classNameFunc(i, 'wv__word');
                    e.deltaY = -10;
                    wordObject.handleWheel(e);
                    expect(wordObject.minusWord).toHaveBeenCalled();

                    e.deltaY = 10;
                    wordObject.handleWheel(e);
                    expect(wordObject.plusWord).toHaveBeenCalled();
                }
                expect(wordObject.minusWord.calls.count()).toEqual(5);
                expect(wordObject.plusWord.calls.count()).toEqual(5);
            });
        });

        describe("handleFilter", () => {
            it("should add a char to wordObject.filter", () => {
                wordObject.filter = '';
                'abcdefghigklmnopqrstuvwxyz'.split('').forEach((char) => {
                    wordObject.handleFilter(char);
                });
                expect(wordObject.filter).toEqual('abcdefghigklmnopqrstuvwxyz');
            });
        });

        describe("handleCountWords", () => {
            it("should calculate the number of words start with wordObject.filter", () => {
                wordObject.filter = 'a';
                expect(wordObject.handleCountWords('b')).toEqual(24);

                wordObject.filter = '';
                expect(wordObject.handleCountWords('z')).toEqual(22);
            });
        });

        describe("handleBackspace", () => {
            it("should delete last char of wordObject.filter", () => {
                wordObject.filter = 'filter';
                wordObject.handleBackspace();
                expect(wordObject.filter).toEqual('filte');
            });
        });
    });
});