
const fs = require('fs');
const { initMdTableStrByHeadArr } = require("../utils/md-helper");
const { createFile } = require("../utils/fileUtils");

// 从句子中取出一个符合规则的键
const extraWordsBySentence = (sentence, wordsReg, wordsRegIndex) => {
  let words = '_';
  if (sentence.match(wordsReg) !== null) words = sentence.match(wordsReg)[wordsRegIndex];
  return words;

  sentence.match(wordsReg) !== null ? sentence.match(wordsReg)[wordsRegIndex] : '_'
}


exports.extraIO = (fromCodeFilePath, toMdFilePath, rules) => {
  console.log('-------------------------------------------------------------------------');
  console.log(fromCodeFilePath);

  // 读取文件内容
  const context = fs.readFileSync(fromCodeFilePath, { encoding: 'utf-8' });
  const { columnInfo, rowData } = rules;
  // 处理文件内容
  let content = initMdTableStrByHeadArr(columnInfo.map(c => c.name));
  rowData.forEach(row => {
    const { sentenceReg, element } = row;
    // 根据正则匹配内容
    const sentences = context.match(sentenceReg);
    if (sentences !== null) {
      sentences.forEach(sentence => {
        let rowData = [];
        element.forEach((ele) => {
          const { columnNum, wordsReg, wordsRegIndex } = ele;
          const sentenceVal = sentence.match(wordsReg);
          rowData[columnNum - 1] = sentenceVal !== null ? sentenceVal[wordsRegIndex] : '_';
        })
        console.log(sentence);
        console.log(rowData);
        // content = insertRowByPrimaryLimit(content, rowData);
      })
    }
  });
  // fs.writeFileSync(createFile(toMdFilePath), content);
  console.log('-------------------------------------------------------------------------');
}