const PATH = require('path');
const { createDir, deleteDir, createFile, getFileNameNoSuffix, getAllDirNameRecursion, getFilesPathArrByDir } = require('../utils/fileUtils');
const { getPathType, getSliceBasePath } = require('../utils/pathUtils');
const {
  generateResourceFileIO,
  generateResImpAndExpFileIO,
} = require('../taskIO/generate');

const convertMdFile = (mdFilePath, resPath, rules) => {
  rules.forEach((rule) => {
    const { fromColumn, toResource } = rule;
    const { name } = toResource;
    const { keyColumnNum, valColumnNum } = fromColumn;

    const resFileNamePath = PATH.join(resPath, name);
    const resFilePath = PATH.join(resFileNamePath, PATH.basename(mdFilePath).replace('.md', '.js'));

    // 每个文件对应的内容
    generateResourceFileIO(mdFilePath, keyColumnNum - 1, valColumnNum - 1, resFilePath);

    // zh-CN.js，en-US.js的内容
    generateResImpAndExpFileIO(createFile(resFileNamePath + '.js'), getFileNameNoSuffix(mdFilePath), `./${name}`);
  });
}

const convertMdDir = (mdDirPath, resPath, rules) => {
  rules.forEach((rule) => {
    const { fromColumn, toResource } = rule;
    const { name } = toResource;
    const { keyColumnNum, valColumnNum } = fromColumn;

    const withNameResPath = PATH.join(resPath, name); // example: 创建en-US文件夹
    const resImpAndExpFilePath = createFile(PATH.join(resPath, name) + '.js'); // example: 创建en-US.js文件
    // 获取所有的文件夹
    const mdDirPathArr = getAllDirNameRecursion(mdDirPath);
    mdDirPathArr.forEach((curMdDirPath) => {
      let relativePath = '';
      let curResPath = withNameResPath;

      // 构造relativePath和curResPath
      if (curMdDirPath !== mdDirPath) {
        relativePath = '/' + getSliceBasePath(curMdDirPath, mdDirPath);
        curResPath = PATH.join(withNameResPath, getSliceBasePath(curMdDirPath, mdDirPath));
      }
      // 处理当前md文件夹下的所有文件
      const files = getFilesPathArrByDir(curMdDirPath, /.md/);
      files.forEach((filePath) => {
        const resFilePath = PATH.join(curResPath, PATH.basename(filePath).replace('.md', '.js'));
        generateResourceFileIO(filePath, keyColumnNum - 1, valColumnNum - 1, resFilePath);
        generateResImpAndExpFileIO(resImpAndExpFilePath, getFileNameNoSuffix(filePath), `./${name}${relativePath}`);
      })
    })
  })
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