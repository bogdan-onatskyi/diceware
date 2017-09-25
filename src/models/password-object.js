import {observable, computed, action, reaction} from 'mobx';

import Word from './word-object';

class Password {
    @observable usedWords = 5;
    @observable maxWords = 8;

    @observable wordArray = [];

    @observable isPassboxOpened = false;
    @observable caps = 0;

    constructor() {
        this.handleResetAllWords = () => {
            for (let i = 0; i < this.usedWords; i++)
                this.wordArray[i] = new Word(i);
        };

        this.init = (usedWords = 5, maxWords = 8) => {
            this.usedWords = usedWords;
            this.maxWords = maxWords;
            this.handleResetAllWords();
        };

        this.separators = ['-', '_', ':', '.', '', ' '];
        this.separators.forEach((s, i) => {
            this.caps += Math.pow(2, i);
        });

        this.isCAPS = (i) => this.caps & Math.pow(2, i);
        this.toggleCAPS = (i) => {
            this.caps = this.caps ^ Math.pow(2, i);
        };

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

        this.separatedPassword = (separator, i = -1) => {
            const passArray = [];
            this.wordArray.forEach((wordObject) => passArray.push(wordObject.word));
            const passStr = passArray.join(separator);

            const isUpperCase = (i === -1) ? true : this.isCAPS(i);
            return isUpperCase ? passStr.toUpperCase() : passStr.toLowerCase();
        };
    }

    @computed
    get password() {
        return this.separatedPassword(' ');
    }
}

export {Password};

const passwordObject = new Password();
export default passwordObject;