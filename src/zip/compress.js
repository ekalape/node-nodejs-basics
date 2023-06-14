import path from 'path';
import * as url from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'node:stream';
import { createGzip } from 'node:zlib';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const currentPath = path.join(__dirname, 'files', 'fileToCompress.txt');
const archivePath = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
  // compresses file fileToCompress.txt to archive.gz using zlib and Streams API

  const rStream = createReadStream(currentPath);
  const wStream = createWriteStream(archivePath);
  const compressFile = createGzip();
  pipeline(rStream, compressFile, wStream, (err) => {
    if (err) console.error('Error', err);
    process.exit();
  });
};

await compress();
