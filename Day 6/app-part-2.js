const fs = require('fs');
const readline = require('readline');

const document = new Map();

const rd = readline.createInterface({
    input: fs.createReadStream('data'),
    console: false
});

rd.on('line', (line) => {
    const splitResult = line.trim().split(/:\s+/);
    document.set(splitResult[0], splitResult[1].replace(/\s+/g, ''));
});

rd.on('close', () => {
    const time = Number(document.get('Time'));
    const distance = Number(document.get('Distance'));

    let result = 0;
    for (let timeToHold = 0; timeToHold < time; timeToHold++) {
        if ((time - timeToHold) * timeToHold > distance) {
            result++;
        }
    }

    console.log(result);
});
