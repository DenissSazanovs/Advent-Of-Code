import perf from 'execution-time';
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import pathFile from 'path';
import lcm from 'lcm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathFile.dirname(__filename);


const startingPoints = [];
const leftPart = {};
const rightPart = {};
let directions;

let result = 1;

perf().start();

const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data`),
    console: false
});

rd.on('line', (line) => {
    if (line.includes('=')) {
        const [source, destination] = line.split(' = ');
    
        if (source[2] === 'A') {
            startingPoints.push(source);
        }
        
        const [left, right] = destination.slice(1, -1).split(', ');
    
        leftPart[source] = left;
        rightPart[source] = right;
    } else if (line.length !== 0) {
        directions = [...line];
    }
});

rd.on('close', () => {
    startingPoints.forEach((point) => {
        let steps = 0;
        let directionIndex = 0;
    
        while (point[2] !== 'Z') {
            let direction = directions[directionIndex];
    
            steps += 1;
    
            if (direction === 'L') {
                point = leftPart[point];
            } else {
                point = rightPart[point];
            }
    
            directionIndex = (directionIndex + 1) % directions.length;
        }
        result = lcm(result, steps);
    });

    console.log(result);
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
});
