const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');
inputArray = inputArray.map((el) => el.split(""));

console.table(inputArray);


let visibleTreeCounter = 0;
let scenicScore = 0;

for(y=0; y < inputArray.length;y++) {
    const row = inputArray[y];
    for (x=0; x < row.length; x++) {
        if (x == 0 || y == 0 || y+1 == inputArray.length || x+1 == row.length) {
            //edge
            visibleTreeCounter++;
            //visualize
            inputArray[y][x] = parseInt(inputArray[y][x]);
        } else {
            let direction1 = lookDirection({x, y, mx: 0, my: 1}, row[x]);
            let direction2 = lookDirection({x, y, mx: 0, my: -1}, row[x]);
            let direction3 = lookDirection({x, y, mx: -1, my: 0}, row[x]);
            let direction4 = lookDirection({x, y, mx: 1, my: 0}, row[x]);

            if (direction1.edge
                || direction2.edge
                || direction3.edge
                || direction4.edge
                ) {
                    visibleTreeCounter++;
                    inputArray[y][x] = parseInt(inputArray[y][x]);
                    [direction1, direction2, direction3, direction4] = [direction1, direction2, direction3, direction4].map(num => num.steps>0?num.steps:1);
                    
                    let newScenicScore = direction1 * direction2 * direction3 * direction4;
                    console.log("test" + newScenicScore);
                    if (newScenicScore > scenicScore) {
                        scenicScore = newScenicScore;
                    }
                }
        }
    }
}

console.table(scenicScore);
console.log(visibleTreeCounter);


function lookDirection({mx, my, x, y}, height) {
    let stoped = false;
    let steps = 0;
    while (!stoped) {
        x += mx;
        y += my;
        
        steps++;
        let row = inputArray[y];
        if (x == -1 || y == -1 || y == inputArray.length || x == row.length) {
            //out of bound
            stoped = true;

            steps-=1
            return {steps, edge: true};
        } else if (parseInt(inputArray[y][x]) >= parseInt(height)) {
            stoped = true;
            return {steps, edge: false};
        }

    }

}