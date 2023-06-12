import path from 'path';
import * as url from 'url';
import * as fsPromises from 'node:fs/promises';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const currentPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files_copy');

const copy = async () => {
  let exists;
  try {
    exists = await fsPromises.opendir(destPath);
  } catch (err) {}
  if (exists) throw Error('FS operation failed: destination directory has already been created');
  else {
    await copyDir(currentPath, destPath);
  }

  async function copyDir(srcPath, destPath) {
    await fsPromises.mkdir(destPath, { recursive: true });
    const files = await fsPromises.readdir(srcPath, { withFileTypes: true }).catch((err) => {
      throw Error("FS operation failed: source directory doesn't exists");
    });
    for (let i = 0; i < files.length; i++) {
      if (!files[i].isDirectory()) {
        await fsPromises
          .copyFile(path.join(srcPath, files[i].name), path.join(destPath, files[i].name))
          .catch();
        console.log(`copying ${files[i].name}`);
      } else {
        await copyDir(path.join(srcPath, files[i].name), path.join(destPath, files[i].name));
      }
    }
  }
};

await copy();
