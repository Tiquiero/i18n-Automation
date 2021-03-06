const fs = require('fs');
const PATH = require('path');

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
     // recursive: 支持递归创建
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

exports.createDir = createDir;

exports.createFile = (filePath) => {
  const dirPath = PATH.dirname(filePath);
  createDir(dirPath);
  if (!fs.existsSync(filePath)) fs.openSync(filePath, 'w');
  return filePath;
}

const deleteDir = (dirPath) => {
  if(fs.existsSync(dirPath)) {
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

exports.deleteDir = deleteDir;

exports.resetDir = (path) => {
  deleteDir(path);
  createDir(path);
}

exports.getFileNameNoSuffix = (filePath) => {
  const fileName = PATH.basename(filePath);
  return fileName.match(/([^\.]+)/)[1];
}

exports.getAllDirNameRecursion = (dirPath) => {
  const dirPathArr = [];
  const recursion = (dirPath, dirPathArr) => {
    dirPathArr.push(dirPath);
    const dirs = fs.readdirSync(dirPath).filter((item) => {
      const statObj = fs.statSync(PATH.join(dirPath, item)); // 返回该路径的文件信息
      return statObj.isDirectory();
    });
    dirs.forEach((dir) => {
      recursion(PATH.join(dirPath, dir), dirPathArr)
    });
  }
  recursion(dirPath, dirPathArr);
  return dirPathArr;
}

exports.getFilesPathArrByDir = (dirPath, fileNameReg) => {
  let filesPathArr = [];
  let files = fs.readdirSync(dirPath).filter((item) => {
    // 过滤文件夹
    const statObj = fs.statSync(PATH.join(dirPath, item));
    return !statObj.isDirectory();
  });
  if (fileNameReg) {
    files = files.filter((fileName) => {
      const fileSuffix = fileName.match(/(\..+)$/)[1];
      return fileNameReg.test(fileSuffix);
    })
  }
  files.forEach((file) => {
    filesPathArr.push(PATH.join(dirPath, file));
  })
  return filesPathArr;
}