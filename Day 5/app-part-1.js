import perf from 'execution-time';
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

perf().start();
let result = [];
const seedPath = [[]];
const regExp = /[a-zA-Z]/;

const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data`),
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
    seedPath[0][0].forEach(element => {
        for (let i = 1; i < seedPath.length; i++) {
            for (let j = 0; j < seedPath[i].length; j++) {
                if (element <= seedPath[i][j][1] + seedPath[i][j][2] && element >= seedPath[i][j][1]) {
                    element = element - (seedPath[i][j][1]-seedPath[i][j][0]);
                    break;
                }
            }
        }
        result.push(element);
    });
    console.log(Math.min(...result));
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
});