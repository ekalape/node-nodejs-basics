import path from 'path';
import * as url from 'url';
import { stdout } from 'node:process';
import { createReadStream } from 'fs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const currentPath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  //  reads file fileToRead.txt content using Readable Stream and prints it's content into process.stdout
  try {
    const stream = createReadStream(currentPath, { encoding: 'utf-8' });
    stream.pipe(stdout);
  } catch (err) {
    console.log(err);
  }
};

await read();
