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

const fromHeartToSun = (i, j, length) => {
    let count = 0;
    if (i >= 0 && i < length && j >= 0 && j < fullData[i].length) {
        const directions = [
            [-1, -1], // up-left
            [-1, 1],  // up-right
            [1, -1],  // down-left
            [1, 1]    // down-right
        ];
        
        for (const [dx, dy] of directions) {
            const newX = i + dx;
            const newY = j + dy;
            if (newX >= 0 && newX < length && newY >= 0 && newY < fullData[newX].length) {
                if (fullData[newX][newY] === 'M') {
                    const oppositeX = i - dx;
                    const oppositeY = j - dy;
                    if (oppositeX >= 0 && oppositeX < length && oppositeY >= 0 && oppositeY < fullData[oppositeX].length) {
                        if (fullData[oppositeX][oppositeY] === 'S') {
                            count++;
                        }
                    }
                }
            }
        }
    }
    return count === 2 ? 1 : 0;
}

let result = 0;
const fullData = [];

rd.on('line', (line) => {
    fullData.push(line.split(''));
});

rd.on('close', () => {
    for(let i = 0; i < fullData.length; i++) {
        for (let j = 0; j < fullData[i].length; j++) {
            if (fullData[i][j] === 'A') {
                result += fromHeartToSun(i, j, fullData.length);
            }
        }
    }
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
    console.log(result);
});