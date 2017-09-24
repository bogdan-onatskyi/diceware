import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Clipboard from 'clipboard';

import Button from '../_general/button/button';

import './password-view.scss';

new Clipboard('.clipboard');

const PasswordView = ({
                          password,
                          isPassboxOpened,
                          toggleIsPassboxOpened,
                          separatedPassword,
                          separators,
                          toggleCAPS,
                          isCAPS,
                      }) => {
    return (
        <div className="password-view">
            <i className={cn("password__before-text", {"password__before-text--opened": isPassboxOpened})}
               onClick={toggleIsPassboxOpened.bind(this)}/>
            <span id="pass" className="password__text">{password}</span>
            <i className="clipboard password__after-text" data-clipboard-target={"#pass"}/>

            {isPassboxOpened && (
                <div className="password__dropbox">
                    {separators.map((separator, i) =>
                        <div className="password__dropbox--elem" key={"pass_" + i}>
                            <Button onClick={toggleCAPS.bind(this, i)}
                                    type="caps" text={isCAPS(i) ? "текст" : "ТЕКСТ"}/>
                            <input id={"pass_input_" + i} type="text" readOnly={true}
                                   value={separatedPassword(separator, i)}/>
                            <Button className="clipboard" data-clipboard-target={"#pass_input_" + i}
                                    type="copy"/>
                        </div>
                    )}
                </div>
            )}
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