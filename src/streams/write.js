import path from 'path';
import * as url from 'url';
import { stdin } from 'node:process';
import { createWriteStream } from 'fs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const currentPath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
  // writes process.stdin data into file fileToWrite.txt content using Writable Stream
  try {
    const stream = createWriteStream(currentPath, { encoding: 'utf-8' });
    console.log('Write smth (ctrl+C to stop): ');
    stdin.pipe(stream);
    process.on('SIGINT', () => {
      console.log('Your text is saved to the file. Thank you!');
      process.exit();
    });
  } catch (err) {
    console.log(err);
  }
};

await write();
