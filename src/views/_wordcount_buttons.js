import React from 'react';
// import {observer, inject} from 'mobx-react';

// import wordStore from "../stores/wordstore";

let key = 1;

import cn from 'classnames';

const Component = props => {

    const buttons = [];

    for (let id = 0; id <= props.maxWords; id++) {
        buttons[id] =
            <button
                key={'wcb_' + id}
                className={cn('dw-btn h25 w25', 'app-content__button',
                    {'app-content__button--active': id === 5})}
                onClick={() => console.log('click')}>
                {id}
            </button>;
    }

    return (
        <div>
            {buttons}
        </div>
    );
};

Component.displayName = "WordCountButtonsContainer";
export default Component;