import {observable, computed, action} from 'mobx';

import Word from './wordobject';

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

export {WordStore};

const wordStore = new WordStore();
export default wordStore;

