const fs = require('fs');
const readline = require('readline');

let result = 0;

const rd = readline.createInterface({
    input: fs.createReadStream('data'),
    console: false
});

rd.on('line', (line) => {
    const data = line.split(/\|/);
    const winNumbers = data[0].trim().split(/\s+/).splice(1);
    const elfNumbers = data[1].trim().split(/\s+/);
    cards.set(Number(winNumbers[0].slice(0, -1)), [winNumbers.splice(1), elfNumbers]);
});

rd.on('close', () => {
});