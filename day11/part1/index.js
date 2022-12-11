const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');

let monkeys = [];

for (i=1;i < inputArray.length; i+=7) {
    let startingItems = inputArray[i].split(": ")[1].split(", ").map(item => parseInt(item));
    let operation = inputArray[i+1].split(" = ")[1];
    let test = parseInt(inputArray[i+2].split(": ")[1].split(" ")[2]);

    let ifTrue = parseInt(inputArray[i+3].split(": ")[1].split(" ")[3]);
    let ifFalse = parseInt(inputArray[i+4].split(": ")[1].split(" ")[3]);

    monkeys.push({
        startingItems,
        operation,
        test,
        ifTrue,
        ifFalse,
        inspectedItems: 0
    })
}

for(round=0; round< 20; round++) {
    monkeys.forEach(monkey => {
        let itemListLength = monkey.startingItems.length;
        for (i=0;i<itemListLength; i++) {
            let item = monkey.startingItems.shift();
            let afterOperation = eval(monkey.operation.replace(new RegExp(/old/, 'g'), item))
            afterOperation = Math.floor(afterOperation / 3);
            if (afterOperation% monkey.test == 0) {
                monkeys[monkey.ifTrue].startingItems.push(afterOperation);
            } else {
                monkeys[monkey.ifFalse].startingItems.push(afterOperation);
            } 
            monkey.inspectedItems++;
        }
    });
}

let inspectedItems = monkeys.map(monkey => monkey.inspectedItems).sort((num1, num2) => num2 - num1);
console.table(inspectedItems[0] * inspectedItems[1]);