const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');

let commonLetters = [];
let priorities = [];

let sum = 0;

inputArray.forEach((el) => {
    console.log(el)
    let first = el.slice(0, el.length/2); 
    let second = el.slice(el.length/2, el.length); 

    console.log(first + "-" + second)
    for (i =0; i < first.length; i++) {
        if (second.includes(first.charAt(i))) {
            commonLetters.push(first.charAt(i));
            let ascii = first.charCodeAt(i);
            let sumValue
            if (ascii >= 97 && ascii <= 122) {
                sumValue = (ascii - 96);
            } else {
                sumValue = (ascii - 38);
            }
            sum += sumValue
            priorities.push(sumValue);
            break;
        }
    }

});
console.log(commonLetters);
console.log(priorities);

console.log(sum);