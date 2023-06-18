import { Worker, isMainThread } from 'node:worker_threads';
import { availableParallelism } from 'node:os';

import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const currentPath = path.join(__dirname, 'worker.js');

const performCalculations = async () => {
  const numCPUs = availableParallelism();
  const threads = [];
  if (isMainThread) {
    for (let i = 0; i < numCPUs; i++) {
      threads.push(
        new Promise((res, rej) => {
          const worker = new Worker(currentPath, {
            workerData: i + 10,
          });
          worker.on('message', (msg) => res(msg));
          worker.on('error', (msg) => rej(msg));
        }),
      );
    }
  }
  const result = await Promise.allSettled(threads);
  console.log(
    result.map((x) => ({
      status: x.status === 'fulfilled' ? 'resolved' : 'error',
      data: x.value ? x.value : null,
    })),
  );
};

await performCalculations();
