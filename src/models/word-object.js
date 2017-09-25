import {observable, computed, action} from 'mobx';

import wordList from './word-list';

class Word {
    @observable _index = 0;

    constructor(wordViewId) {
        this._filter = '';
        this._indexFiltered = [];
        this._wordViewId = wordViewId;

        this.filter = '';
        this._index = this.getRandomIndex();
        this.handleClick = (e) => {
            const handler = {
                "prev2": () => this.ResetWord(this.prev2index),
                "prev1": () => this.ResetWord(this.prev1index),
                "next1": () => this.ResetWord(this.next1index),
                "next2": () => this.ResetWord(this.next2index),
                "minus": () => this.MinusWord(),
                "reset-word": () => this.ResetWord(),
                "plus": () => this.PlusWord(),
                "code": () => this.ResetWord()
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
            e.deltaY > 0 ? this.PlusWord() : this.MinusWord();
        };
    }

    get isFiltered() {
        return this._filter !== (undefined || '');
    }

    get filter() {
        return this._filter;
    }

    set filter(value) {
        this._filter = value;
        this.setWordListFiltered();
    }

    setWordListFiltered() {
        if (this.isFiltered) wordList.forEach((word, i) => {
                if (word.startsWith(this.filter)) this._indexFiltered.push(i);
            }
        ); else this._indexFiltered = null;
    }

    get wordViewId() {
        return this._wordViewId;
    }

    get index() {
        return this._index;
    }

    set index(value) {
        this._index = (value >= this.minIndex && value <= this.maxIndex)
            ? value
            : 0;
    };

    get code() {
        return Word.indexToCode(this.index);
    }

    get prev2word() {
        return this.getWord(this.getPrevIndex(this.getPrevIndex(this.index)));
    }

    get prev1word() {
        return this.getWord(this.getPrevIndex(this.index));
    }

    get prev2index() {
        return this.getPrevIndex(this.getPrevIndex(this.index));
    }

    get prev1index() {
        return this.getPrevIndex(this.index);
    }

    get word() {
        return this.getWord(this.index);
    }

    get next1index() {
        return this.getNextIndex(this.index);
    }

    get next2index() {
        return this.getNextIndex(this.getNextIndex(this.index));
    }

    get next1word() {
        return this.getWord(this.getNextIndex(this.index));
    }

    get next2word() {
        return this.getWord(this.getNextIndex(this.getNextIndex(this.index)));
    }

    @action('Previous word was selected')
    MinusWord() {
        this.index = this.getPrevIndex(this.index);
    }

    @action('New random word was generated')
    ResetWord(index = 0) {
        this.index = (index !== 0) ? index : this.getRandomIndex();
    };

    @action('Next word was selected')
    PlusWord() {
        this.index = this.getNextIndex(this.index);
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
        return index > this.minIndex
            ? index - 1
            : this.maxIndex;
    }

    getRandomIndex() {
        return this.isFiltered
            ? Word.getRandomInt(this.minIndex, this.maxIndex)
            : Word.codeToIndex(Word.getRandomCode());
    }

    getNextIndex(index) {
        return index < this.maxIndex
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