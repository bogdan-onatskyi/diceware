import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import ToolTip from '../_general/tooltip/tooltip';

import './password-view.scss';

const Password = ({password, isVariantsOpened, toggleVariantsOpened}) => {

    return (
        <div className="password">
            <span className={cn("password__before-text",
                {"password__before-text--opened": isVariantsOpened})}
                  data-tip="Варианты пароля с разделителями"
                  onClick={toggleVariantsOpened.bind(this)}/>

            <div id="pass" className="password__text"
                 data-tip="Нажмите на иконку справа для копирования пароля в буфер обмена">
                {password}
            </div>

            <span className="clipboard password__after-text"
                 data-clipboard-target={"#pass"}

                 data-event="click"
                 data-delay-hide={500}
                 data-iscapture={true}
                 data-tip="Пароль скопирован в буфер обмена"/>

            <ToolTip/>
        </div>
    );
};

Password.propTypes = {
    password: PropTypes.string,
    isVariantsOpened: PropTypes.bool,
    toggleVariantsOpened: PropTypes.func
};

export default Password;