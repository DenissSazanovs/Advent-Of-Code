import perf from 'execution-time';
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

perf().start();
let result = 0;

const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data`),
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
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
});
