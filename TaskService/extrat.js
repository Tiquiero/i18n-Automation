
const path = require('path');
const { extraIO } = require('../TaskIO');
const { getAllDirNameRecursion, getFilesPathArrByDir, resetDir, getFileNameNoSuffix } = require('../utils/fileUtils');
const { getSliceBasePath, getPathType, getDirPathFiltered, getFilePathFiltered } = require('../utils/pathUtils');

const extraCodeFile = (codeFile, mdDir, rules) => {
  const toMdFile = path.join(mdDir, getFileNameNoSuffix(codeFile) + '.md');
  extraIO(codeFile, toMdFile, rules);
}

const extraCodeDir = (codeDir, mdDir, rules, options) => {
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
      extraCodeFile(filePath, curMdDirPath, rules);
    })
  })
}

// fromCode是一个字符串
const fromCodeTypeOfString = (fromCode, toMarkdown, rules) => {
  switch (getPathType(fromCode)) {
    case 'file':
      extraCodeFile(fromCode, toMarkdown, rules);
      break;
    case 'dir':
      extraCodeDir(fromCode, toMarkdown, rules);
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
        extraCodeDir(i.path, toMarkdown, rules, options);
        break;
    }
  })
}

exports.extraService = (fromCode, toMarkdown, rules) => {
  resetDir(toMarkdown);
  if (typeof fromCode === 'string') {
    fromCodeTypeOfString(fromCode, toMarkdown, rules);
  } else if (Array.isArray(fromCode)) {
    fromCodeTypeOfArray(fromCode, toMarkdown, rules);
  }
}
