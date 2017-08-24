import React from 'react';

class WordComponent extends React.Component {
    render() {
        let key = 0;
        const word = this.props.word;
        const handleWheel = (e) => {
            e.preventDefault();
            if (!e.target.className.includes("wc__word")) return;
            e.deltaY > 0 ? this.props.onPlus() : this.props.onMinus();
        };
        return (
            <div className="wc" onWheel={handleWheel}>
                <div className="wc__word" onClick={() => this.props.onNewWord(word.code_prev2)}>
                    {word.word_prev2}
                </div>
                <div className="wc__word wc__word--prev" onClick={() => this.props.onNewWord(word.code_prev1)}>
                    {word.word_prev1}
                </div>
                <div className="wc__word wc__word--current">
                    {word.word}
                </div>
                <div className="wc__word wc__word--next" onClick={() => this.props.onNewWord(word.code_next1)}>
                    {word.word_next1}
                </div>
                <div className="wc__word" onClick={() => this.props.onNewWord(word.code_next2)}>
                    {word.word_next2}
                </div>

                <div className="wc__wrapper">
                    {word.code.split('').map((i) =>
                        <div key={'code_' + key++} className={'wc__code wc__code--' + i}/>
                    )}
                </div>

                <div className="wc__wrapper">
                    <button className="dw-btn dw-btn__minus h20 w20" onClick={this.props.onMinus}>-</button>
                    <button className="dw-btn h20 w75" onClick={() => this.props.onNewWord()}>Изменить</button>
                    <button className="dw-btn dw-btn__plus h20 w20" onClick={this.props.onPlus}>+</button>
                </div>
            </div>
        );
    }
}

export default WordComponent;
