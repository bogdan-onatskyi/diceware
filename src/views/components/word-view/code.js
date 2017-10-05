import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Code = ({className, modifier, flag}) => {
    return (
        <div className={cn(className, "wv__code wv__code--" + modifier,
            {"wv__code--disabled": flag === ''})}/>
    );
};

Code.propTypes = {
    className: PropTypes.string,
    modifier: PropTypes.string,
    flag: PropTypes.string
};

export default Code;
