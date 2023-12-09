import fetch from 'node-fetch';
import fs from 'fs/promises';
import 'dotenv/config';

const filePath = `Day ${process.argv[2]}/data`; // Specify the desired file path

// Check if the file exists
try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    console.log('File already exists. If you want to download a new file, remove the previous one.');
} catch (error) {
    // File doesn't exist, make a new request
    const response = await fetch(`https://adventofcode.com/2023/day/${process.argv[2]}/input`, {
        method: 'get',
        headers: {
            "Cookie": `session=${process.env.COOKIE}`
        }
    });

    // Check if the response status is not 200 (OK)
    if (response.status !== 200) {
        console.error(`Failed to fetch data. Status: ${response.status}`);
        process.exit(1); // Exit the process with an error code
    }

    const body = await response.text();

    // Save the response to the file
    await fs.writeFile(filePath, body);
}
