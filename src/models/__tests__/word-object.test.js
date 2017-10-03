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

    // if it isn't filtered: wordObject.filter === ''   | // if it's filtered: wordObject.filter = 'ze'
    // 0 abacus             7770 zone                   | 0 7755 zealous
    // 1 abdomen            7771 zoning                 | 1 7756 zebra
    // 2 abdominal          7772 zookeeper              | 2 7757 zen
    // 3 abide              7773 zoologist              | 3 7758 zeppelin
    // 4 abiding            7774 zoology                | 4 7759 zero
    // 5 ability            7775 zoom                   | 5 7760 zestfully
    //                                                  | 6 7761 zesty

    const testProp = (inputProp, args, returnProp, results) => {
        args.forEach((arg, i) => {
            inputProp(arg);
            expect(returnProp()).toEqual(results[i]);
        });
    };

    beforeEach(() => {
        wordObject.filter = '';
    });

    describe("Word.constructor(wordViewId)", () => {
        it("Word._filter should be an empty string", () => {
            expect(wordObject._filter).toBe('');
        });

        it("Word._indexFiltered should be an empty array", () => {
            expect(wordObject._indexFiltered.length).toBe(0);
        });

        it("Word._wordViewId starts with 1 (not with 0)", () => {
            expect(wordObject._wordViewId).toBe(wordViewId + 1);
        });

        it("Word.editorOpened is false", () => {
            expect(wordObject.editorOpened).toBe(false);
        });

        it("Word.toggleEditor should toggle Word.editorOpened", () => {
            const editor = wordObject.editorOpened;

            wordObject.toggleEditor();
            expect(wordObject.editorOpened).toBe(!editor);

            wordObject.toggleEditor();
            expect(wordObject.editorOpened).toBe(editor);
        });

        it("Word._index should be a random index from the wordList array", () => {
            // if it isn't filtered
            expect(wordObject._index).toBeGreaterThan(-1);
            expect(wordObject._index).toBeLessThan(7776);

            // if it's filtered
            wordObject.filter = 'ze';
            expect(wordObject._index).toBeGreaterThan(7754);
            expect(wordObject._index).toBeLessThan(7762);
        });

        describe("Word.handleClick(e)", () => {
            it("When className contains 'filter' or 'current' it should toggle Word.editorOpened", () => {
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

            it("When className contains 'prev2' it should set Word._index two steps back", () => {
                spyOn(wordObject, 'resetWord').and.callThrough();
                // if it isn't filtered
                testResetWord(
                    'prev2',
                    [0, 1, 2, 7775],
                    [7774, 7775, 0, 7773]
                );

                // if it's filtered
                wordObject.filter = 'ze';
                testResetWord(
                    'prev2',
                    [0, 1, 7755, 7756, 7760, 7761],
                    [7760, 7760, 7760, 7761, 7758, 7759]
                );
            });

            it("When className contains 'prev1' it should set Word._index one step back", () => {
                spyOn(wordObject, 'resetWord').and.callThrough();
                // if it isn't filtered
                testResetWord(
                    'prev1',
                    [0, 1, 1000, 7775],
                    [7775, 0, 999, 7774]
                );

                // if it's filtered
                wordObject.filter = 'ze';
                testResetWord(
                    'prev1',
                    [0, 1, 7755, 7760, 7761],
                    [7761, 7761, 7761, 7759, 7760]
                );
            });

            it("When className contains 'next1' it should set Word._index one step forward", () => {
                spyOn(wordObject, 'resetWord').and.callThrough();
                // if it isn't filtered
                testResetWord(
                    'next1',
                    [0, 1, 1000, 7775],
                    [1, 2, 1001, 0]
                );

                // if it's filtered
                wordObject.filter = 'ze';
                testResetWord(
                    'next1',
                    [0, 1, 7755, 7760, 7761],
                    [7756, 7756, 7756, 7761, 7755]
                );
            });

            it("When className contains 'next2' it should set Word._index two steps forward", () => {
                spyOn(wordObject, 'resetWord').and.callThrough();
                // if it isn't filtered
                testResetWord(
                    'next2',
                    [0, 1, 7774, 7775],
                    [2, 3, 0, 1]
                );

                // if it's filtered
                wordObject.filter = 'ze';
                testResetWord(
                    'next2',
                    [0, 1, 7755, 7760, 7761],
                    [7757, 7757, 7757, 7755, 7756]
                );
            });

            it("When className contains 'code' or 'reset-word' it should set Word._index to a random value", () => {
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

        describe("Word.handleWheel(e)", () => {
            it("When className contains 'wv__word' it should change Word.index depending on e.deltaY", () => {
                spyOn(wordObject, 'resetWord').and.callThrough();

                for (let i = 0; i <= 4; i++) {
                    e.target.className = classNameFunc(i, 'anyname');
                    e.deltaY = -10;
                    wordObject.handleWheel(e);

                    e.deltaY = 10;
                    wordObject.handleWheel(e);
                }
                expect(wordObject.resetWord.calls.count()).toEqual(0);

                for (let i = 0; i <= 4; i++) {
                    e.target.className = classNameFunc(i, 'wv__word');
                    e.deltaY = -10;
                    wordObject.handleWheel(e);
                    expect(wordObject.resetWord).toHaveBeenCalled();

                    e.deltaY = 10;
                    wordObject.handleWheel(e);
                    expect(wordObject.resetWord).toHaveBeenCalled();
                }
                expect(wordObject.resetWord.calls.count()).toEqual(10);
            });
        });

        describe("Word.handleFilter(char)", () => {
            it("should add a char to wordObject.filter", () => {
                wordObject.filter = '';
                'abcdefghigklmnopqrstuvwxyz'.split('').forEach((char) => {
                    wordObject.handleFilter(char);
                });
                expect(wordObject.filter).toEqual('abcdefghigklmnopqrstuvwxyz');
            });
        });

        describe("Word.handleCountWords(char)", () => {
            it("should calculate the number of words each start with (Word.filter + char)", () => {
                wordObject.filter = 'a';
                expect(wordObject.handleCountWords('b')).toEqual(24); // it finds words start with 'ab'

                wordObject.filter = 'a';
                expect(wordObject.handleCountWords('a')).toEqual(0); // it finds words start with 'aa'

                wordObject.filter = '';
                expect(wordObject.handleCountWords('z')).toEqual(22); // it finds words start with 'z'
            });
        });

        describe("Word.handleBackspace()", () => {
            it("should delete the last char of wordObject.filter", () => {
                wordObject.filter = 'filter';
                wordObject.handleBackspace();
                expect(wordObject.filter).toEqual('filte');
            });
        });
    });

    describe("Word.countWords(startsWith)", () => {
        it("should return the number of words each start with (startsWith)", () => {
            expect(wordObject.countWords('ab')).toEqual(24);
            expect(wordObject.countWords('ver')).toEqual(12);
            expect(wordObject.countWords('z')).toEqual(22);
        });
    });

    describe("getter Word.isFiltered()", () => {
        it("should return true or false depending on Word._filter is set up", () => {
            testProp((value) => wordObject._filter = value, ['', 'anyValue', undefined, null],
                () => wordObject.isFiltered, [false, true, false, false]
            );
        });
    });

    describe("getter Word.filter()", () => {
        it("should return the value of Word._filter", () => {
            testProp((value) => wordObject._filter = value, ['', 'anyValue', undefined],
                () => wordObject.filter, ['', 'anyValue', undefined]
            );
        });
    });

    describe("setter Word.filter(value)", () => {
        it("should set Word._filter to the value", () => {
            testProp((value) => wordObject.filter = value, ['', 'anyValue', undefined],
                () => wordObject._filter, ['', 'anyValue', undefined]
            );
        });
    });

    describe("Word.setWordListFiltered()", () => {
        it("should set up Word._indexFiltered array depending on Word.isFiltered", () => {
            wordObject.setWordListFiltered();
            expect(wordObject.isFiltered).toBe(false);
            expect(wordObject._indexFiltered.length).toEqual(0);
            expect(wordObject._indexFiltered.length).toEqual(0);

            wordObject.filter = 'ze';
            wordObject.setWordListFiltered();
            expect(wordObject.isFiltered).toBe(true);
            expect(wordObject._indexFiltered.length).toEqual(7);
            expect(wordObject._indexFiltered[0]).toEqual(7755);
            expect(wordObject._indexFiltered[3]).toEqual(7758);
            expect(wordObject._indexFiltered[6]).toEqual(7761);
            expect(wordObject._index).toEqual(7755);

            wordObject.filter = 'aa';
            wordObject.setWordListFiltered();
            expect(wordObject.isFiltered).toBe(true);
            expect(wordObject._indexFiltered.length).toEqual(1);
            expect(wordObject._indexFiltered[0]).toEqual(0);
            expect(wordObject._index).toEqual(0);
        });
    });

    describe("getter Word.wordViewId()", () => {
        it("should return the value of Word._wordViewId", () => {
            testProp((value) => wordObject._wordViewId = value, [0, 1, 3, 'anyValue', undefined],
                () => wordObject.wordViewId, [0, 1, 3, 'anyValue', undefined]
            );
        });
    });

    describe("setter Word.wordViewId(value)", () => {
        it("should set Word._wordViewId to the value", () => {
            // _wordViewId should be number and greater than 0, otherwise === 1
            testProp((value) => wordObject.wordViewId = value, [0, 1, 3, 'anyValue', undefined],
                () => wordObject._wordViewId, [1, 1, 3, 1, 1]
            );
        });
    });

    describe("getter Word.index()", () => {
        it("should return the value of Word._index", () => {
            testProp((value) => wordObject._index = value, [1, 100, 200],
                () => wordObject.index, [1, 100, 200]
            );
        });
    });

    describe("setter Word.index(value)", () => {
        it("should set Word._index to the value", () => {
            // if it isn't filtered
            // _index should be greater than -1 and less than 7776, otherwise === 0
            testProp((value) => wordObject.index = value, [-10, 100, 10000],
                () => wordObject._index, [0, 100, 0]
            );

            // if it's filtered
            wordObject.filter = 'ze';
            // _index should be greater than 7754 and less than 7762, otherwise === 0
            testProp((value) => wordObject.index = value, [100, 7757, 10000],
                () => wordObject._index, [7755, 7757, 7755]
            );
        });
    });

    describe("getter Word.code()", () => {
        it("should return a 5-digit value of Word._index", () => {
            testProp((value) => wordObject.index = value, [0, 2, 7775],
                () => wordObject.code, ['11111', '11113','66666']
            );
        });
    });

    describe("getter Word.prev2word()", () => {
        it("should return the word two steps back from the (current word == wordList[Word._index])", () => {
            // if it isn't filtered
            testProp((value) => wordObject.index = value, [0, 1, 2, 5, 7774],
                () => wordObject.prev2word, ['ZOOLOGY', 'ZOOM', 'ABACUS', 'ABIDE', 'ZOOKEEPER']
            );

            // if it's filtered
            wordObject.filter = 'ze';
            testProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.prev2word, ['ZESTFULLY', 'ZESTY', 'ZEALOUS', 'ZERO']
            );
        });
    });

    describe("getter Word.prev1word()", () => {
        it("should return the word one step back from the (current word == wordList[Word._index])", () => {
            // if it isn't filtered
            testProp((value) => wordObject.index = value, [0, 1, 2, 5, 7774],
                () => wordObject.prev1word, ['ZOOM', 'ABACUS', 'ABDOMEN', 'ABIDING', 'ZOOLOGIST']
            );

            // if it's filtered
            wordObject.filter = 'ze';
            testProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.prev1word, ['ZESTY', 'ZEALOUS', 'ZEBRA', 'ZESTFULLY']
            );
        });
    });

    describe("getter Word.prev2index()", () => {
        it("should return the index two steps back from the (current index == Word._index)", () => {
            // if it isn't filtered
            testProp((value) => wordObject.index = value, [0, 1, 2, 5, 7774],
                () => wordObject.prev2index, [7774, 7775, 0, 3, 7772]
            );

            // if it's filtered
            wordObject.filter = 'ze';
            testProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.prev2index, [7760, 7761, 7755, 7759]
            );
        });
    });

    describe("getter Word.prev1index()", () => {
        it("should return the index one step back from the (current index == Word._index)", () => {
            // if it isn't filtered
            testProp((value) => wordObject.index = value, [0, 1, 2, 5, 7774],
                () => wordObject.prev1index, [7775, 0, 1, 4, 7773]
            );

            // if it's filtered
            wordObject.filter = 'ze';
            testProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.prev1index, [7761, 7755, 7756, 7760]
            );
        });
    });

    describe("getter Word.word()", () => {
        it("should return the (current word == wordList[Word._index])", () => {
            // if it isn't filtered
            testProp((value) => wordObject.index = value, [0, 1, 2, 5, 7774],
                () => wordObject.word, ['ABACUS', 'ABDOMEN', 'ABDOMINAL', 'ABILITY', 'ZOOLOGY']
            );

            // if it's filtered
            wordObject.filter = 'ze';
            testProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.word, ['ZEALOUS', 'ZEBRA', 'ZEN', 'ZESTY']
            );
        });
    });

    describe("getter Word.next1index()", () => {
        it("should return the index one step forward from the (current index == Word._index)", () => {
            // if it isn't filtered
            testProp((value) => wordObject.index = value, [0, 1, 2, 5, 7775],
                () => wordObject.next1index, [1, 2, 3, 6, 0]
            );

            // if it's filtered
            wordObject.filter = 'ze';
            testProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.next1index, [7756, 7757, 7758, 7755]
            );
        });
    });

    describe("getter Word.next2index()", () => {
        it("should return the index two steps forward from the (current index == Word._index)", () => {
            // if it isn't filtered
            testProp((value) => wordObject.index = value, [0, 1, 2, 5, 7775],
                () => wordObject.next2index, [2, 3, 4, 7, 1]
            );

            // if it's filtered
            wordObject.filter = 'ze';
            testProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.next2index, [7757, 7758, 7759, 7756]
            );
        });
    });

    describe("getter Word.next1word()", () => {
        it("should return the word one step forward from the (current word == wordList[Word._index])", () => {
            // if it isn't filtered
            testProp((value) => wordObject.index = value, [0, 1, 2, 7774, 7775],
                () => wordObject.next1word, ['ABDOMEN', 'ABDOMINAL', 'ABIDE', 'ZOOM', 'ABACUS']
            );

            // if it's filtered
            wordObject.filter = 'ze';
            testProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.next1word, ['ZEBRA', 'ZEN', 'ZEPPELIN', 'ZEALOUS']
            );
        });
    });

    describe("getter Word.next2word()", () => {
        it("should return the word two steps forward from the (current word == wordList[Word._index])", () => {
            // if it isn't filtered
            testProp((value) => wordObject.index = value, [0, 1, 2, 7774, 7775],
                () => wordObject.next2word, ['ABDOMINAL', 'ABIDE', 'ABIDING', 'ABACUS', 'ABDOMEN']
            );

            // if it's filtered
            wordObject.filter = 'ze';
            testProp((value) => wordObject.index = value, [0, 7756, 7757, 7760, 7761],
                () => wordObject.next2word, ['ZEN', 'ZEPPELIN', 'ZERO', 'ZEALOUS', 'ZEBRA']
            );
        });
    });
});

