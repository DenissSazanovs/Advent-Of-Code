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
const cardsCopies = []
let idx = 0

rd.on('line', (line) => {
    const data = line.split(/\|/);
    const winNumbers = data[0].trim().split(/\s+/).splice(1);
    const elfNumbers = data[1].trim().split(/\s+/);
    const winnedNumbers = (winNumbers.filter(number => elfNumbers.includes(number))).length
    if (cardsCopies[idx] === undefined) {
        cardsCopies[idx] = 1
    }
    for (let i = idx +1; i < idx +1 + winnedNumbers; i++) {
        cardsCopies[i] = cardsCopies[i] !== undefined ? cardsCopies[i] + cardsCopies[idx] : cardsCopies[idx] + 1
    }
    result += cardsCopies[idx]
    idx++
});

rd.on('close', () => {
    console.log(result)
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
});