import perf from 'execution-time';
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import pathFile from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathFile.dirname(__filename);

const route = new Map();
const directions = new Map([['R', 1], ['L', 0]]);
const path = [];

perf().start();

const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data`),
    console: false
});

rd.on('line', (line) => {
    if (line.includes('=')) {
        const data = line.trim().split(/[ ,=()]+/);
        route.set(data[0], [data[1], data[2]]);
    } else if (line.length > 0) {
        for (const direction of line) {
            path.push(directions.get(direction));
        }
    }    
});

rd.on('close', () => {
    console.log(move('AAA', path, route));
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
});

function move(start, path, route, counter = 0) {
    for (const turn of path) {
        start = route.get(start)[turn];
        counter++;
        if (start === 'ZZZ') return counter;
    }
    return start === 'ZZZ' ? counter : move(start, path, route, counter);
}
