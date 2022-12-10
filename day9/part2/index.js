const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');
inputArray = inputArray.map((el) => el.split(" "));

console.table(inputArray);

let rope = [
    {
        x: 0,
        y: 0
    }
]
for (i=0;i<9;i++) {
    rope.push({
        x: 0,
        y: 0
    });
}

let positions = new Map();

inputArray.forEach(([direction, amount]) => {
    console.log(`${direction} ${amount}`); 
    let head = rope[0];
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
        
        for (ropeIndex= 1; ropeIndex < 10; ropeIndex++) {
            let tail = rope[ropeIndex];
            let head = rope[ropeIndex-1];
            moveTail(  head.x +1 > tail.x   
                    || head.x -1 < tail.x   
                    || head.y +1 > tail.y   
                    || head.y -1 < tail.y, head, tail, ropeIndex==9);

        }
        console.log("size: " + positions.size);
    }
});

function moveTail(diagonaal, head, tail, last) {

    if (last) {
        positions.set(`${tail.y}-${tail.x}`, 1);
    }

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

}


console.log("------");
console.table(rope);
console.log(positions.size+1)

