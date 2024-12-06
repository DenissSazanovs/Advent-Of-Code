import perf from 'execution-time';
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';
import { type } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


perf().start();

const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data`),
    console: false
});

const movement = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const map = [];
const uniqueCor = new Set();

let guardPos;
let notExited = true;

rd.on('line', (line) => {
    map.push(line.split(''));
    if (line.includes('^')) {
        guardPos = [map.length - 1, line.indexOf('^')];
        uniqueCor.add(`${guardPos[1]},${guardPos[0]}`);
    }
});

rd.on('close', () => {
    let movingDir = 0;
    while (notExited) {
        let nextPosX, nextPosY;

        if (movingDir >= movement.length) {
            movingDir = 0;
        }

        try {
            nextPosX = guardPos[1] + movement[movingDir][1];
            nextPosY = guardPos[0] + movement[movingDir][0];
            if (typeof map[nextPosY][nextPosX] === 'undefined') {
                throw new Error('Huinja');
            }
        } catch {
            notExited = false;
            continue
        };

        if (map[nextPosY][nextPosX] === '#') {
            // console.log(nextPosY, nextPosX);
            movingDir += 1;
            continue;
        } 

        guardPos = [nextPosY, nextPosX];
        uniqueCor.add(`${nextPosY},${nextPosX}`);
    }
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
    console.log(uniqueCor.size);
});