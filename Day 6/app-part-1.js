const fs = require('fs');
const readline = require('readline');

let result = 1;
const document = new Map();

const rd = readline.createInterface({
    input: fs.createReadStream('data'),
    console: false
});

rd.on('line', (line) => {
    const splitResult = line.trim().split(/\s+/);
    document.set(splitResult[0].slice(0, -1), [...splitResult.slice(1)])
});

rd.on('close', () => {
    for (let game = 0; game < document.get('Time').length; game++) {
        const time = Number(document.get('Time')[game]);
        const distance = Number(document.get('Distance')[game]);
        result *= Array.from({ length: time }, (_, timeToHold) => (time - timeToHold) * timeToHold > distance).filter(Boolean).length; //for loop actually works faster, but just wanted to try this approach
    } 
    console.log(result);
});