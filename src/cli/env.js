const parseEnv = () => {
  const result = [];
  Object.entries(process.env).filter((x) => {
    if (x[0].match('^RSS_')) result.push(`${x[0]}=${x[1]}`);
  });
  console.log(result.join('; '));
};

parseEnv();
