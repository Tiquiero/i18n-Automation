const PATH = require('path');
const { createDir, deleteDir, createFile, getFileNameNoSuffix } = require('../utils/fileUtils');
const {
  getPathType,
} = require('../utils/pathUtils');

const convertMdFile = (mdFilePath, resPath, rules) => {
  rules.forEach((rule) => {
    const { fromColumn, toResource } = rule;
    const { name } = toResource;
    const { keyColumnNum, valColumnNum } = fromColumn;

    const resFileNamePath = PATH.join(resPath, name);
    const resFilePath = PATH.join(resFileNamePath, PATH.basename(mdFilePath).replace('.md', '.js'));
    generatorResourceFileIO(mdFilePath, keyColumnNum - 1, valColumnNum - 1, resFilePath);
    generatorResImpAndExpFileIO(createFile(resFileNamePath + '.js'), getFileNameNoSuffix(mdFilePath), `./${name}`);
  });
}

exports.generateService = (fromMarkdown, resPath, rules) => {
  deleteDir(resPath);
  createDir(resPath);
  fromMarkdown.forEach((mdPath) => {
    switch (getPathType(mdPath)) {
      case 'file':
        convertMdFile(mdPath, resPath, rules);
        break;
      case 'dir':
        convertMdDir(mdPath, resPath, rules);
        break;
    }
  });
}