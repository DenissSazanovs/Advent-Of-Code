import perf from 'execution-time';
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


perf().start();

const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data`),
    console: false
});

let result = 0;

rd.on('line', (line) => {
    const regex = /mul\((\d+),(\d+)\)/g;
    let match;
    
    while ((match = regex.exec(line)) !== null) {
        result += Number(match[1]) * Number(match[2]);
    }
});

rd.on('close', () => {
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
    console.log(result);
});