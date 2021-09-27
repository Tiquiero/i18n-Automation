const path = require('path');
const { getAbsolutePath } = require('../utils/pathUtils');
const { fromCodeErrorHandler } = require('../errorHandler');
const { extraService } = require('../TaskService/extrat');

const convertFromCodeConfig = (fromCode) => {
  // 获取 fromCode 配置的路径
  if (typeof fromCode === 'string') {
    return getAbsolutePath(fromCode);
  }
  if (Array.isArray(fromCode)) {
    const newFromCode = fromCode;
    fromCode.forEach((i, idx) => {
      if (typeof i === 'string') {
        fromCode[idx] = getAbsolutePath(i);
      } else if (typeof i === 'object') {
        const basePath = getAbsolutePath(i.path);
        newFromCode[idx] = {
          ...i,
          path: basePath,
          excluded: i.excluded.map((exclud) => {
            return path.join(basePath, exclud)
          }),
          suffixs: i.suffixs.map((strReg) => {
            return eval(strReg);
          }),
          notSuffixs: i.notSuffixs.map((strReg) => {
            return eval(strReg);
          })
        }
      } else {
        fromCodeErrorHandler();
        return;
      }
    })
    return newFromCode;
  }
}

const convertRulesConfig = (rules) => {
  rules.rowData = rules.rowData.map((i) => {
    const { sentenceReg, element } = i;
    return {
      sentenceReg: eval(sentenceReg),
      element: element.map((ele) => {
        return {
          ...ele,
          wordsReg: eval(ele.wordsReg)
        }
      })
    }
  })
  return rules;
}

exports.taskExtra = (config) => {
  return new Promise((resolve, reject) => {
    const { fromCode, toMarkdown, rules } = config;
    extraService(convertFromCodeConfig(fromCode), getAbsolutePath(toMarkdown), convertRulesConfig(rules));
    resolve();
  })
}