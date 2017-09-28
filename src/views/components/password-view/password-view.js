import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Clipboard from 'clipboard';

import Button from '../_general/button/button';
import ToolTip from '../_general/tooltip/tooltip';

import './password-view.scss';

const clipboard = new Clipboard('.clipboard');

clipboard.on('success', (e) => {
    setTimeout(() => e.clearSelection(), 2000);
});

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
            <div className="password__variants">
                {separators.map((separator, i) =>
                    <div className="password__variants--elem" key={"pass_" + i}>
                        <Button type="caps" onClick={toggleCAPS.bind(this, i)}
                                data-tip="Переключение регистра">
                            {isCAPS(i) ? "текст" : "ТЕКСТ"}
                        </Button>

                        <input id={"pass_input_" + i} type="text" readOnly={true}
                               data-tip="Нажмите на кнопку справа для копирования пароля в буфер обмена"
                               value={separatedPassword(separator, i)}/>

                        <Button className="clipboard" type="copy"
                                data-clipboard-target={"#pass_input_" + i}
                                data-event="click"
                                data-delay-hide={500}
                                data-iscapture={true}
                                data-tip="Пароль скопирован в буфер обмена">
                            <img src="./clippy.svg" width={20 + 'px'} alt=""/>
                        </Button>
                    </div>
                )}
                <ToolTip/>
            </div>
        );
    };

    return (
        <div className="password-view">
            <span className={cn("password__before-text",
                {"password__before-text--opened": isPassboxOpened})}
                  data-tip="Варианты пароля с разделителями"
                  onClick={toggleIsPassboxOpened.bind(this)}/>

            <span id="pass" className="password__text"
                  data-tip="Нажмите на иконку справа для копирования пароля в буфер обмена">
                {password}
            </span>

            <img src="./clippy.svg" width={20 + 'px'} alt=""
                 className="clipboard"
                 data-clipboard-target={"#pass"}

                 data-event="click"
                 data-delay-hide={500}
                 data-iscapture={true}
                 data-tip="Пароль скопирован в буфер обмена"/>

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