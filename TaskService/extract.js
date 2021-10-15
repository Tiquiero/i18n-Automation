
const path = require('path');
const { extractIO } = require('../TaskIO/extract');
const { getAllDirNameRecursion, getFilesPathArrByDir, resetDir, getFileNameNoSuffix } = require('../utils/fileUtils');
const { getSliceBasePath, getPathType, getDirPathFiltered, getFilePathFiltered } = require('../utils/pathUtils');

const extractCodeFile = (codeFile, mdDir, rules) => {
  const toMdFile = path.join(mdDir, getFileNameNoSuffix(codeFile) + '.md');
  extractIO(codeFile, toMdFile, rules);
}

const extractCodeDir = (codeDir, mdDir, rules, options) => {
  let dirPathArr = getAllDirNameRecursion(codeDir);
  if (options && options.excluded) {
    dirPathArr = getDirPathFiltered(dirPathArr, options.excluded)
  }
  dirPathArr.forEach((curDirPath) => {
    let curMdDirPath;
    // 截取相对路径获取mdDirPath
    if (curDirPath === codeDir) {
      curMdDirPath = mdDir;
    } else {
      curMdDirPath = path.join(mdDir, getSliceBasePath(curDirPath, codeDir));
    }
    let files = getFilesPathArrByDir(curDirPath);
    // 获取当前文件夹下的符合后缀规则的文件
    if (options) {
      files = getFilePathFiltered(files, options);
    }
    files.forEach((filePath) => {
      extractCodeFile(filePath, curMdDirPath, rules);
    })
  })
}

// fromCode是一个字符串
const fromCodeTypeOfString = (fromCode, toMarkdown, rules) => {
  switch (getPathType(fromCode)) {
    case 'file':
      extractCodeFile(fromCode, toMarkdown, rules);
      break;
    case 'dir':
      extractCodeDir(fromCode, toMarkdown, rules);
      break;
    default:
      break;
  }
}

// fromCode是一个数组
const fromCodeTypeOfArray = (fromCode, toMarkdown, rules) => {
  fromCode.forEach((i) => {
    switch (typeof i) {
      case 'string':
        fromCodeTypeOfString(i, toMarkdown, rules);
        break;
      case 'object':
        const options = {
          excluded: i.excluded,
          suffixs: i.suffixs,
          notSuffixs: i.notSuffixs,
        }
        extractCodeDir(i.path, toMarkdown, rules, options);
        break;
    }
  })
}

exports.extractService = (fromCode, toMarkdown, rules) => {
  resetDir(toMarkdown);
  if (typeof fromCode === 'string') {
    fromCodeTypeOfString(fromCode, toMarkdown, rules);
  } else if (Array.isArray(fromCode)) {
    fromCodeTypeOfArray(fromCode, toMarkdown, rules);
  }
}
