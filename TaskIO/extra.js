
const fs = require('fs');

exports.extraIO = (fromCodeFilePath, toMdFilePath, rules) => {
  console.log(fromCodeFilePath);
  ('-------------------------------------------------------------------------');

  const context = fs.readFileSync(fromCodeFilePath, { encoding: 'utf-8' });
  

  console.log('-------------------------------------------------------------------------');
}