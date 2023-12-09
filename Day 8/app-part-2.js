const perf = require('execution-time')();
const fs = require('fs');
const readline = require('readline');
const lcm = require('lcm');

const startingPoints = [];
const leftPart = {};
const rightPart = {};
let directions;

let result = 1;

perf.start();

const rd = readline.createInterface({
    input: fs.createReadStream('data'),
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
    const results = perf.stop();
    console.log(`Time to finish - ${results.time} ms`);
});
