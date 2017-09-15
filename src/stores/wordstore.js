import {observable, computed, action, asMap, autorun} from 'mobx';

import wordList from './word_list';

class Word {
    @observable _index;

    constructor(wordBoxId) {
        this._id = wordBoxId;
        this._index = Word.getRandomIndex();
        this.handleClick = (e) => {
            const handler = {
                "prev2": () => this.ResetWord(this.prev2index),
                "prev1": () => this.ResetWord(this.prev1index),
                "next1": () => this.ResetWord(this.next1index),
                "next2": () => this.ResetWord(this.next2index),
                "minus": () => this.MinusWord(),
                "reset-word": () => this.ResetWord(),
                "plus": () => this.PlusWord()
            };
            for (let prop in handler) {
                if (e.target.className.includes(prop)) {
                    // e.preventDefault();
                    handler[prop]();
                    return;
                }
            }
        };
        this.handleWheel = (e) => {
            e.preventDefault();
            if (!e.target.className.includes("wb-container__word")) return;
            e.deltaY > 0 ? this.PlusWord() : this.MinusWord();
        };
    }

    get id() {
        return this._id;
    }

    // @computed
    get index() {
        return this._index;
    }

    set index(value) {
        this._index = (value >= 0 && value < wordList.length) ? value : 0;
    };

    // @computed
    get code() {
        return Word.indexToCode(this._index);
    }

    // @computed
    get prev2word() {
        return Word.getWord(Word.getPrevIndex(Word.getPrevIndex(this._index)));
    }

    // @computed
    get prev1word() {
        return Word.getWord(Word.getPrevIndex(this._index));
    }

    // @computed
    get prev2index() {
        return Word.getPrevIndex(Word.getPrevIndex(this._index));
    }

    // @computed
    get prev1index() {
        return Word.getPrevIndex(this._index);
    }

    // @computed
    get word() {
        return Word.getWord(this._index);
    }

    // @computed
    get next1index() {
        return Word.getNextIndex(this._index);
    }

    // @computed
    get next2index() {
        return Word.getNextIndex(Word.getNextIndex(this._index));
    }

    // @computed
    get next1word() {
        return Word.getWord(Word.getNextIndex(this._index));
    }

    // @computed
    get next2word() {
        return Word.getWord(Word.getNextIndex(Word.getNextIndex(this._index)));
    }

    @action('Previous word was selected')
    MinusWord() {
        this.index = Word.getPrevIndex(this.index);
    }

    @action('New random word was generated')
    ResetWord(index = 0) {
        this.index = index !== 0 ? index : Word.getRandomIndex();
    };

    @action('Next word was selected')
    PlusWord() {
        this.index = Word.getNextIndex(this.index);
    }

    static indexToCode(index) {
        let localIndex = index;
        let code = '';
        let pow6, n;

        for (let i = 0; i < 4; i++) {
            pow6 = Math.pow(6, 4 - i);
            n = Math.floor((localIndex) / pow6);
            localIndex -= n * pow6;
            code += n += 1;
        }
        code += ++localIndex;

        return code;
    }

    static codeToIndex(code) {
        const codeArray = [] = code.split('');

        let index = codeArray[4] - 1;

        for (let i = 0; i < 4; i++) {
            index += (codeArray[i] - 1) * Math.pow(6, 4 - i);
        }

        return index;
    }

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomIndex() {
        return Word.codeToIndex(Word.getRandomCode());
    }

    static getRandomCode() {
        let code = '';
        for (let i = 5; i > 0; i--) code += Word.getRandomInt(1, 6);
        return code;
    }

    static getPrevIndex(index) {
        return index > 0 ? index - 1 : wordList.length - 1;
    }

    static getNextIndex(index) {
        return index < wordList.length - 1 ? index + 1 : 0;
    }

    static getWord(index) {
        return wordList[(index >= 0 && index < wordList.length) ? index : 0].toUpperCase();
    }
}

class WordStore {
    @observable maxWords;
    @observable usedWords;

    @observable wordArray;
    @observable opened;
    @observable caps;

    constructor() {
        this.maxWords = 8;
        this.usedWords = 5;
        this.wordArray = [];

        this.caps = 0;
        this.isCAPS = (i) => this.caps & Math.pow(2, i);
        this.toggleCAPS = (i) => {
            this.caps = this.caps ^ Math.pow(2, i);
        };

        this.separators = ['-', '_', ':', '.', '', ' '];
        this.separators.forEach((s, i) => {
            this.caps += Math.pow(2, i);
        });

        this.opened = false;
        this.toggleOpened = () => {
            this.opened = !this.opened;
        };

        this.handleUsedWords = [];
        for (let id = 1; id <= this.maxWords; id++) this.handleUsedWords [id - 1] = () => {
            this.wordArray.splice(id);
            for (let i = this.usedWords; i < id; i++) this.wordArray.push(new Word(i));
            this.usedWords = id;
        };

        this.handleResetAllWords = () => {
            for (let i = 0; i < this.usedWords; i++) this.wordArray[i] = new Word(i);
        };
    }

    init(maxWords = 8, usedWords = 5) {
        this.maxWords = maxWords;
        this.usedWords = usedWords;
        this.handleResetAllWords();
    }

    @computed
    get passphrase() {
        let pass = [];
        for (let i = 0; i < this.wordArray.length; i++) pass[i] = this.wordArray[i].word;
        return pass;
    }

    separatePassphrase(separator, i = -1) {
        const isUpperCase = (i === -1) ? true : this.isCAPS(i);
        const s = this.passphrase.join(separator);
        return isUpperCase ? s.toUpperCase() : s.toLowerCase();
    }
}

const wordStore = new WordStore();
export default wordStore;

export {WordStore};