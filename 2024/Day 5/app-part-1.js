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

const containsAny = (arr1, arr2) => {
    return arr1.some(item => arr2.includes(item));
}

const rules = new Map();

let result = 0;
let rulesInProgress = true;

rd.on('line', (line) => {
    if (line.length < 2) {
        rulesInProgress = false;
        return;
    }

    if (rulesInProgress) {
        const [key, value] = line.split('|');
        rules.set(key, [...(rules.get(key) || []), value]);
    } else {
        const page = line.split(',');
        const seenValues = new Set();
        let goodPage = true;

        for (const value of page) {
            if (rules.has(value) && containsAny(rules.get(value), [...seenValues])) {
                goodPage = false;
                break;
            }
            seenValues.add(value);
        }

        if (goodPage) {
            result += Number(page[Math.floor(page.length / 2)]);
        }
    }
});

rd.on('close', () => {
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
    console.log(result);
});