import perf from 'execution-time';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

perf().start();

const data = fs.readFileSync(`${__dirname}/data`, 'utf8');
const lines = data.split('\n');

const len = lines.length;
const firstID = new Array(len);
const secondID = new Array(len);

for (let i = 0; i < len; i++) {
    const [first, second] = lines[i].split(/\s+/);
    firstID[i] = +first;
    secondID[i] = second;
}

const counts = {};
for (let i = 0; i < len; i++) {
    const id = secondID[i];
    counts[id] = (counts[id] || 0) + 1;
}

let result = 0;
for (let i = 0; i < len; i++) {
    const count = counts[firstID[i]];
    if (count) result += firstID[i] * count;
}

const results = perf().stop();
console.log(`Time to finish - ${results.time} ms`);
console.log(result);