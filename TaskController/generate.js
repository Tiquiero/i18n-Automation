const { getAbsolutePath } = require('../utils/pathUtils');
const { generateService } = require('../TaskService/generate');

const Generate = (config) => {
  const { fromMarkdown, toLocales, rules } = config;
  return new Promise((resolve, reject) => {
    generateService(fromMarkdown.map((mdPath) => getAbsolutePath(mdPath)), getAbsolutePath(toLocales), rules);
    resolve();
  })
}

module.exports = { Generate };