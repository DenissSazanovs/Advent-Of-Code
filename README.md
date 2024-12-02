# Advent Of Code 2023 - 2024

Welcome to the Advent Of Code project!

## Setup

Before running the scripts, you need to set up your environment by creating a `.env` file in the project's root folder. Add your cookie string under the `COOKIE` variable in the `.env` file.

```plaintext
# .env
COOKIE=your_cookie_string_here
Make sure to keep your cookie information secure and not share it publicly.
```

## Installation
To install the project dependencies, run:

```bash
npm install
```

## Scripts
### 1. Run Data Script
To fetch data for a specific day, use the following command:

```bash
npm run data -- <Day>
```

Replace <Day> with the day number (starting from 2) for which you want to fetch data.

### 2. Run Start Script
To run the main script for a specific day and part, use the following command:

```bash
npm run start -- <Day> <Part>
```

Replace <Day> with the day number (starting from 2), and <Part> with either 1 or 2 to indicate the part of the challenge.

## Example Usage
### Fetch Data for Day 3

```bash
npm run data 3
```

### Run Main Script for Day 4, Part 1

```bash
npm run start 4 1
```

### Run Main Script for Day 4, Part 2

```bash
npm run start 4 2
```

Feel free to adapt the information in this README to fit your project's specific needs. Good luck with your Advent of Code challenges!
