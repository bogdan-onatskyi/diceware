import {observable, computed, action} from 'mobx';

import Word from './word-object';

class Password {
    @observable usedWords;
    @observable maxWords;

    @observable wordArray;
    @observable isPassboxOpened;
    // @observable caps;

    constructor() {
        this.usedWords = 5;
        this.maxWords = 8;
        this.wordArray = [];

        this.caps = 0;
        this.separators = ['-', '_', ':', '.', '', ' '];
        this.separators.forEach((s, i) => {
            this.caps += Math.pow(2, i);
        });

        this.isCAPS = (i) => this.caps & Math.pow(2, i);
        this.toggleCAPS = (i) => {
            this.caps = this.caps ^ Math.pow(2, i);
        };

        this.isPassboxOpened = true;
        this.toggleIsPassboxOpened = () => {
            this.isPassboxOpened = !this.isPassboxOpened;
        };

        this.handleUsedWords = [];
        for (let id = 1; id <= this.maxWords; id++)
            this.handleUsedWords [id - 1] = () => {
                this.wordArray.splice(id);
                for (let i = this.usedWords; i < id; i++)
                    this.wordArray.push(new Word(i));
                this.usedWords = id;
            };

        this.handleResetAllWords = () => {
            for (let i = 0; i < this.usedWords; i++)
                this.wordArray[i] = new Word(i);
        };

        this.separatePassword = (separator, i = -1) => {
            const isUpperCase = (i === -1) ? true : this.isCAPS(i);
            const s = this.password.join(separator);
            return isUpperCase ? s.toUpperCase() : s.toLowerCase();
        };

    }

    // @action('isCAPS')
    // isCAPS(i) {
    //     return this.caps & Math.pow(2, i);
    // };

    init(usedWords = 5, maxWords = 8) {
        this.usedWords = usedWords;
        this.maxWords = maxWords;
        this.handleResetAllWords();
    }

    @computed
    get password() {
        const pass = [];
        this.wordArray.forEach((wordObject) => pass.push(wordObject.word));
        return pass;
    }

    // @computed
    // get caps() {
    //     return this.caps;
    // }

    // @action('Caps state changed')
    // isCAPS(i) {
    //     return this._isCAPS(i);
    // }
}

export {Password};

const passwordObject = new Password();
export default passwordObject;