import React from 'react';

import ToolTip from '../tooltip';

describe("ToolTip component", () => {
    it("should match saved snapshot", () => {
        const wrapper = shallow(
            <ToolTip/>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
