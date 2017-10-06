import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Word = ({className, mod, word, tip, children}) => {
    return (
        <div className={cn(className, "wv__word wv__word--" + mod,
            {"wv__word--disabled": word === ''})}
             data-tip={word !== '' ? tip : ""}>
            &nbsp;{word}&nbsp;
            {children}
        </div>
    );
};

Word.propTypes = {
    className: PropTypes.string,
    mod: PropTypes.string,
    word: PropTypes.string,
    tip: PropTypes.string,
};

export default Word;
