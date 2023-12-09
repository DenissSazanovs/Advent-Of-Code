const perf = require('execution-time')();
const fs = require('fs');
const readline = require('readline');

perf.start();
let result = 0;

const rd = readline.createInterface({
    input: fs.createReadStream('data'),
    console: false
});

rd.on('line', (line) => {   
    const data = line.split(' ').map(Number).reverse();

    while (data.some(x => x !== 0)) {
        for (let i = 0; i < data.length - 1; i++) {
            data[i] = data[i + 1] - data[i];
        }
        result += data.pop();
    }
});

rd.on('close', () => {
    console.log(result);
});
