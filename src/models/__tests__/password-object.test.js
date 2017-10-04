import passwordObject from '../password-object';
import Word from '../word-object';

describe("class Password", () => {

    beforeEach(() => {
        passwordObject.init();
    });

    describe("Password.constructor()", () => {
        it("Password.isVariantsOpened should be equal false", () => {
            expect(passwordObject.isVariantsOpened).toBe(false);
        });

        it("Password.init should initiate _usedWords, _maxWords and wordArray", () => {
            const test = (initFunc, usedWords, maxWords) => {
                initFunc();
                expect(passwordObject.usedWords).toEqual(usedWords);
                expect(passwordObject.maxWords).toEqual(maxWords);
                for (let i = 0; i < usedWords; i++) {
                    expect(passwordObject.wordArray[i] instanceof Word).toBe(true);
                }
            };
            test(() => passwordObject.init(), 5, 8);
            test(() => passwordObject.init(2, 5), 2, 5);
            test(() => passwordObject.init(3, 7), 3, 7);
        });

        it("Password.separators should contain 6 elements", () => {
            expect(passwordObject.separators.length).toEqual(6);
        });

        it("Password.caps should be equal 2^6-1 = 63", () => {
            expect(passwordObject.caps).toEqual(63);
        });

        xit("Password.isCAPS(i) should return 1 if i's bit is set", () => {
            for (let i = 0; i < 6; i++) {
                expect(passwordObject.isCAPS(i)).toEqual(2);
            }
        });

        xit("Password.toggleCAPS(i) should set i's bit of Password.caps", () => {
            passwordObject.caps = 0;
            expect(passwordObject.toggleCAPS(1)).toEqual(2);
            expect(passwordObject.toggleCAPS(2)).toEqual(4);
        });

        it("Password.toggleVariantsOpened() should toggle Password.isVariantsOpened", () => {
            passwordObject.isVariantsOpened = false;

            passwordObject.toggleVariantsOpened();
            expect(passwordObject.isVariantsOpened).toBe(true);

            passwordObject.toggleVariantsOpened();
            expect(passwordObject.isVariantsOpened).toBe(false);
        });

        it("Password.handleUsedWords(value) should set Password.usedWords", () => {
            passwordObject.usedWords = 2;
            expect(passwordObject.wordArray.length).toEqual(2);

            passwordObject.handleUsedWords(3);
            expect(passwordObject.usedWords).toEqual(3);
            expect(passwordObject.wordArray.length).toEqual(3);
        });

        it("Password.handleResetAllWords() should reset each word from wordArray", () => {
            const array = [];
            passwordObject.wordArray.forEach((wordObject, i) => {
                array[i] = wordObject.word;
            });

            passwordObject.handleResetAllWords();

            passwordObject.wordArray.forEach((wordObject, i) => {
                expect(array[i] === wordObject.word).toBe(false);
            });
        });

        it("Password.separatedPassword(separator, i) should generate password with separators " +
            "using words from wordArray", () => {
            const array = [];
            passwordObject.wordArray.forEach((wordObject, i) => {
                array[i] = wordObject.word;
            });
            const str = array.join('-').toUpperCase();

            passwordObject.separatedPassword('-');

            expect(str === passwordObject.separatedPassword('-')).toBe(true);
        });
    });
});