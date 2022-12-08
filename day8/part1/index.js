const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');
inputArray = inputArray.map((el) => el.split(""));

console.table(inputArray);


let visibleTreeCounter = 0;

for(y=0; y < inputArray.length;y++) {
    const row = inputArray[y];
    for (x=0; x < row.length; x++) {
        if (x == 0 || y == 0 || y+1 == inputArray.length || x+1 == row.length) {
            //edge
            visibleTreeCounter++;
            //visualize
            inputArray[y][x] = parseInt(inputArray[y][x]);
        } else {
            if (lookDirection({x, y, mx: 0, my: 1}, row[x])
                || lookDirection({x, y, mx: 0, my: -1}, row[x])
                || lookDirection({x, y, mx: -1, my: 0}, row[x])
                || lookDirection({x, y, mx: 1, my: 0}, row[x])
                ) {
                    visibleTreeCounter++;
                    inputArray[y][x] = parseInt(inputArray[y][x]);
                }
        }
    }
}

console.table(inputArray);
console.log(visibleTreeCounter);


function lookDirection({mx, my, x, y}, height) {
    let stoped = false;
    while (!stoped) {
        x += mx;
        y += my;
        let row = inputArray[y];
        if (x == -1 || y == -1 || y == inputArray.length || x == row.length) {
            //out of bound
            stoped = true;
            return true;
        } else if (parseInt(inputArray[y][x]) >= parseInt(height)) {
            stoped = true;
            return false;
        }
    }

}