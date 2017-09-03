import {observable, computed, action, asMap, autorun} from 'mobx';

import wordList from './word_list';

class Word {
    @observable _index;

    constructor(wordBoxId) {
        this._id = wordBoxId;
        this._index = Word.getRandomIndex();
    }

    get id() {
        return this._id;
    }

    @computed
    get index() {
        return this._index;
    }

    set index(value) {
        this._index = (value >= 0 && value < wordList.length) ? value : 0;
    };

    @computed
    get code() {
        return Word.indexToCode(this._index);
    }

    get prev2word() {
        return Word.getWord(Word.getPrevIndex(Word.getPrevIndex(this._index)));
    }

    get prev1word() {
        return Word.getWord(Word.getPrevIndex(this._index));
    }

    get prev2index() {
        return Word.getPrevIndex(Word.getPrevIndex(this._index));
    }

    get prev1index() {
        return Word.getPrevIndex(this._index);
    }

    @computed
    get word() {
        return Word.getWord(this._index);
    }

    get next1index() {
        return Word.getNextIndex(this._index);
    }

    get next2index() {
        return Word.getNextIndex(Word.getNextIndex(this._index));
    }

    get next1word() {
        return Word.getWord(Word.getNextIndex(this._index));
    }

    get next2word() {
        return Word.getWord(Word.getNextIndex(Word.getNextIndex(this._index)));
    }

    @action('Previous word was selected')
    onMinus() {
        this.index = Word.getPrevIndex(this.index);
    }

    @action('New random word was generated')
    onNewWord(index = 0) {
        this.index = index !== 0 ? index : Word.getRandomIndex();
    };

    @action('Next word was selected')
    onPlus() {
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
        this.opened = false;
        this.caps = [];
        this.separators = ['-', '_', ':', '.', '', ' '];
        for (let i = 0; i < this.separators.length; i++) this.caps[i] = true;
    }

    init(maxWords = 8, usedWords = 5) {
        this.maxWords = maxWords;
        this.usedWords = usedWords;

        for (let i = 0; i < usedWords; i++) this.wordArray[i] = new Word(i);
    }

    toggleOpened() {
        this.opened = !this.opened;
    }

    handleUsedWords(buttonId) {
        const id = (buttonId > 0 && buttonId <= this.maxWords) ? buttonId : this.usedWords;

        this.wordArray.splice(id);
        for (let i = this.usedWords; i < id; i++) this.wordArray.push(new Word(i));

        this.usedWords = id;
    }

    handleChangeAllWords() {
        for (let i = 0; i < this.usedWords; i++) this.wordArray[i] = new Word(i);
    }

    @computed
    get passphrase() {
        let pass = [];
        for (let i = 0; i < this.wordArray.length; i++) pass[i] = this.wordArray[i].word;
        return pass;
    }

    separatePassphrase(separator, isUpperCase = true) {
        const s = this.passphrase.join(separator);
        return isUpperCase ? s.toUpperCase() : s.toLowerCase();
    }
}

const wordStore = new WordStore();
export default wordStore;

export {WordStore};