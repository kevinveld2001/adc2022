const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\n');

let elfs = [];
let elf_index = 0;

inputArray.forEach(element => {
    if (element.length == 1) {
        elf_index++;
        return;
    }
    if (elfs[elf_index] == undefined) {
        elfs[elf_index] = parseInt(element);
    } else {
        elfs[elf_index] += parseInt(element);
    }
    
});
elfs = elfs.sort((callories1, callories2) => callories2 - callories1);
console.log(elfs);
elfs = elfs.slice(0, 3);
console.log(elfs.reduce((oldValue, newValue) => oldValue + newValue, 0));