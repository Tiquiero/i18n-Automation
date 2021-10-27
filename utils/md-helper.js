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


/**
 *  mdTable 字符串转换为矩阵（二维数组）,因为根据正则解析到的内容rowData最后是一个数组
 *  所以先全拼成数组后再转换为md
 *  例如:  |key|中文| -> [['key', '中文']]
 */
const mdTableStrToMatrixObj = (table) => {
  const filterBlank = (item) => { return item != '' };
  const convertTrToArr = (tr) => {
    const convertTrStream = lodash.flowRight(lodash.map(lodash.trim), lodash.filter(filterBlank), [lodash.split('|')])
    return convertTrStream(tr);
  }
  const convertTableStream = lodash.flowRight([lodash.map(convertTrToArr), lodash.filter(filterBlank), lodash.split('\r\n')]);
  return convertTableStream(table);
}

const matrixObjTomdTableStr = (matrix) => {
  let mdTableStr = '';
  matrix.forEach((arr) => {
    mdTableStr += `|${arr.join('|')}|` + '\r\n';
  });
  return mdTableStr;
}

const insertRow = (content, rowData) => {
  const matrix = content ? mdTableStrToMatrixObj(content) : [];
  matrix.push(rowData);
  let newContent = matrixObjTomdTableStr(matrix);
  return newContent;
}

const columnArrToColumnObj = (columnArr) => {
  const columnHead = columnArr[0];
  columnArr.shift();// 去除表头
  columnArr.shift();// 去除|...|...|
  return { columnHead, columnData: columnArr }
}

// 读取一列 { head, data }
const selectColumn = (content, columnIndex) => {
  const matrix = mdTableStrToMatrixObj(content);
  const columnArr = [];
  matrix.forEach(row => {
      columnArr.push(row[columnIndex]);
  });
  const columnObj = columnArrToColumnObj(columnArr);
  return columnObj;
}

module.exports = { initMdTableStrByHeadArr, insertRow };