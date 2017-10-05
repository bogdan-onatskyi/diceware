import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Word = ({className, modifier, flag, tip, children}) => {
    return (
        <div className={cn(className, "wv__word wv__word--" + modifier,
            {"wv__word--disabled": flag === ''})}
             data-tip={flag !== '' ? tip : ""}>
            &nbsp;{flag}&nbsp;
            {children}
        </div>
    );
};

Word.propTypes = {
    className: PropTypes.string,
    modifier: PropTypes.string,
    flag: PropTypes.string,
    tip: PropTypes.string,
};

export default Word;
