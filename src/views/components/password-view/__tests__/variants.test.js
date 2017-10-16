import React from 'react';

import Variants from '../variants';
import {Password} from '../../../../models/password-object';

describe("Variants component", () => {
    const passwordObject = new Password();

    passwordObject.wordArray.forEach((wordObject) => {
        wordObject.index = 0;
    });

    const setup = ({
                       separators = passwordObject.separators,
                       toggleCAPS = passwordObject.toggleCAPS,
                       isCAPS = passwordObject.isCAPS,
                       separatedPassword = passwordObject.separatedPassword,
                       caps = passwordObject.caps
                   }) => {

        const wrapper = shallow(<Variants separators={separators}
                                          toggleCAPS={toggleCAPS}
                                          isCAPS={isCAPS}
                                          separatedPassword={separatedPassword}
                                          caps={caps}/>
        );
        return {wrapper};
    };

    it("should match saved snapshot (isCAPS(i) !== 0)", () => {
        expect(passwordObject.password).toEqual('ABACUS ABACUS ABACUS ABACUS ABACUS');

        const {wrapper} = setup({});
        expect(wrapper).toMatchSnapshot();
    });

    it("should match saved snapshot (isCAPS(i) === 0)", () => {
        const caps = passwordObject.caps;
        passwordObject.caps = 0;

        const {wrapper} = setup({});
        expect(wrapper).toMatchSnapshot();
        passwordObject.caps = caps;
    });

    it("should toggle password's Up/Lower case when caps button is clicked", () => {
        const toggleCAPS = spyOn(passwordObject, 'toggleCAPS').and.callThrough();
        const separatedPassword = spyOn(passwordObject, 'separatedPassword').and.callThrough();
        const {wrapper} = setup({
            toggleCAPS: toggleCAPS,
            separatedPassword: separatedPassword
        });

        wrapper.find({type: "caps"}).forEach((button, i) => {
            let separator = passwordObject.separators[i];
            let isCAPS = passwordObject.isCAPS(i);
            let prevPassword = separatedPassword(separator, i);

            expect(isCAPS).toEqual(Math.pow(2, i));

            button.simulate('click');
            expect(passwordObject.isCAPS(i)).toEqual(0);
            expect(toggleCAPS).toHaveBeenCalledWith(i);
            expect(separatedPassword).toHaveBeenCalledWith(separator, i);
            expect(separatedPassword(separator, i)).toEqual(prevPassword.toLowerCase());

            button.simulate('click');
            expect(passwordObject.isCAPS(i)).toEqual(Math.pow(2, i));
            expect(toggleCAPS).toHaveBeenCalledWith(i);
            expect(separatedPassword).toHaveBeenCalledWith(separator, i);
            expect(separatedPassword(separator, i)).toEqual(prevPassword);
        });
    });

    it("should have 4 props", () => {
        const propsStr = 'separators toggleCAPS isCAPS separatedPassword';
        const props = [];
        for (let prop in Variants.propTypes) props.push(prop);
        expect(props.join(' ') === propsStr).toBe(true);
    });
});