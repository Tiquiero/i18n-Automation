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

// mdTable字符串转换为矩阵（二维数组）
const mdTableStrToMatrixObj = (table) => {
  const filterBlank = (item) => { return item != '' };
  const convertTrToArr = (tr) => {
    const convertTrStream = lodash.flowRight(lodash.map(lodash.trim), lodash.filter(filterBlank), [lodash.split('|')])
    return convertTrStream(tr);
  }
  const convertTableStream = lodash.flowRight([lodash.map(convertTrToArr), lodash.filter(filterBlank), lodash.split('\r\n')]);
  return convertTableStream(table);
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

const matrixObjTomdTableStr = (matrix) => {
  let mdTableStr = '';
  const convertArrToTr = (arr) => {
    let trStr = '|' + arr.join('|') + '|';
    return trStr
  }
  matrix.forEach((arr) => {
    const trStr = convertArrToTr(arr);
    mdTableStr += trStr + '\r\n';
  })
  return mdTableStr;
}

const insertRow = (content, rowData) => {
  const matrix = content ? mdTableStrToMatrixObj(content) : [];
  matrix.push(rowData);
  let newContent = matrixObjTomdTableStr(matrix);
  console.log("newContent-----", newContent)

  return newContent;
}

module.exports = { initMdTableStrByHeadArr, insertRow };