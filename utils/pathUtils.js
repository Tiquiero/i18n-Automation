const fs = require('fs');
const PATH = require('path');

exports.isPathExist = (path) => {
  return fs.existsSync(path)
}

exports.getPathConcat = (path1, path2) => {
  return PATH.join(path1, path2);
}

exports.getAbsolutePath = (path) => {
  const workDir = process.cwd();
  if (path === '.') {
    return workDir
  } else {
    return p.join(workDir, path);
  }
}

exports.getPathType = (path) => {
  return fs.statSync(path).isDirectory() ? 'dir' : 'file';
}

exports.getFileNameNoSuffix = (filePath) => {
  const fileName = PATH.basename(filePath);
  return fileName.match(/([^\.]+)/)[1];
}