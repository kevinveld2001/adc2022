const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');

let sum = 0;

for (i=0; i<inputArray.length; i+=3) {
    let groupMember1 = inputArray[i];
    let groupMember2 = inputArray[i+1];
    let groupMember3 = inputArray[i+2];

    for (a =0; a < groupMember1.length; a++) {
        if (groupMember2.includes(groupMember1.charAt(a))
        && groupMember3.includes(groupMember1.charAt(a))) {
            let prioritie = letterToPriorities(groupMember1.charAt(a));

            sum += prioritie
            break;
        }
    }

}
console.log(sum);



function letterToPriorities(letter) {
    let ascii = letter.charCodeAt(0);
    let sumValue
    if (ascii >= 97 && ascii <= 122) {
        sumValue = (ascii - 96);
    } else {
        sumValue = (ascii - 38);
    }
    return sumValue;
}