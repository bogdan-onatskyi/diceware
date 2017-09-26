import React from 'react';
import ReactTooltip from 'react-tooltip';

const ToolTip = () => {
    return (
        <ReactTooltip className="tooltip" place="bottom"
                      delayShow={1000} border={true}
                      globalEventOff="click"/>
    );
};

export default ToolTip;