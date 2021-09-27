const fs = require('fs');
const PATH = require('path');

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

exports.getDirPathFiltered = (dirPathArr, excluded) => {
  let filterResult = dirPathArr.filter((dirPath) => {
    if (excluded.includes(dirPath)) return false;
    return true;
  })
  return filterResult;
}

exports.getSliceBasePath = (path, basepath) => {
  return path.split(basepath + '\\')[1];
}

exports.getFilePathFiltered = (filePathArr, options) => {
  const { excluded, suffixRegArr, notSuffixRegArr } = options;
  let filterResult = filePathArr.filter((filePath) => {
    const fileName = PATH.basename(filePath);
    if (excluded && excluded.includes(fileName)) return false;
    const suffix = fileName.match(/(\..+)$/)[1];
    let regMapResult = false;
    if (suffixRegArr) {
      for (let i = 0; i < suffixRegArr.length; i++) {
        if (suffixRegArr[i].test(suffix)) {
          regMapResult = true;
          break;
        }
      }
    }
    if (notSuffixRegArr) {
      for (let i = 0; i < notSuffixRegArr.length; i++) {
        if (notSuffixRegArr[i].test(suffix)) {
          regMapResult = false;
          break;
        }
      }
    }
    return regMapResult
  });
  return filterResult
}