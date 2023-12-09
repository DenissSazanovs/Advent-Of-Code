import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).replace('/\s/g', '\ ');

const [, , day, part] = process.argv;

const scriptPath = path.join(__dirname + '/..', `Day ${day}`, `app-part-${part}.js`);

try {
  execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
