// const { extraIO } = require('../taskIO/extra');
const { getAllDirNameRecursion, getFilesPathArrByDir, resetDir } = require('../utils/fileUtils');
const { getPathConcat, getSliceBasePath, getPathType, getFileNameNoSuffix, getDirPathFiltered, getFilePathFiltered } = require('../utils/pathUtils');

const extraCodeFile = (codeFile, mdDir, rules) => {
  const toMdFile = getPathConcat(mdDir, getFileNameNoSuffix(codeFile) + '.md');
  // extraIO(codeFile, toMdFile, rules);
}

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

const fromCodeTypeOfArray = (fromCode, toMarkdown, rules) => {
  fromCode.forEach((i) => {
    fromCodeTypeOfString(i, toMarkdown, rules);
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
