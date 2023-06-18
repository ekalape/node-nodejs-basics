import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';
import path from 'path';
import * as url from 'url';
const { hkdf } = await import('node:crypto');

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const currentPath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
  // calculates SHA256 hash for file fileToCalculateHashFor.txt and logs it into console as hex

  const text = await readFile(currentPath).catch((err) => console.log(err));

  hkdf('sha256', text, 'salt', 'info', 24, (err, derivedKey) => {
    if (err) throw err;
    console.log(Buffer.from(derivedKey).toString('hex'));
  });
};

await calculateHash();
