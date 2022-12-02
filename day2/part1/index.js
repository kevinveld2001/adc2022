const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');

let gameInput = [];
inputArray.forEach((el) => {
    gameInput.push(el.split(" "));
});

console.table(gameInput);

let score = 0;

const codeToIndex = {
    X: 0, // rock
    Y: 1, // paper
    Z: 2, // Scissors
    A: 0, // rock
    B: 1, // paper
    C: 2  // Scissors
}


//          X,Y,Z
const scoreMap = [
    /**A*/[4,8,3],
    /**B*/[1,5,9],
    /**C*/[7,2,6]
]

gameInput.forEach((el) => {
    score += scoreMap[codeToIndex[el[0]]][codeToIndex[el[1]]];
});

console.log(score);
