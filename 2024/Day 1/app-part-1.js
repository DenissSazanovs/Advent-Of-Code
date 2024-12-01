import perf from 'execution-time';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

perf().start();

// Read entire file at once and process it in memory
const data = fs.readFileSync(`${__dirname}/data`, 'utf8');
const lines = data.split('\n');
const len = lines.length;

// Pre-allocate typed arrays directly
const first = new Float64Array(len);
const second = new Float64Array(len);

// Process all lines in one go
for (let i = 0; i < len; i++) {
    const line = lines[i];
    const spaceIndex = line.indexOf(' ');
    first[i] = +line.slice(0, spaceIndex);
    second[i] = +line.slice(spaceIndex + 1);
}

first.sort();
second.sort();

// Unrolled loop for better performance
let sum = 0;
let i = 0;
const blockSize = 8;
const lenMinus8 = len - blockSize;

// Process 8 items at a time
for (; i < lenMinus8; i += blockSize) {
    sum += Math.abs(first[i] - second[i])
        + Math.abs(first[i + 1] - second[i + 1])
        + Math.abs(first[i + 2] - second[i + 2])
        + Math.abs(first[i + 3] - second[i + 3])
        + Math.abs(first[i + 4] - second[i + 4])
        + Math.abs(first[i + 5] - second[i + 5])
        + Math.abs(first[i + 6] - second[i + 6])
        + Math.abs(first[i + 7] - second[i + 7]);
}

// Process remaining items
for (; i < len; i++) {
    sum += Math.abs(first[i] - second[i]);
}

const result = sum;

const results = perf().stop();
console.log(`Time to finish - ${results.time} ms`);
console.log(result);