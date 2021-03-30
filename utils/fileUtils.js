const fs = require('fs');
const PATH = require('path');

exports.readFileBuffer = (filePath, options) => {
  return fs.readFileSync(filePath, options);
}

exports.writeFileBuffer = (filePath, content) => {
  return fs.writeFileSync(filePath, content);
}

exports.createDir = (dirPath) => {
  if (!isPathExist(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // 多级创建
  }
}

exports.createFile = (filePath) => {
  const dirPath = PATH.dirname(filePath);
  createDir(dirPath);
  if (!isPathExist(filePath)) {
    fs.openSync(filePath, 'w')
  }
}
