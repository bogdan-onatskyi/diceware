import React from 'react';
import ReactTooltip from 'react-tooltip';

import "./tooltip.scss";

const ToolTip = () => {
    return (
        <ReactTooltip className="tooltip" place="bottom"
                      delayShow={500} border={true}/>
    );
};

export default ToolTip;