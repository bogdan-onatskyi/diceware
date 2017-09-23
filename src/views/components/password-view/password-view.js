import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Clipboard from 'clipboard';

import Button from '../_general/button/button';

import './password-view.scss';

new Clipboard('.clipboard');

const PasswordView = ({
                          isPassboxOpened,
                          toggleIsPassboxOpened,
                          separatePassword,
                          separators,
                          toggleCAPS,
                          isCAPS,
                          password
                      }) => {
    return (
        <div className="password-view">
            <i className={cn("password__before-text", {"password__before-text--opened": isPassboxOpened})}
               onClick={toggleIsPassboxOpened.bind(this)}/>
            <span id="pass" className="password__text">{separatePassword(' ')}</span>
            <i className="clipboard password__after-text" data-clipboard-target={"#pass"}/>

            <div className="password__dropbox">
                {isPassboxOpened && separators.map((separator, i) =>
                    <div className="password__dropbox--elem" key={"pass_" + i}>
                        <Button onClick={toggleCAPS.bind(this, i)}
                                type="caps" text={isCAPS(i) ? "текст" : "ТЕКСТ"}/>
                        <input id={"pass_input_" + i} type="text" readOnly={true}
                               value={separatePassword(separator, i)}/>
                        <Button className="clipboard" data-clipboard-target={"#pass_input_" + i}
                                type="copy"/>
                    </div>)
                }
            </div>
        </div>
    );
};

PasswordView.propTypes = {
    isPassboxOpened: PropTypes.bool,
    toggleIsPassboxOpened: PropTypes.func,
    separatePassword: PropTypes.func,
    separators: PropTypes.array,
    toggleCAPS: PropTypes.func,
    isCAPS: PropTypes.func,
    password: PropTypes.array
};

export default PasswordView;