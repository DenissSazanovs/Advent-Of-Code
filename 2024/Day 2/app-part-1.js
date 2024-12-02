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
    const data = line.split(/\s+/).map(Number);
    const firstDiffSign = Math.sign(data[0] - data[1]);
    const len = data.length;

    for (let i = 0; i < len - 1; i++) {
        const current = data[i];
        const next = data[i + 1];

        if (next === undefined) continue;

        const diff = current - next;
        const diffSign = Math.sign(diff);

        if (diffSign !== firstDiffSign || Math.abs(diff) > 3 || current === next) {
            break;
        }

        if (i === len - 2) {
            result += 1;
        }
    }
});

rd.on('close', () => {
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
    console.log(result);
});