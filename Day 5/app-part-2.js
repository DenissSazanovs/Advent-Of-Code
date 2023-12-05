const perf = require('execution-time')();
const fs = require('fs');
const readline = require('readline');

perf.start();
let result = 1551952886000; //random big number
const seedPath = [[]];
const regExp = /[a-zA-Z]/;

const rd = readline.createInterface({
    input: fs.createReadStream('data'),
    console: false
});

rd.on('line', (line) => {
    let dataWithNumbers = [];
    if (line.includes('seeds')) {
        const data = line.split(':')[1].trim().split(' ');
        data.forEach(element => {
            dataWithNumbers.push(Number(element))
        })
        seedPath[0].push(dataWithNumbers);
    }
    else if (line !== '') {
        const data = line.trim().split(' ');
        data.forEach(element => {
            dataWithNumbers.push(Number(element))
        })
        if (regExp.test(line)) {
            seedPath.push([]);
        } else {
            seedPath[seedPath.length - 1].push(dataWithNumbers);
        }
    }
});

rd.on('close', () => {
    for (let k = 0; k < seedPath[0][0].length; k+=2) {
        console.log(k);
        for (let q = seedPath[0][0][k]; q < seedPath[0][0][k] + seedPath[0][0][k+1]; q++){
            let element = q;
            for (let i = 1; i < seedPath.length; i++) {
                for (let j = 0; j < seedPath[i].length; j++) {
                    if (element <= seedPath[i][j][1] + seedPath[i][j][2] && element >= seedPath[i][j][1]) {
                        element = element - (seedPath[i][j][1]-seedPath[i][j][0]);
                        break;
                    }
                }
            }
            if (result > element) {
                result = element;
            }
        }
    }
    console.log(result);
    const results = perf.stop();
    console.log(`Time to finish - ${results.time} ms`);
});