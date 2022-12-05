const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');

let emptyLineIndex = 0;

inputArray.forEach((el, index) => {
    if (el === "") {
        emptyLineIndex = index;
    }
});
console.log(emptyLineIndex);

let cargo = [];

let indexing = true;

// l = line number
for (l = emptyLineIndex-1; l >= 0 ; l--) {
    let rowNumber = 0;
    for (i = 1; i < inputArray[l].length; i+=4) {
        if (inputArray[l].charAt(i-1) === "[") {
            console.log(inputArray[l].charAt(i));
            cargo[rowNumber].push(inputArray[l].charAt(i))
        } else if (indexing) {
            cargo.push([]);
        }
        rowNumber++;
    }
    indexing = false;
}

console.table(cargo);

for (l = emptyLineIndex+1; l < inputArray.length ; l++) { 
    let instructionArray = inputArray[l].split(' ');
    let instructionAmount = parseInt(instructionArray[1]);
    let instructionFrom = parseInt(instructionArray[3]) -1;
    let instructionTo = parseInt(instructionArray[5]) - 1;
    let size = cargo[instructionFrom].length;

    let moveCargo = cargo[instructionFrom].slice(size - instructionAmount, size);
    cargo[instructionFrom] = cargo[instructionFrom].slice(0, size - instructionAmount);
    console.log(moveCargo);
    for (i = moveCargo.length-1; i >=0 ; i--) {
        cargo[instructionTo].push(moveCargo[i]);
    }
    
    console.table(cargo);
}


console.table(cargo);

let output = "";
cargo.forEach((el) => {
    output += el[el.length-1];
});
console.log(output);
