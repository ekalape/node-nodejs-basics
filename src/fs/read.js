import path from 'path';
import * as url from 'url';
import * as fsPromises from 'node:fs/promises';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const currentPath = path.join(__dirname, 'files', 'fileToRead.txt');

const errorMessage = 'FS operation failed';

const read = async () => {
  try {
    const text = await fsPromises.readFile(currentPath, { encoding: 'utf-8' });
    console.log(text);
  } catch (err) {
    throw Error(errorMessage);
  }
};

await read();
