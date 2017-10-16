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

    // if it is not filtered: wordObject.filter === ''   | // if it is filtered: wordObject.filter = 'ze'
    // 0 abacus             7770 zone                   | 0 7755 zealous
    // 1 abdomen            7771 zoning                 | 1 7756 zebra
    // 2 abdominal          7772 zookeeper              | 2 7757 zen
    // 3 abide              7773 zoologist              | 3 7758 zeppelin
    // 4 abiding            7774 zoology                | 4 7759 zero
    // 5 ability            7775 zoom                   | 5 7760 zestfully
    //                                                  | 6 7761 zesty

    const testInputProp = (inputProp, args, returnProp, results) => {
        args.forEach((arg, i) => {
            inputProp(arg);
            expect(returnProp()).toEqual(results[i]);
        });
    };

    const testOutputProp = (args, returnProp, results) => {
        args.forEach((arg, i) => {
            expect(returnProp(arg)).toEqual(results[i]);
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

        it("Word._wordViewId should start with 1 (not with 0)", () => {
            expect(wordObject._wordViewId).toBe(wordViewId + 1);
        });

        it("Word.editorOpened should be false", () => {
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
            // if it is not filtered
            expect(wordObject._index).toBeGreaterThanOrEqual(0);
            expect(wordObject._index).toBeLessThanOrEqual(7775);

            // if it is filtered
            wordObject.filter = 'ze';
            expect(wordObject._index).toBeGreaterThanOrEqual(7755);
            expect(wordObject._index).toBeLessThanOrEqual(7761);
        });

        describe("Word.handleClick(e)", () => {
            it("should do nothing if className contains 'disabled'", () => {
                spyOn(wordObject, 'resetWord').and.callThrough();
                for (let i = 0; i <= 4; i++) {
                    e.target.className = classNameFunc(i, 'prev1--disabled');
                    wordObject.handleClick(e);
                }
                expect(wordObject.resetWord.calls.count()).toEqual(0);
            });

            it("should toggle Word.editorOpened if className contains 'filter' or 'current'", () => {
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

            it("should set Word._index two steps back if className contains 'prev2'", () => {
                spyOn(wordObject, 'resetWord').and.callThrough();
                // if it is not filtered
                testResetWord(
                    'prev2',
                    [0, 1, 2, 7775],
                    [7774, 7775, 0, 7773]
                );

                // if it is filtered
                wordObject.filter = 'ze';
                testResetWord(
                    'prev2',
                    [0, 1, 7755, 7756, 7760, 7761],
                    [7760, 7760, 7760, 7761, 7758, 7759]
                );
            });

            it("should set Word._index one step back if className contains 'prev1' or 'minus'", () => {
                spyOn(wordObject, 'resetWord').and.callThrough();
                // if it is not filtered
                ['prev1', 'minus'].forEach((name) => {
                    testResetWord(
                        name,
                        [0, 1, 1000, 7775],
                        [7775, 0, 999, 7774]
                    );
                });

                // if it is filtered
                wordObject.filter = 'ze';
                ['prev1', 'minus'].forEach((name) => {
                    testResetWord(
                        name,
                        [0, 1, 7755, 7760, 7761],
                        [7761, 7761, 7761, 7759, 7760]
                    );
                });
            });

            it("should set Word._index one step forward if className contains 'next1' or 'plus'", () => {
                spyOn(wordObject, 'resetWord').and.callThrough();
                // if it is not filtered
                ['next1', 'plus'].forEach((name) => {
                    testResetWord(
                        name,
                        [0, 1, 1000, 7775],
                        [1, 2, 1001, 0]
                    );
                });

                // if it is filtered
                wordObject.filter = 'ze';
                ['next1', 'plus'].forEach((name) => {
                    testResetWord(
                        name,
                        [0, 1, 7755, 7760, 7761],
                        [7756, 7756, 7756, 7761, 7755]);
                });
            });

            it("should set Word._index two steps forward if className contains 'next2'", () => {
                spyOn(wordObject, 'resetWord').and.callThrough();
                // if it is not filtered
                testResetWord(
                    'next2',
                    [0, 1, 7774, 7775],
                    [2, 3, 0, 1]
                );

                // if it is filtered
                wordObject.filter = 'ze';
                testResetWord(
                    'next2',
                    [0, 1, 7755, 7760, 7761],
                    [7757, 7757, 7757, 7755, 7756]
                );
            });

            it("should set Word._index to a random value if className contains 'code' or 'reset-word'", () => {
                spyOn(wordObject, 'resetWord').and.callThrough();

                ['code', 'reset-word'].forEach((name) => {
                    for (let i = 0; i <= 4; i++) {
                        e.target.className = classNameFunc(i, name);

                        for (let j = 0; j < 10; j++) {
                            wordObject.handleClick(e);
                            expect(wordObject.resetWord.calls.mostRecent().args[0]).toBe(undefined);
                            expect(wordObject.index).toBeGreaterThanOrEqual(0);
                            expect(wordObject.index).toBeLessThanOrEqual(7775);
                        }
                    }
                });
            });
        });

        describe("Word.handleWheel(e)", () => {
            it("should do nothing if className contains 'disabled'", () => {
                spyOn(wordObject, 'resetWord').and.callThrough();
                for (let i = 0; i <= 4; i++) {
                    e.target.className = classNameFunc(i, 'disabled');
                    wordObject.handleClick(e);
                }
                expect(wordObject.resetWord.calls.count()).toEqual(0);
            });

            it("should change Word.index depending on e.deltaY if className contains 'wv__word'", () => {
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
                'abc'.split('').forEach((char) => {
                    wordObject.handleFilter(char);
                });
                expect(wordObject.filter).toEqual('ab'); // there is no word starts with 'abc'

                wordObject.filter = '';
                'aa'.split('').forEach((char) => {
                    wordObject.handleFilter(char);
                });
                expect(wordObject.filter).toEqual('a'); // there is no word starts with 'aa'

                wordObject.filter = '';
                'zooka'.split('').forEach((char) => {
                    wordObject.handleFilter(char);
                });
                expect(wordObject.filter).toEqual('zook'); // there is the only word (zookeeper) starts with 'zook'
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
            expect(wordObject.countWords('')).toEqual(7776);
        });
    });

    describe("getter Word.isFiltered()", () => {
        it("should return true or false depending on Word._filter is set up", () => {
            testInputProp((value) => wordObject._filter = value, ['', 'anyValue', undefined, null],
                () => wordObject.isFiltered, [false, true, false, false]
            );
        });
    });

    describe("getter Word.filter()", () => {
        it("should return the value of Word._filter", () => {
            testInputProp((value) => wordObject._filter = value, ['', 'anyValue', undefined],
                () => wordObject.filter, ['', 'anyValue', undefined]
            );
        });
    });

    describe("setter Word.filter(value)", () => {
        it("should set Word._filter to the value", () => {
            testInputProp((value) => wordObject.filter = value, ['', 'anyValue', undefined],
                () => wordObject._filter, ['', 'any', undefined]
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
            expect(wordObject.filter).toEqual('a');
            expect(wordObject._indexFiltered.length).toEqual(407);
            expect(wordObject._indexFiltered[0]).toEqual(0);
            expect(wordObject._index).toEqual(0);
        });
    });

    describe("getter Word.wordViewId()", () => {
        it("should return the value of Word._wordViewId", () => {
            testInputProp((value) => wordObject._wordViewId = value, [0, 1, 3, 'anyValue', undefined],
                () => wordObject.wordViewId, [0, 1, 3, 'anyValue', undefined]
            );
        });
    });

    describe("setter Word.wordViewId(value)", () => {
        it("should set Word._wordViewId to the value", () => {
            // _wordViewId should be number and greater or equal than 1, otherwise === 1
            testInputProp((value) => wordObject.wordViewId = value, [0, 1, 3, 'anyValue', undefined],
                () => wordObject._wordViewId, [1, 1, 3, 1, 1]
            );
        });
    });

    describe("getter Word.index()", () => {
        it("should return the value of Word._index", () => {
            testInputProp((value) => wordObject._index = value, [1, 100, 200],
                () => wordObject.index, [1, 100, 200]
            );
        });
    });

    describe("setter Word.index(value)", () => {
        it("should set Word._index to the value", () => {
            // if it is not filtered
            // _index should be greater or equal than 0 and less or equal than 7775, otherwise === 0
            testInputProp((value) => wordObject.index = value, [-10, 100, 10000],
                () => wordObject._index, [0, 100, 0]
            );

            // if it is filtered
            wordObject.filter = 'ze';
            // _index should be greater or equal than 7755 and less or equal than 7761, otherwise === 0
            testInputProp((value) => wordObject.index = value, [100, 7757, 10000],
                () => wordObject._index, [7755, 7757, 7755]
            );
        });
    });

    describe("getter Word.code()", () => {
        it("should return a 5-digit value of Word._index", () => {
            testInputProp((value) => wordObject.index = value, [0, 2, 7775],
                () => wordObject.code, ['11111', '11113', '66666']
            );
        });
    });

    describe("getter Word.prev2word()", () => {
        it("should return a word two steps back from (the current word == wordList[Word._index])", () => {
            // if it is not filtered
            testInputProp((value) => wordObject.index = value, [0, 1, 2, 5, 7774],
                () => wordObject.prev2word, ['ZOOLOGY', 'ZOOM', 'ABACUS', 'ABIDE', 'ZOOKEEPER']
            );

            // if it is filtered
            wordObject.filter = 'ze';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.prev2word, ['ZESTFULLY', 'ZESTY', 'ZEALOUS', 'ZERO']
            );
            // the one only word 'ZIT' index === 7767
            wordObject.filter = 'zit';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761, 7767],
                () => wordObject.prev2word, ['', '', '', '', '']
            );
        });
    });

    describe("getter Word.prev1word()", () => {
        it("should return a word one step back from (the current word == wordList[Word._index])", () => {
            // if it is not filtered
            testInputProp((value) => wordObject.index = value, [0, 1, 2, 5, 7774],
                () => wordObject.prev1word, ['ZOOM', 'ABACUS', 'ABDOMEN', 'ABIDING', 'ZOOLOGIST']
            );

            // if it is filtered
            wordObject.filter = 'ze';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.prev1word, ['ZESTY', 'ZEALOUS', 'ZEBRA', 'ZESTFULLY']
            );
            // the one only word 'ZIT' index === 7767
            wordObject.filter = 'zit';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761, 7767],
                () => wordObject.prev1word, ['', '', '', '', '']
            );
        });
    });

    describe("getter Word.prev2index()", () => {
        it("should return an index two steps back from (the current index == Word._index)", () => {
            // if it is not filtered
            testInputProp((value) => wordObject.index = value, [0, 1, 2, 5, 7774],
                () => wordObject.prev2index, [7774, 7775, 0, 3, 7772]
            );

            // if it is filtered
            wordObject.filter = 'ze';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.prev2index, [7760, 7761, 7755, 7759]
            );
            // the one only word 'ZIT' index === 7767
            wordObject.filter = 'zit';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761, 7767],
                () => wordObject.prev2index, [7767, 7767, 7767, 7767, 7767]
            );
        });
    });

    describe("getter Word.prev1index()", () => {
        it("should return an index one step back from (the current index == Word._index)", () => {
            // if it is not filtered
            testInputProp((value) => wordObject.index = value, [0, 1, 2, 5, 7774],
                () => wordObject.prev1index, [7775, 0, 1, 4, 7773]
            );

            // if it is filtered
            wordObject.filter = 'ze';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.prev1index, [7761, 7755, 7756, 7760]
            );
            // the one only word 'ZIT' index === 7767
            wordObject.filter = 'zit';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761, 7767],
                () => wordObject.prev1index, [7767, 7767, 7767, 7767, 7767]
            );
        });
    });

    describe("getter Word.word()", () => {
        it("should return the current word == wordList[Word._index]", () => {
            // if it is not filtered
            testInputProp((value) => wordObject.index = value, [0, 1, 2, 5, 7774],
                () => wordObject.word, ['ABACUS', 'ABDOMEN', 'ABDOMINAL', 'ABILITY', 'ZOOLOGY']
            );

            // if it is filtered
            wordObject.filter = 'ze';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.word, ['ZEALOUS', 'ZEBRA', 'ZEN', 'ZESTY']
            );
            // the one only word 'ZIT' index === 7767
            wordObject.filter = 'zit';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761, 7767],
                () => wordObject.word, ['ZIT', 'ZIT', 'ZIT', 'ZIT', 'ZIT']
            );

        });
    });

    describe("getter Word.next1index()", () => {
        it("should return an index one step forward from (the current index == Word._index)", () => {
            // if it is not filtered
            testInputProp((value) => wordObject.index = value, [0, 1, 2, 5, 7775],
                () => wordObject.next1index, [1, 2, 3, 6, 0]
            );

            // if it is filtered
            wordObject.filter = 'ze';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.next1index, [7756, 7757, 7758, 7755]
            );
            // the one only word 'ZIT' index === 7767
            wordObject.filter = 'zit';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761, 7767],
                () => wordObject.next1index, [7767, 7767, 7767, 7767, 7767]
            );
        });
    });

    describe("getter Word.next2index()", () => {
        it("should return an index two steps forward from (the current index == Word._index)", () => {
            // if it is not filtered
            testInputProp((value) => wordObject.index = value, [0, 1, 2, 5, 7775],
                () => wordObject.next2index, [2, 3, 4, 7, 1]
            );

            // if it is filtered
            wordObject.filter = 'ze';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.next2index, [7757, 7758, 7759, 7756]
            );
            // the one only word 'ZIT' index === 7767
            wordObject.filter = 'zit';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761, 7767],
                () => wordObject.next2index, [7767, 7767, 7767, 7767, 7767]
            );
        });
    });

    describe("getter Word.next1word()", () => {
        it("should return a word one step forward from (the current word == wordList[Word._index])", () => {
            // if it is not filtered
            testInputProp((value) => wordObject.index = value, [0, 1, 2, 7774, 7775],
                () => wordObject.next1word, ['ABDOMEN', 'ABDOMINAL', 'ABIDE', 'ZOOM', 'ABACUS']
            );

            // if it is filtered
            wordObject.filter = 'ze';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7761],
                () => wordObject.next1word, ['ZEBRA', 'ZEN', 'ZEPPELIN', 'ZEALOUS']
            );
            // the one only word 'ZIT' index === 7767
            wordObject.filter = 'zit';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7760, 7761, 7767],
                () => wordObject.next1word, ['', '', '', '', '']
            );
        });
    });

    describe("getter Word.next2word()", () => {
        it("should return a word two steps forward from (the current word == wordList[Word._index])", () => {
            // if it is not filtered
            testInputProp((value) => wordObject.index = value, [0, 1, 2, 7774, 7775],
                () => wordObject.next2word, ['ABDOMINAL', 'ABIDE', 'ABIDING', 'ABACUS', 'ABDOMEN']
            );

            // if it is filtered
            wordObject.filter = 'ze';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7760, 7761],
                () => wordObject.next2word, ['ZEN', 'ZEPPELIN', 'ZERO', 'ZEALOUS', 'ZEBRA']
            );

            // the one only word 'ZIT' index === 7767
            wordObject.filter = 'zit';
            testInputProp((value) => wordObject.index = value, [0, 7756, 7757, 7760, 7761, 7767],
                () => wordObject.next2word, ['', '', '', '', '', '']
            );
        });
    });

    describe("Word.resetWord(index = -1)", () => {
        it("should set up Word.index with index", () => {
            // if it is not filtered
            for (let i = 0; i < 100; i++) {
                wordObject.resetWord(); // it should set Word._index to a random value
                expect(wordObject._index).toBeGreaterThanOrEqual(0);
                expect(wordObject._index).toBeLessThanOrEqual(7775);
            }

            // if it is filtered
            wordObject.filter = 'ze';
            for (let i = 0; i < 100; i++) {
                wordObject.resetWord(); // it should set Word._index to a random value
                expect(wordObject._index).toBeGreaterThanOrEqual(7755);
                expect(wordObject._index).toBeLessThanOrEqual(7761);
            }

            // the one only word 'ZIT' index === 7767
            wordObject.filter = 'zit';
            for (let i = 0; i < 10; i++) {
                wordObject.resetWord(); // it should set Word._index to 7767
                expect(wordObject._index).toEqual(7767);
            }
        });
    });

    describe("static Word.indexToCode(index)", () => {
        it("should calculate a code (string) from an index (number)", () => {
            testOutputProp([0, 1, 1000, 5000, 7775],
                (value) => Word.indexToCode(value),
                ['11111', '11112', '15455', '46163', '66666']);
        });
    });

    describe("static Word.codeToIndex(code)", () => {
        it("should calculate an index (number) from a code (string)", () => {
            testOutputProp(['11111', '11112', '15455', '46163', '66666'],
                (value) => Word.codeToIndex(value),
                [0, 1, 1000, 5000, 7775]);
        });
    });

    describe("static Word.getRandomInt(min, max)", () => {
        it("should generate a random integer value (min <= value <= max)", () => {
            for (let i = 0; i < 10; i++) {
                let value = Word.getRandomInt(1, 10);
                expect(value).toBeGreaterThanOrEqual(1);
                expect(value).toBeLessThanOrEqual(10);
            }
        });
    });

    describe("static Word.getRandomCode()", () => {
        it("should generate a random 5-digit string value", () => {
            for (let i = 0; i < 10; i++) {
                Word.getRandomCode().split('').forEach((char) => {
                    let int = parseInt(char, 10);
                    expect(int).toBeGreaterThanOrEqual(1);
                    expect(int).toBeLessThanOrEqual(6);
                });
            }
        });
    });

    describe("getter Word.minIndex()", () => {
        it("should return the smallest value for Word.index", () => {
            // if it is not filtered
            expect(wordObject.minIndex).toEqual(0);

            // if it is filtered
            wordObject.filter = 'ze';
            expect(wordObject.minIndex).toEqual(7755);
        });
    });

    describe("getter Word.maxIndex()", () => {
        it("should return the biggest value for Word.index", () => {
            // if it is not filtered
            expect(wordObject.maxIndex).toEqual(7775);

            // if it is filtered
            wordObject.filter = 'ze';
            expect(wordObject.maxIndex).toEqual(7761);
        });
    });

    describe("Word.getPrevIndex(index)", () => {
        it("should return an index value one step back from its argument", () => {
            // if it is not filtered
            testOutputProp([0, 1, 2, 5, 7774],
                (value) => wordObject.getPrevIndex(value),
                [7775, 0, 1, 4, 7773]
            );

            // if it is filtered
            wordObject.filter = 'ze';
            testOutputProp([0, 7756, 7757, 7761],
                (value) => wordObject.getPrevIndex(value),
                [7761, 7755, 7756, 7760]
            );
        });
    });

    describe("Word.getRandomIndex()", () => {
        it("should return a random index value (minIndex <= value <= maxIndex)", () => {
            // if it is not filtered
            for (let i = 0; i < 10; i++) {
                let value = wordObject.getRandomIndex();
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThanOrEqual(7775);
            }

            // if it is filtered
            wordObject.filter = 'ze';
            for (let i = 0; i < 10; i++) {
                let value = wordObject.getRandomIndex();
                expect(value).toBeGreaterThanOrEqual(7755);
                expect(value).toBeLessThanOrEqual(7761);
            }
        });
    });

    describe("Word.getNextIndex(index)", () => {
        it("should return an index value one step forward from its argument", () => {
            // if it is not filtered
            testOutputProp([0, 1, 2, 5, 7775],
                (value) => wordObject.getNextIndex(value),
                [1, 2, 3, 6, 0]
            );

            // if it is filtered
            wordObject.filter = 'ze';
            testOutputProp([0, 1, 7755, 7756, 7757, 7761, 7780],
                (value) => wordObject.getNextIndex(value),
                [7755, 7755, 7756, 7757, 7758, 7755, 7755]
            );
        });
    });

    describe("Word.getWord(index)", () => {
        it("should return a word from the wordList array (word = wordList[index])", () => {
            // if it is not filtered
            testOutputProp([0, 1, 2, 5, 7775],
                (value) => wordObject.getWord(value),
                ['ABACUS', 'ABDOMEN', 'ABDOMINAL', 'ABILITY', 'ZOOM']
            );

            // if it is filtered
            wordObject.filter = 'ze';
            testOutputProp([0, 7756, 7757, 7761],
                (value) => wordObject.getWord(value),
                ['ZEALOUS', 'ZEBRA', 'ZEN', 'ZESTY']
            );
        });
    });
});