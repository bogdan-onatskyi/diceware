import React from 'react';

/* components */
import Header from '../components/header/header';
import Menu from '../components/menu/menu';
import Footer from '../components/footer/footer';

/* styles */
import './index.scss';

const Component = props => (
    <div className="app">
        <Header text="Что это"/>
        <Menu/>
        <div className="app__content app__content--info">
            <h2>О приложении</h2>
            <p>Это веб-приложение предназначено для генерации diceware паролей.</p>
            <p>
                Используется список слов <a
                href="https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases">
                EFF's New Wordlists for Random Passphrases</a> (
                <a href="https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt">eff_large_wordlist.txt</a>).
            </p>
            <p>
                Пароль генерируется в браузере пользователя, ничто никуда не отсылается - можно посмотреть исходный код,
                который открыт и доступен.
            </p>

            <h2>Внешние ресурсы</h2>
            <p>
                Изначально мне понравилась <a
                href="https://theintercept.com/2015/03/26/passphrases-can-memorize-attackers-cant-guess/">
                статья Micah Lee</a> на theintercept.com.
            </p>
            <p>
                Подробнее на <a href="http://world.std.com/~reinhold/diceware.html">странице проекта</a> или
                в <a href="https://www.google.com.ua/search?q=diceware+пароли">google</a>.
            </p>
        </div>
        <Footer/>
    </div>
);

export default Component;