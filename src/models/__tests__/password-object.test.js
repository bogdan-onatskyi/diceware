import passwordObject from '../password-object';
import Word from '../word-object';

describe("class Password", () => {

    beforeEach(() => {
        passwordObject.init();
    });

    describe("Password.constructor()", () => {
        it("Password.isVariantsOpened should be false", () => {
            expect(passwordObject.isVariantsOpened).toBe(false);
        });

        it("Password.init should initiate _usedWords, _maxWords and wordArray", () => {
            const test = (initFunc, usedWords, maxWords) => {
                initFunc();
                expect(passwordObject.usedWords).toEqual(usedWords);
                expect(passwordObject.maxWords).toEqual(maxWords);
                expect(passwordObject.wordArray.length).toEqual(usedWords);
                passwordObject.wordArray.forEach((wordObject) => {
                    expect(wordObject instanceof Word).toBe(true);
                });
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

        it("Password.isCAPS(i) should return a value > 0 if i's bit is set", () => {
            const caps = passwordObject.caps;

            for (let i = 0; i < 6; i++) {
                expect(passwordObject.isCAPS(i)).toBeGreaterThan(0);
            }

            passwordObject.caps = 0;
            for (let i = 0; i < 6; i++) {
                expect(passwordObject.isCAPS(i)).toEqual(0);
            }

            passwordObject.caps = caps;
        });

        it("Password.toggleCAPS(i) should set i's bit of Password.caps", () => {
            passwordObject.caps = 0;
            passwordObject.toggleCAPS(1); // passwordObject.caps = passwordObject.caps + 2^1 = 2
            expect(passwordObject.caps).toEqual(2);

            passwordObject.toggleCAPS(2); // passwordObject.caps = passwordObject.caps + 2^2 = 2 + 4 = 6
            expect(passwordObject.caps).toEqual(6);
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
                array[i] = wordObject.word; // wordObject.word is an upperCased word
            });
            const str = array.join('-');

            passwordObject.separatedPassword('-');

            expect(str === passwordObject.separatedPassword('-')).toBe(true);
            expect(str.toLowerCase() === passwordObject.separatedPassword('-', false)).toBe(true);
        });
    });

    describe("getter Password.password()", () => {
        it("should return generated password divided by (' ')", () => {
            const array = [];
            passwordObject.wordArray.forEach((wordObject, i) => {
                array[i] = wordObject.word; // wordObject.word is an upperCased word
            });
            const str = array.join(' ');

            expect(str === passwordObject.password).toBe(true);
        });
    });

    describe("getter Password.usedWords()", () => {
        it("should return Password._usedWords", () => {
            const usedWords = passwordObject._usedWords;
            passwordObject._usedWords = 10;
            expect(passwordObject.usedWords).toEqual(10);
            passwordObject._usedWords = usedWords;
        });
    });

    describe("setter Password.usedWords()", () => {
        it("should setup Password._usedWords and Password.wordArray", () => {
            const currentUsedWords = passwordObject._usedWords;
            const usedWords = [-1, passwordObject._maxWords + 1, currentUsedWords, 2, 5];
            const retValue = [currentUsedWords, currentUsedWords, currentUsedWords, 2, 5];
            usedWords.forEach((value, i) => {
                passwordObject.usedWords = value;
                expect(passwordObject._usedWords).toEqual(retValue[i]);
                expect(passwordObject.wordArray.length).toEqual(retValue[i]);
                passwordObject.wordArray.forEach((wordObject) => {
                    expect(wordObject instanceof Word).toBe(true);
                });
            });
        });
    });

    describe("getter Password.maxWords()", () => {
        it("should return Password._maxWords", () => {
            const maxWords = passwordObject._maxWords;
            passwordObject._maxWords = 10;
            expect(passwordObject.maxWords).toEqual(10);
            passwordObject._maxWords = maxWords;
        });
    });

    describe("setter Password.maxWords()", () => {
        it("should setup Password._maxWords", () => {
            const currentMaxWords = passwordObject._maxWords;
            const maxWords = [-1, currentMaxWords, 8, 20];
            const retValue = [currentMaxWords, currentMaxWords, 8, 20];
            maxWords.forEach((value, i) => {
                passwordObject.maxWords = value;
                expect(passwordObject._maxWords).toEqual(retValue[i]);
            });
        });
    });
});