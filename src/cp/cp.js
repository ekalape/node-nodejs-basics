import { spawn } from 'node:child_process';
import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const currentPath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const child = spawn('node', [currentPath, ...args]);
  console.log(`Main process id: ${process.pid}`);

  process.stdin.on('data', (data) => {
    child.stdin.write(data);
  });

  child.stdout.on('data', (data) => {
    console.log(`child with id ${child.pid} >>> ${data}`);
  });
  child.on('error', (err) => {
    console.log(`Error: ${err}`);
  });
};

spawnChildProcess(['someArgument1', 'someArgument2']);
