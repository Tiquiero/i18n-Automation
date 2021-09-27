const lodash = require('lodash/fp');

const initMdTableStrByHeadArr = (headRow) => {
  // ['key', '中文']
  let headRowStr = '|';
  let secondRowStr = '|';
  headRow.forEach(i => {
    headRowStr += `${i}|`;
    secondRowStr += '-----|';
  });
  // |key|中文|
  // |-----|-----|
  return `${headRowStr}\r\n${secondRowStr}\r\n`;
}