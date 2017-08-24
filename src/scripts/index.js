import React from 'react';
import ReactDOM from 'react-dom';

import WordComponent from './word_component';

import wordList from './eff_large_wordlist.json';

// import '../styles/normalize.scss';

import '../styles/styles.scss';
import '../styles/dw-button.scss';

import clsNames from 'classnames';

class App extends React.Component {
    constructor(props) {
        // TODO Нужно ли super() передавать props
        super();

        const delimiters = [
            {id: 0, name: '-', caps: true},
            {id: 1, name: '_', caps: true},
            {id: 2, name: ':', caps: true},
            {id: 3, name: '.', caps: true},
            {id: 4, name: '', caps: true},
            {id: 5, name: ' ', caps: true}
        ];

        const wordArray = [];
        for (let id = 0; id < props.wordCounter; id++) wordArray[id] = App.getNewWord(id);

        this.state = {
            opened: false,
            delimiters: delimiters,
            words: wordArray
        };
    }

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomCode() {
        let code = '';
        for (let i = 5; i > 0; i--) code += App.getRandomInt(1, 6).toString();
        return code;
    }

    static getPrevCode(code) {
        const retCode = code.split('').map((i) => parseInt(i, 10));

        let index = retCode.length - 1;

        retCode[index] -= 1;
        while (index >= 0) {
            if (retCode[index] >= 1) return retCode.join('');

            retCode[index] = 6;
            if (index > 0) retCode[index - 1] -= 1;

            index -= 1;
        }
        return retCode.join('');
    }

    static getNextCode(code) {
        const retCode = code.split('').map((i) => parseInt(i, 10));

        let index = retCode.length - 1;

        retCode[index] += 1;
        while (index >= 0) {
            if (retCode[index] <= 6) return retCode.join('');

            retCode[index] = 1;
            if (index > 0) retCode[index - 1] += 1;

            index -= 1;
        }
        return retCode.join('');
    }

    static getRandomWord() {
        const code = App.getRandomCode();
        return App.getWord(code);
    }

    static getWord(code) {
        const word = wordList[code].toUpperCase();
        return {word: word, code: code};
    }

    toggleCaps(id) {
        const d = this.state.delimiters;
        d[id].caps = !d[id].caps;
        this.setState({delimiters: d});
    }

    getPassphrase(delimiter = ' ', isUpperCase = true) {
        const wordArray = [];
        this.state.words.forEach((word, i) => wordArray[i] = word.word);
        const s = wordArray.join(delimiter);
        return isUpperCase ? s.toUpperCase() : s.toLowerCase();
    }

    get wordCounter() {
        return this.state.words.length;
    }

    static getNewWord(id, code = 0) {
        const word = code === 0 ? App.getRandomWord() : App.getWord(code);

        const code_prev1 = App.getPrevCode(word.code);
        const code_prev2 = App.getPrevCode(code_prev1);

        const code_next1 = App.getNextCode(word.code);
        const code_next2 = App.getNextCode(code_next1);

        const word_prev2 = App.getWord(code_prev2);
        const word_prev1 = App.getWord(code_prev1);

        const word_next1 = App.getWord(code_next1);
        const word_next2 = App.getWord(code_next2);

        return {
            id: id,
            word_prev2: word_prev2.word,
            word_prev1: word_prev1.word,
            word: word.word,
            word_next1: word_next1.word,
            word_next2: word_next2.word,

            code_prev2: word_prev2.code,
            code_prev1: word_prev1.code,
            code: word.code,
            code_next1: word_next1.code,
            code_next2: word_next2.code
        };
    }

    handleMinus(id) {
        const wordArray = this.state.words;
        wordArray[id] = App.getNewWord(id, wordArray[id].code_prev1);
        this.setState({words: wordArray});
    }

    handlePlus(id) {
        const wordArray = this.state.words;
        wordArray[id] = App.getNewWord(id, wordArray[id].code_next1);
        this.setState({words: wordArray});
    }

    handleNewWord(id, code = 0) {
        const wordArray = this.state.words;
        wordArray[id] = App.getNewWord(id, code);
        this.setState({words: wordArray});
    }

    handleAllWords() {
        const wordArray = this.state.words.map((i) => App.getNewWord(i.id));
        this.setState({words: wordArray});
    }

    handleWordCounterButton(id) {
        const wordArray = this.state.words;
        wordArray.splice(id);

        for (let i = this.wordCounter; i < id; i++) wordArray.push(App.getNewWord(i));

        this.setState({words: wordArray});
    }


    render() {
        const Menu = ({menu}) => (
            <ul className="app-menu">
                {menu.map((item) =>
                    <li className="app-menu__item" key={'menu_' + item.id}>
                        <a href={item.ref}>{item.title}</a>
                    </li>
                )}
            </ul>
        );

        const Passphrase = () => {
            const length = this.getPassphrase('').length;
            const vocabularyVariations = Math.pow(wordList.length, this.state.words.length);
            const bitsVariations = Math.pow(2, length * 8);

            let TimeNumber = [vocabularyVariations / 1e12, bitsVariations / 1e12];
            let TimeText = [TimeNumber[0] + ' секунд', TimeNumber[1] + ' секунд'];

            const mult = [1, 60, 60, 24, 365];
            const timePostfix = ['секунд', 'минут', 'часов', 'дней', 'лет'];

            for (let i = 0; i < 2; i++) {
                timePostfix.forEach((postfix, index) => {
                    TimeNumber[i] = Math.round(TimeNumber[i] / mult[index] * 100) / 100;
                    if (TimeNumber[i] > 1) {
                        TimeText[i] = 'более ' + TimeNumber[i] + ' ' + postfix;
                    }
                });
            }

            return (
                <div>
                    <p className="app-content__passphrase--title">Ваш пароль:</p>
                    <div className="app-content__passphrase--text">{this.getPassphrase(' ')}</div>

                    <span className="app-content__passphrase--delimiters"
                          onClick={() => this.setState({opened: !this.state.opened})}>
                              Посмотреть пароль с разделителями</span>
                    {/*TODO При раскрытии - возникают ошибки*/}
                    {this.state.opened && this.state.delimiters.map((d) =>
                        <div key={'pb_' + d.id}>
                            <button className="dw-btn h25 app-content__passphrase--button"
                                    onClick={() => this.toggleCaps(d.id)}>CAPS
                            </button>
                            <input type="text" className="h25 app-content__passphrase--input"
                                   value={this.getPassphrase(d.name, d.caps)} readOnly={true}/>
                        </div>)
                    }

                    <p>Длина: <span className="white bold">{length}</span> байт,&nbsp;
                        <span className="white bold">{length * 8}</span> бит.</p>

                    <p>Комбинаций по словарю: <span className="white">{vocabularyVariations}</span><br/>
                        Комбинаций побитово: <span className="white">{bitsVariations}</span></p>

                    <p>Для перебора со скоростью <span className="white">1&nbsp;трлн комбинаций в секунду</span>,
                        понадобится:<br/>
                        <span className="white">{TimeText[0]}</span> перебирая по словарю или<br/>
                        <span className="white">{TimeText[1]}</span> перебирая побитово.
                    </p>
                </div>
            );
        };

        const WordCounterButtons = () => {
            const buttons = [];

            for (let id = 1; id <= this.props.maxWords; id++) {
                buttons[id] = <button key={'wcb_' + id} className={
                    clsNames('dw-btn h25 w25', 'app-content__button', {'app-content__button--active': id === this.wordCounter})}
                                      onClick={() => this.handleWordCounterButton(id)}>{id}</button>;
            }
            return <div>{buttons}</div>;
        };

        const Footer = () => (<div className="app-footer">(c) Богдан Онацкий</div>);

        return (
            <div className="app">
                <h1>Генератор diceware паролей</h1>
                <Menu menu={this.props.menu}/>
                <div className="app-content">
                    {this.state.words.map((word) =>
                        <WordComponent key={'wc_' + word.id}
                                       word={word}
                                       onMinus={() => this.handleMinus(word.id)}
                                       onNewWord={(code) => this.handleNewWord(word.id, code)}
                                       onPlus={() => this.handlePlus(word.id)}/>
                    )}
                    <WordCounterButtons/>
                    <button className="dw-btn h25 w100 app-content__button" onClick={() => this.handleAllWords()}>
                        Изменить все
                    </button>
                    <hr/>
                    <Passphrase/>
                </div>
                <Footer/>
            </div>
        );
    }
}

const menuData = [
    {id: 1, title: 'Домой', ref: '#ref 1'},
    {id: 2, title: 'Меню 2', ref: '#ref 2'},
    {id: 3, title: 'Меню 3', ref: '#ref 3'},
    {id: 4, title: 'Меню 4', ref: '#ref 4'},
    {id: 5, title: 'Меню 5', ref: '#ref 5'},
    {id: 6, title: 'Контакты', ref: '#ref 6'}
];

ReactDOM.render(<App menu={menuData} wordCounter='3' maxWords='8'/>, document.getElementById('app'));