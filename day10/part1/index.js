const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');
inputArray = inputArray.map((el) => el.split(" "));

console.table(inputArray);

let cycle = 0;
let registerX = 1;
let strengths = [];

inputArray.forEach(([action, amount]) => {
    addCycle();
    if (action === "addx") {
        addCycle();
        registerX += parseInt(amount);
    }
});


function addCycle() {
    cycle++;
    if (cycle == 20 || cycle == 60 || cycle == 100 || cycle == 140 || cycle == 180 || cycle == 220) {
        console.log(`${cycle} * ${registerX}`)
        strengths.push(cycle * registerX);
    }
}
console.log(strengths)
console.log(strengths.reduce((num1, num2) => num1 + num2));