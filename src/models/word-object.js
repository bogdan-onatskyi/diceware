import {observable, computed, action} from 'mobx';

import wordList from './word-list';

class Word {
    @observable _index;
    @observable editorOpened;
    @observable _filter;

    constructor(wordViewId) {
        this._filter = '';
        this._indexFiltered = [];
        this.wordViewId = wordViewId + 1;

        this.editorOpened = false;
        this.toggleEditor = () => {
            this.editorOpened = !this.editorOpened;
        };

        this.filter = '';
        this._index = this.getRandomIndex();

        this.handleClick = (e) => {
            const handler = {
                "filter": () => this.toggleEditor(),
                "prev2": () => this.resetWord(this.prev2index),
                "prev1": () => this.resetWord(this.prev1index),
                "current": () => this.toggleEditor(),
                "next1": () => this.resetWord(this.next1index),
                "next2": () => this.resetWord(this.next2index),
                "code": () => this.resetWord(),
                "minus": () => this.resetWord(this.prev1index),
                "reset-word": () => this.resetWord(),
                "plus": () => this.resetWord(this.next1index)
            };
            for (let prop in handler) {
                if (e.target.className.includes(prop)) {
                    handler[prop]();
                    return;
                }
            }
        };

        this.handleWheel = (e) => {
            e.preventDefault();
            if (!e.target.className.includes("wv__word")) return;
            e.deltaY < 0 ? this.resetWord(this.prev1index) : this.resetWord(this.next1index);
        };

        this.handleFilter = (char) => {
            this.filter += char;
        };

        this.handleCountWords = (char) => {
            return this.countWords(this.filter + char);
        };

        this.handleBackspace = () => {
            this.filter = this.filter.slice(0, -1);
        };
    }

    countWords(startsWith) {
        if (startsWith === '') return wordList.length;

        let counter = 0;
        wordList.forEach((word) => {
            if (word.startsWith(startsWith)) counter++;
        });
        return counter;
    }

    get isFiltered() {
        return this._filter ? this._filter !== '' : false;
    }

    @computed
    get filter() {
        return this._filter;
    }

    set filter(value) {
        this._filter = value;
        this.setWordListFiltered();
    }

    setWordListFiltered() {
        if (this.isFiltered) {
            this._indexFiltered.splice(0);
            wordList.forEach((word, i) => {
                    if (word.startsWith(this.filter)) this._indexFiltered.push(i);
                }
            );
            if (this._indexFiltered.length === 0) this._indexFiltered[0] = 0;
            this.index = this._indexFiltered[0];
        } else this._indexFiltered.splice(0);
    }

    get wordViewId() {
        return this._wordViewId;
    }

    set wordViewId(value) {
        this._wordViewId = (typeof value === "number" && value > 0) ? value : 1;
    }

    @computed
    get index() {
        return this._index;
    }

    set index(value) {
        this._index = (value >= this.minIndex && value <= this.maxIndex)
            ? value
            : this.minIndex;
    };

    @computed
    get code() {
        return Word.indexToCode(this.index);
    }

    // @computed
    get prev2word() {
        const prevWord = this.getWord(this.getPrevIndex(this.getPrevIndex(this.index)));
        return (this.word === prevWord) ? '' : prevWord;
    }

    // @computed
    get prev1word() {
        const prevWord = this.getWord(this.getPrevIndex(this.index));
        return (this.word === prevWord) ? '' : prevWord;
    }

    get prev2index() {
        return this.getPrevIndex(this.getPrevIndex(this.index));
    }

    get prev1index() {
        return this.getPrevIndex(this.index);
    }

    @computed
    get word() {
        return this.getWord(this.index);
    }

    get next1index() {
        return this.getNextIndex(this.index);
    }

    get next2index() {
        return this.getNextIndex(this.getNextIndex(this.index));
    }

    // @computed
    get next1word() {
        const nextWord = this.getWord(this.getNextIndex(this.index));
        return (this.word === nextWord) ? '' : nextWord;
    }

    // @computed
    get next2word() {
        const nextWord = this.getWord(this.getNextIndex(this.getNextIndex(this.index)));
        return (this.word === nextWord) ? '' : nextWord;
    }

    @action('New random word was generated')
    resetWord(index = -1) {
        this.index = (index !== -1) ? index : this.getRandomIndex();
    };

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

    static getRandomCode() {
        let code = '';
        for (let i = 5; i > 0; i--) code += Word.getRandomInt(1, 6);
        return code;
    }

    get minIndex() {
        return this.isFiltered
            ? this._indexFiltered[0]
            : 0;
    }

    get maxIndex() {
        return this.isFiltered
            ? this._indexFiltered[this._indexFiltered.length - 1]
            : wordList.length - 1;
    }

    getPrevIndex(index) {
        return (index > this.minIndex) && (index <= this.maxIndex)
            ? index - 1
            : this.maxIndex;
    }

    getRandomIndex() {
        return this.isFiltered
            ? Word.getRandomInt(this.minIndex, this.maxIndex)
            : Word.codeToIndex(Word.getRandomCode());
    }

    getNextIndex(index) {
        return (index >= this.minIndex) && (index < this.maxIndex)
            ? index + 1
            : this.minIndex;
    }

    getWord(index) {
        return wordList[
            index >= this.minIndex && index <= this.maxIndex
                ? index
                : this.minIndex
            ].toUpperCase();
    }
}

export default Word;