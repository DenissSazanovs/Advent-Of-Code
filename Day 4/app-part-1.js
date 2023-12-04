const fs = require('fs');
const readline = require('readline');

let result = 0;

const rd = readline.createInterface({
    input: fs.createReadStream('data'),
    console: false
});

rd.on('line', (line) => {
    let match = 0;
    const data = line.split(/\|/);
    const winNumbers = data[0].trim().split(/\s+/).splice(2);
    const elfNumber = data[1].trim().split(/\s+/);
    winNumbers.forEach(number => {
        if (elfNumber.includes(number) && match > 0) {
            match *= 2;
        } else if (elfNumber.includes(number)) {
            match = 1;
        }
    })
    result += match;
});

rd.on('close', () => {
    console.log(result);
});