const fs = require('fs');
const PATH = require('path');

exports.isPathExist = (path) => {
  return fs.existsSync(path)
}

exports.getPathConcat = (path1, path2) => {
  return PATH.join(path1, path2);
}

exports.getPathAbsolute = (pathR) => {
  const workDir = process.cwd();
  if (pathR === '.') {
    return workDir
  } else {
    return PATH.join(workDir, pathR);
  }
}
