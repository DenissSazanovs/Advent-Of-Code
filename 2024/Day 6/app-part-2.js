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

const movement = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const originalMap = [];
const uniqueCor = new Set();
const isLooped = new Set();
let loop = 0;

let guardPos;

const moveIt = (map, guardPos, wall) => {
    isLooped.clear();
    let movingDir = 0;
    let notExited = true;

    if (wall) {
        const wallCor = wall.split(',');
        map[Number(wallCor[0])][Number(wallCor[1])] = '#';
    }

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
            movingDir += 1;
            continue;
        } 

        guardPos = [nextPosY, nextPosX];
        if (isLooped.has(`${guardPos[0]},${guardPos[1]}:${movingDir}`)) {
            loop += 1;
            notExited = false;
        };
        isLooped.add(`${guardPos[0]},${guardPos[1]}:${movingDir}`);


        if (!wall) {
            uniqueCor.add(`${nextPosY},${nextPosX}`);
        }
    }
}

rd.on('line', (line) => {
    originalMap.push(line.split(''));
    if (line.includes('^')) {
        guardPos = [originalMap.length - 1, line.indexOf('^')];
        uniqueCor.add(`${guardPos[0]},${guardPos[1]}`);
    }
});

rd.on('close', () => {
    moveIt(JSON.parse(JSON.stringify(originalMap)), guardPos);
    for (const position of uniqueCor) {
        moveIt(JSON.parse(JSON.stringify(originalMap)), guardPos, position);
    }
    console.log(loop);
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
});