import React from 'react';
import {findDOMNode} from 'react-dom'
import PropTypes from 'prop-types';
import cn from 'classnames';
import Clipboard from 'clipboard';
import ReactTooltip from 'react-tooltip';

import Button from '../_general/button/button';
import ToolTip from '../_general/tooltip/tooltip';

import './password-view.scss';

const clipboard = new Clipboard('.clipboard');

clipboard.on('success', (e) => {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

// Не работает !!!
//     ReactTooltip.show(document.getElementById(e.trigger.id));

    e.clearSelection();
});

/*
<p ref='foo' data-tip='tooltip'></p>
<button onClick={() => { ReactTooltip.show(findDOMNode(this.refs.foo)) }}></button>
<ReactTooltip />
 */

const PasswordView = ({
                          password,
                          isPassboxOpened,
                          toggleIsPassboxOpened,
                          separatedPassword,
                          separators,
                          toggleCAPS,
                          isCAPS,
                      }) => {

    const PassVariants = () => {
        return (
            <div className="password__dropbox">
                {separators.map((separator, i) =>
                    <div className="password__dropbox--elem" key={"pass_" + i}>
                        <Button onClick={toggleCAPS.bind(this, i)}
                                data-tip="Переключение регистра"
                                type="caps" text={isCAPS(i) ? "текст" : "ТЕКСТ"}/>

                        <input id={"pass_input_" + i} type="text" readOnly={true}
                               data-tip="Нажмите на кнопку справа для копирования пароля в буфер обмена"
                               value={separatedPassword(separator, i)}/>

                        <Button className="clipboard" data-clipboard-target={"#pass_input_" + i}
                                data-tip="Пароль скопирован в буфер обмена"
                                type="copy"/>
                    </div>
                )}
                <ToolTip/>
            </div>
        );
    };

    return (
        <div className="password-view">
            <i className={cn("password__before-text",
                {"password__before-text--opened": isPassboxOpened})}
               data-tip="Варианты пароля с разделителями"
               onClick={toggleIsPassboxOpened.bind(this)}/>

            <span id="pass" className="password__text"
                  data-tip="Нажмите на иконку справа для копирования пароля в буфер обмена">
                {password}
            </span>

            <i id="pass_copy" className="clipboard password__after-text"
               data-event="click"
               data-delay-show={0}
               data-delay-hide={1000}
               data-iscapture={true}
               data-tip="Пароль скопирован в буфер обмена"
               data-clipboard-target={"#pass"}/>

            {isPassboxOpened && <PassVariants/>}

            <ToolTip/>
        </div>
    );
};

PasswordView.propTypes = {
    password: PropTypes.string,
    isPassboxOpened: PropTypes.bool,
    toggleIsPassboxOpened: PropTypes.func,
    separatedPassword: PropTypes.func,
    separators: PropTypes.array,
    toggleCAPS: PropTypes.func,
    isCAPS: PropTypes.func,
};

export default PasswordView;