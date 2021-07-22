const fs = require('fs');
const PATH = require('path');

const isPathExist = (path) => {
  return fs.existsSync(path);
}

exports.isPathExist = isPathExist;

exports.readFileBuffer = (filePath, options) => {
  return fs.readFileSync(filePath, options);
}

exports.writeFileBuffer = (filePath, content) => {
  return fs.writeFileSync(filePath, content);
}

exports.createFile = (filePath) => {
  const dirPath = PATH.dirname(filePath);
  createDir(dirPath);
  if (!isPathExist(filePath)) {
    fs.openSync(filePath, 'w')
  }
}

exports.createDir = (dirPath) => {
  if (!isPathExist(dirPath)) {
     // recursive: 支持递归创建
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

exports.deleteDir = (dirPath) => {
  if(isPathExist(dirPath)) {
    const files = fs.readdirSync(dirPath);
    if (files.length) {
      files.forEach(file => {
        let curPath = PATH.join(dirPath, file);
        if(fs.lstatSync(curPath).isDirectory()) {
          deleteDir(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
    }
    fs.rmdirSync(dirPath);
  }
}

exports.resetDirectory = (path) => {
  deleteDir(path);
  createDir(path);
}