import path from 'path';
import { constants } from 'node:fs';
import * as url from 'url';
import * as fsPromises from 'node:fs/promises';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const currentPath = path.join(__dirname, 'files', 'fileToRemove.txt');

const errorMessage = 'FS operation failed';

const remove = async () => {
  try {
    await fsPromises.rm(currentPath);
  } catch (err) {
    throw Error(errorMessage);
  }
};

await remove();
