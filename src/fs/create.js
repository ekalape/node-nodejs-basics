import fs from 'fs';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const TEXT = 'I am fresh and young';

const currentPath = path.join(__dirname, 'files', 'fresh.txt');

const create = async () => {
  fs.open(currentPath, 'wx', (err) => {
    if (err) throw Error('FS operation failed');
    else
      fs.writeFile(currentPath, TEXT, (err) => {
        if (err) throw Error('Writing operation failed');
      });
  });
};

await create();
