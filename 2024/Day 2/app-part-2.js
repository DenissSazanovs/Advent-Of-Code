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

const mostFrequentValue = (arr) => {
    const counts = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});

    if (!counts[1]) return -1;  
    if (!counts[-1]) return 1;   

    return counts[1] > counts[-1] ? 1 : -1;
}

const checkSafe = (data, firstRun) => {
    const len = data.length;
    const deltas = new Array(len - 1);

    for (let i = 0; i < len - 1; i++) {
        deltas[i] = Math.sign(data[i] - data[i + 1]);
    }

    const baseDiffSign = mostFrequentValue(deltas);

    for (let i = 0; i < len - 1; i++) {
        const diff = data[i] - data[i + 1];
        const diffSign = Math.sign(diff);

        if (diffSign !== baseDiffSign || Math.abs(diff) > 3 || diff === 0) {
            return i;
        }
    }

    if (firstRun) {
        result++;
    }
    return undefined;
}

let result = 0;

rd.on('line', (line) => {
    const data = line.split(/\s+/).map(Number);
    const index = checkSafe(data, true);

    if (index !== undefined) {
        const newDataRight = data.slice(0, index).concat(data.slice(index + 1));
        const newDataLeft = data.slice(0, index + 1).concat(data.slice(index + 2));

        if (checkSafe(newDataRight) === undefined || checkSafe(newDataLeft) === undefined) {
            result++;
        }
    }
});

rd.on('close', () => {
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
    console.log(result);
});