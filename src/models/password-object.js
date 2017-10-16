import {observable, computed} from 'mobx';

import Word from './word-object';

class Password {
    @observable _usedWords = 5;
    @observable _maxWords = 8;

    @observable wordArray = [];

    @observable isVariantsOpened = false;
    @observable caps = 0;

    constructor() {
        this.init = (usedWords = 5, maxWords = 8) => {
            this._maxWords = maxWords;
            this._usedWords = usedWords;
            this.wordArray.splice(0);
            for (let i = 0; i < this._usedWords; i++) this.wordArray[i] = new Word(i);
        };

        this.separators = ['-', '_', ':', '.', '', ' '];
        this.separators.forEach((s, i) => {
            this.caps += Math.pow(2, i);
        });

        this.isCAPS = (i) => this.caps & Math.pow(2, i);
        this.toggleCAPS = (i) => {
            this.caps = this.caps ^ Math.pow(2, i);
        };

        this.toggleVariantsOpened = () => {
            this.isVariantsOpened = !this.isVariantsOpened;
        };

        this.handleUsedWords = (value) => {
            this.usedWords = value;
        };

        this.handleResetAllWords = () => {
            for (let i = 0; i < this._usedWords; i++) this.wordArray[i].resetWord();
        };

        this.separatedPassword = (separator, i = -1) => {
            const passArray = [];
            this.wordArray.forEach((wordObject) => passArray.push(wordObject.word));
            const passStr = passArray.join(separator);

            const isUpperCase = (i === -1) ? true : this.isCAPS(i);
            return isUpperCase ? passStr.toUpperCase() : passStr.toLowerCase();
        };

        this.init();
    }

    @computed
    get password() {
        return this.separatedPassword(' ');
    }

    get usedWords() {
        return this._usedWords;
    }

    set usedWords(value) {
        if (value < 0 || value > this._maxWords || value === this._usedWords) return;

        this.wordArray.splice(value);
        for (let i = this._usedWords; i < value; i++) this.wordArray.push(new Word(i));
        this._usedWords = value;
    }

    get maxWords() {
        return this._maxWords;
    }

    set maxWords(value) {
        if (value < 0 || value === this._maxWords) return;
        this._maxWords = value;
    }
}

export {Password};

const passwordObject = new Password();
export default passwordObject;