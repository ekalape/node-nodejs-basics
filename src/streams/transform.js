import { stdin, stdout } from 'node:process';
import { Transform } from 'node:stream';

const transform = async () => {
  // reads data from process.stdin, reverses text using Transform Stream and then writes it into process.stdout
  console.log('Write smth: ');
  const reverseText = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().trim().split('').reverse().join('') + '\n');
    },
  });
  stdin
    .on('error', (err) => console.log('input error', err))
    .pipe(reverseText)
    .on('error', (err) => console.log('transform fn error', err))
    .pipe(stdout)
    .on('error', (err) => console.log('output error', err));
};

await transform();
