import React from 'react';
import PropTypes from 'prop-types';

import Button from '../_general/button/button';
import ToolTip from '../_general/tooltip/tooltip';

import './password-view.scss';

const Variants = ({separators, toggleCAPS, isCAPS, separatedPassword}) => {
    return (
        <div className="variants">
            {separators.map((separator, i) =>
                <div className="variants__row" key={"vars_" + i}>
                    <Button type="caps" onClick={toggleCAPS.bind(this, i)}
                            className="variants__row--left-button"
                            data-tip="Переключение регистра">
                        {isCAPS(i) ? "текст" : "ТЕКСТ"}
                    </Button>

                    <input id={"vars_input_" + i} type="text" readOnly={true}
                           className="variants__row--input"
                           data-tip="Нажмите на кнопку справа для копирования пароля в буфер обмена"
                           value={separatedPassword(separator, i)}/>

                    <Button className="clipboard variants__row--right-button" type="copy"
                            data-clipboard-target={"#vars_input_" + i}
                            data-event="click"
                            data-delay-hide={500}
                            data-iscapture={true}
                            data-tip="Пароль скопирован в буфер обмена">
                        <span className="icon-copy"/>
                    </Button>
                </div>
            )}
            <ToolTip/>
        </div>
    );
};

Variants.propTypes = {
    separators: PropTypes.array,
    toggleCAPS: PropTypes.func,
    isCAPS: PropTypes.func,
    separatedPassword: PropTypes.func
};

export default Variants;