const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');

let pairs = []

inputArray.forEach((el) => {
    pairs.push(el.split(","));

    pairs[pairs.length-1][0] = pairs[pairs.length-1][0].split("-");
    pairs[pairs.length-1][1] = pairs[pairs.length-1][1].split("-");
    
});
console.table(pairs);


let containsCounter = 0;

pairs.forEach((el) => {
    let [first, second] = el;

    if (parseInt(first[0]) <= parseInt(second[1]) && parseInt(first[1]) >= parseInt(second[0])) {
        containsCounter++;
    } else if (parseInt(second[0]) <= parseInt(first[1]) && parseInt(second[1]) >= parseInt(first[0])) {
        containsCounter++;
    }

    if (parseInt(first[0]) < parseInt(second[0])) {}

});
console.log(containsCounter)