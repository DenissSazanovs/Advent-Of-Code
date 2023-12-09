import perf from 'execution-time';
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

perf().start();
const document = new Map();

const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data`),
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
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
});
