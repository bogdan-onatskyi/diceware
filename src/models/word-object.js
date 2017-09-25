import {observable, computed, action} from 'mobx';

import wordList from './word-list';

class Word {
    @observable _index;
    @observable editorOpened;
    @observable _filter;

    constructor(wordViewId) {
        this._filter = '';
        this._indexFiltered = [];
        this._wordViewId = wordViewId + 1;

        this.editorOpened = false;
        this.toggleEditor = () => this.editorOpened = !this.editorOpened;

        this.filter = '';
        this._index = this.getRandomIndex();
        this.handlerClick = (e) => {
            const handler = {
                "prev2": () => this.resetWord(this.prev2index),
                "prev1": () => this.resetWord(this.prev1index),
                "next1": () => this.resetWord(this.next1index),
                "next2": () => this.resetWord(this.next2index),
                // "minus": () => this.minusWord(),
                "minus": () => {
                    console.log(this.filter);
                    this.filter = this.filter.slice(0, -1);
                    console.log(this.filter);
                },
                "editor": () => this.toggleEditor(),
                "plus": () => {
                    console.log(this.filter);
                    this.filter += 'a';
                    console.log(this.filter);
                },
                // "plus": () => this.plusWord(),
                "code": () => this.resetWord()
            };
            for (let prop in handler) {
                if (e.target.className.includes(prop)) {
                    handler[prop]();
                    return;
                }
            }
        };
        this.handlerWheel = (e) => {
            e.preventDefault();
            if (!e.target.className.includes("wv__word")) return;
            e.deltaY > 0 ? this.plusWord() : this.minusWord();
        };
        this.handlerFilter = (letter) => this.filter += letter;
    }

    get isFiltered() {
        return this._filter !== (undefined || '');
    }

    @computed
    get filter() {
        console.log('filter get: ' + this._filter);
        return this._filter;
    }

    set filter(value) {
        this._filter = value;
        console.log('filter set: ' + this._filter);
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
        } else this._indexFiltered.splice(0);
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
    minusWord() {
        this.index = this.getPrevIndex(this.index);
    }

    @action('New random word was generated')
    resetWord(index = 0) {
        this.index = (index !== 0) ? index : this.getRandomIndex();
    };

    @action('Next word was selected')
    plusWord() {
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