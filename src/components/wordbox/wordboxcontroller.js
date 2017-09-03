import React from 'react';
import {observer, inject} from 'mobx-react';

import WordBox from './wordbox';

const Component = inject('wordStore')(observer(({wordStore}) => {
    return (
        <div>
            {wordStore.wordArray.map((id, i) =>
                <WordBox word={id} key={"WordBox_" + i}/>)}
        </div>

    );
}));

Component.displayName = "WordBoxContainer";
export default Component;