const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');
inputArray = inputArray.map((el) => el.split(" "));

console.table(inputArray);

let head = {
    x: 0,
    y: 0
}

let tail = {
    x: 0,
    y: 0,
    positions: new Map()
}

inputArray.forEach(([direction, amount]) => {
    for(i=0;i<parseInt(amount);i++) {
        switch (direction) {
            case "U":
                head.y += 1;
                break;
            case "L":
                head.x -= 1;
                break;
            case "D":
                head.y -= 1;
                break;
            case "R":
                head.x += 1;
                break;
        }


        moveTail(  head.x +1 > tail.x   
                || head.x -1 < tail.x   
                || head.y +1 > tail.y   
                || head.y -1 < tail.y);

    }
});

function moveTail(diagonaal) {
    if (head.x > tail.x+1) {
        tail.x += 1
        if (diagonaal) {
            if(head.y > tail.y) {
                tail.y++;
            } else if (head.y < tail.y) {
                tail.y--;
            }
        }
    } else if (head.x < tail.x-1) {
        tail.x -= 1
        if (diagonaal) {
            if(head.y > tail.y) {
                tail.y++;
            } else if (head.y < tail.y) {
                tail.y--;
            }
        }
    } else if (head.y > tail.y+1) {
        tail.y += 1
        if (diagonaal) {
            if(head.x > tail.x) {
                tail.x++;
            } else if (head.x < tail.x) {
                tail.x--;
            }
        }
    } else if (head.y < tail.y-1) {
        tail.y -= 1
        if (diagonaal) {
            if(head.x > tail.x) {
                tail.x++;
            } else if (head.x < tail.x) {
                tail.x--;
            }
        }
    }
    tail.positions.set(`${tail.y}-${tail.x}`, 1);
}


console.log("------");
console.table(head);
console.table(tail);
console.log(tail.positions.size)

