const { getAbsolutePath, getPathConcat } = require('../utils/pathUtils');
const { fromCodeErrorHandler } = require('../errorHandler');
const { extraService } = require('../TaskService/extra');

const convertFromCodeConfig = (fromCode) => {
  if (typeof fromCode === 'string') {
    return getAbsolutePath(fromCode);
  }
  if (Array.isArray(fromCode)) {
    fromCode.forEach((i, idx) => {
      if (typeof i === 'string') {
        fromCode[idx] = getAbsolutePath(i);
      } else {
        fromCodeErrorHandler();
        return;
      }
    })
    return fromCode;
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
    extraService(convertFromCodeConfig(fromCode), getPathAbsolute(toMarkdown), convertRulesConfig(rules));
    resolve();
  })
}