import perf from 'execution-time';
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let result = 0;

perf().start();
const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data`),
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
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
});