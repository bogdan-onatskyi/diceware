import Block from './src_tutor/bem/bem';


const b = new Block('container');

// Setup namespace
b.setup({
    ns: 'wb-',
    el: '__',
    mod: '--',
    modValue: '-'
});

console.log('1', b.className(''));
console.log('2', b.className('code'));
console.log('3', b.className('el1 el2 el3 el4'));
console.log('4', b.className('', 'el1', 'el2', '', 'el4'));
console.log('5', b.className('code dddddd', {'selected': true}, {'code': '1'}, 'aaaa', 'bbb'));
console.log('6', b.className({'selected': true}, {'code': '1'}, 'aaaa', 'bbb'));
console.log('7', b.className({'el1': true}, {'el2': false}, {'el3': 'selected'}, {'el4': 'new'}));
console.log('8', b.className(''));
console.log('9', b.className('el1', 'el2', 'el3', 'el4', 'el5'));


// b({mod: 'value'});

// console.log(b('element')());
// console.log(b({mod: 'value'})());

// console.log(codeToInt(3));
// console.log(codeToInt(4575));
// console.log(codeToInt(7775));

