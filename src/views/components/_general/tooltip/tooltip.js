import React from 'react';
import ReactTooltip from 'react-tooltip';

const toolTipArray = [];

const ToolTip = () => {
    return (
        <ReactTooltip className="tooltip" place="bottom"
                      delayShow={500} border={true}
                      globalEventOff="click"/>
    );
};

export {toolTipArray};
export default ToolTip;