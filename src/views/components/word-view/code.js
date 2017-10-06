import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Code = ({className, mod, word}) => {
    return (
        <div className={cn(className, "wv__code wv__code--" + mod,
            {"wv__code--disabled": word === ''})}/>
    );
};

Code.propTypes = {
    className: PropTypes.string,
    mod: PropTypes.string,
    word: PropTypes.string
};

export default Code;
