const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');
inputArray = inputArray.map((el) => el.split(" "));
let sprite = [1, 2, 3];
let cycle = 0;
let registerX = 1;

let crt =
[
    `........................................`.split(''),
    `........................................`.split(''),
    `........................................`.split(''),
    `........................................`.split(''),
    `........................................`.split(''),
    `........................................`.split(''),
    `........................................`.split('')
];
console.table(crt);

inputArray.forEach(([action, amount]) => {
    addCycle();
    if (action === "addx") {
        addCycle();
        registerX += parseInt(amount);
        sprite = [registerX-1, registerX, registerX+1];
    

    }
});

function addCycle() {

    if (sprite.includes(cycle%40)) {
        console.log(`[${Math.round(cycle/40)}][${(cycle%40)}]`);
        crt[Math.round(cycle/40)][(cycle%40)] = "#";
    }
    cycle++;
}


console.table(crt.map(row => row.join("")).join("\n"));