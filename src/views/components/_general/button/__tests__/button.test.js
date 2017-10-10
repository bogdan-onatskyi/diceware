import React from 'react';

import Button from '../button';

describe("Button component", () => {
    it("should match saved snapshot (type === 'sometype')", () => {
        const handleClick = jest.fn();
        const wrapper = shallow(
            <Button type="sometype" data-tip="Tooltip" onClick={handleClick}>
                Button text
            </Button>
        );
        expect(wrapper).toMatchSnapshot();
        wrapper.simulate('click');
        expect(handleClick).toHaveBeenCalled();
    });

    it("should match saved snapshot (disabled === true)", () => {
        const handleClick = jest.fn();
        const wrapper = shallow(
            <Button type="sometype" disabled={true} selected={false}
                    data-tip="Tooltip" onClick={handleClick}>
                Button text
            </Button>
        );
        expect(wrapper).toMatchSnapshot();
        wrapper.simulate('click');
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("should match saved snapshot (selected === true)", () => {
        const wrapper = shallow(
            <Button type="sometype" disabled={false} selected={true}
                    data-tip="Tooltip">
                Button text
            </Button>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should match saved snapshot (data-tip === '')", () => {
        const wrapper = shallow(
            <Button type="sometype" disabled={false} selected={false}
                    data-tip="">
                Button text
            </Button>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("should have 4 props", () => {
        const propsStr = 'className type selected disabled onClick';
        const props = [];
        for (let prop in Button.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});
