import path from 'path';
import { constants } from 'node:fs';
import * as url from 'url';
import * as fsPromises from 'node:fs/promises';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
const newPath = path.join(__dirname, 'files', 'properFilename.md');
const errorMessage = 'FS operation failed';

const rename = async () => {
  try {
    await fsPromises.access(oldPath, constants.F_OK);
    const file = await fsPromises.open(newPath).catch(async () => {
      await fsPromises.rename(oldPath, newPath, (err) => {
        throw err;
      });
    });
    if (file) {
      throw Error(errorMessage);
    }
  } catch (err) {
    throw Error(errorMessage);
  }
};

await rename();
