import path from 'path';
import * as url from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'node:stream';
import { createGunzip } from 'node:zlib';
import { exit } from 'node:process';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const currentPath = path.join(__dirname, 'files', 'fileToCompress.txt');
const archivePath = path.join(__dirname, 'files', 'archive.gz');

const decompress = async () => {
  // decompresses archive.gz back to the fileToCompress.txt with same content as before compression using zlib and Streams API
  const rStream = createReadStream(archivePath);
  const wStream = createWriteStream(currentPath);
  const compressFile = createGunzip();
  pipeline(rStream, compressFile, wStream, (err) => {
    if (err) console.error('Error', err);
    exit();
  });
};

await decompress();
