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

let rows = 0;
let antinodes = [];
const antennas = new Map();

rd.on('line', (line) => {
    for (let i = 0; i < line.length; i++) {
        if (line[i] !== '.') {
            if (!antennas.has(line[i])) {
                antennas.set(line[i], []);
            }
            antennas.get(line[i]).push([rows, i]);
        }
    }
    rows++;
    if (antinodes.length < rows) {
        antinodes.push(new Array(line.length).fill(0));
    }
});

rd.on('close', () => {
    for (const coords of antennas.values()) {
        const numCoords = coords.length;
        for (let i = 0; i < numCoords - 1; i++) {
            const [y, x] = coords[i];
            for (let j = i + 1; j < numCoords; j++) {
                const [y2, x2] = coords[j];
                const dy = y2 - y;
                const dx = x2 - x;

                const newCoords = [
                    [y2 + dy, x2 + dx],
                    [y - dy, x - dx],
                ];

                for (const [y3, x3] of newCoords) {
                    if (y3 >= 0 && y3 < antinodes.length && x3 >= 0 && x3 < antinodes[y3].length) {
                        if (antinodes[y3][x3] === 0) {
                            antinodes[y3][x3] = 1;
                        }
                    }
                }
            }
        }
    }

    const total = antinodes.flat().reduce((acc, n) => acc + n, 0);
    console.log(total);

    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
});