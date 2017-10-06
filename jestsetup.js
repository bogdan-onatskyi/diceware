import {shallow, render, mount} from 'enzyme';

global.shallow = shallow;
global.render = render;
global.mount = mount;

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});


// console.error = message => {
//     throw new Error(message);
// };