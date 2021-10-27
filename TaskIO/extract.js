
const fs = require('fs');
const { initMdTableStrByHeadArr, insertRow } = require("../utils/md-helper");
const { createFile } = require("../utils/fileUtils");

exports.extractIO = (fromCodeFilePath, toMdFilePath, rules) => {
  console.log('-------------------------------------------------------------------------');

  // 读取文件内容
  const context = fs.readFileSync(fromCodeFilePath, { encoding: 'utf-8' });
  const { columnInfo, rowData } = rules;

  // 处理文件内容
  let content = initMdTableStrByHeadArr(columnInfo.map(c => c.name));
  // console.log("content-----", content)

  rowData.forEach(row => {
    const { sentenceReg, element } = row;
    // 根据正则匹配内容
    const sentences = context.match(sentenceReg);
    if (sentences !== null) {
      sentences.forEach(sentence => {
        let newRowData = [];
        element.forEach((ele) => {
          const { columnNum, wordsReg, wordsRegIndex } = ele;
          const sentenceVal = sentence.match(wordsReg);
          
          // 从句子中取出一个符合规则的键
          newRowData[columnNum - 1] = sentenceVal !== null ? sentenceVal[wordsRegIndex] : '_';
        })
        console.log('newRowData----', newRowData);
        content = insertRow(content, newRowData);
      })
    }
  });
  fs.writeFileSync(createFile(toMdFilePath), content);
  console.log('-------------------------------------------------------------------------');
}