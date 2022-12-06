const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});

let buffer = file.split('');

let charBuffer = "";


console.log(buffer)

buffer.forEach((el, index) => {
    console.log(charBuffer)
    
    charBuffer += el;

    if(charBuffer.length > 5) {
        charBuffer = charBuffer.slice(charBuffer.length-5, charBuffer.length);
    }
    if (charBuffer.length > 4 ) {
        let dubble = false;
        for (i =0; i < charBuffer.length; i++) {
            for (y =0; y < charBuffer.length; y++) {
                if (i != y && charBuffer.charAt(i) == charBuffer.charAt(y)) {
                    dubble = true;
                }
            }
        }
        if (!dubble) {
            console.log(parseInt(index));
            process.exit();
        }
    }
});