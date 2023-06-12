import path from 'path';
import * as url from 'url';
import * as fsPromises from 'node:fs/promises';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const currentPath = path.join(__dirname, 'files');

const errorMessage = 'FS operation failed';

const list = async () => {
  try {
    const dir = await fsPromises.readdir(currentPath);
    console.log(dir);
  } catch (err) {
    throw Error(errorMessage);
  }
};

await list();
