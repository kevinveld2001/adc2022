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
        elfs[elf_index] = parseInt(element)
    } else {
        elfs[elf_index] += parseInt(element);
    }
    
});

console.log(Math.max(...elfs));