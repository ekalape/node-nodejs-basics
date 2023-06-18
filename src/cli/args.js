import { argv } from 'node:process';

const parseArgs = () => {
  const result = [];
  const args = argv.slice(2);
  for (let i = 0; i < args.length - 1; i += 2) {
    if (args[i].match('^--')) {
      result.push(`${args[i].slice(2)} is ${args[i + 1]}`);
    }
  }
  console.log(result.join(', '));
};

parseArgs();
