const { TASK, configFileName } = require('../const');
const { getPathConcat, isPathExist } = require('../utils/pathUtils');
const { configFileNotFoundErrorHandler, configParseErrorHandler } = require('../errorHandler');
const { Extract, Translate, Generate } = require('../TaskController/index');
const { readFileBuffer, writeFile } = require("../utils/fileUtils");

// 读取配置文件
const readJsonConfig = (workDir) => {
  const configFilePath = getPathConcat(workDir, configFileName);
  if (!isPathExist(configFilePath)) configFileNotFoundErrorHandler();
  try {
    const jsonObj = readFileBuffer(configFilePath);
    return JSON.parse(jsonObj);
  } catch(e) {
    configParseErrorHandler(e);
  }
};

// 任务分配器：分配到对应的taskController
const taskStart = (taskType, config) => {
  const { extract, translate, generate } = config;
  
  switch (taskType) {
    case TASK.EXTRACT:
      return Extract(extract);
    case TASK.TRANSLATE:
      return Translate(translate);
    case TASK.GENERATE:
      return Generate(generate);
  }
}

// 启动器
exports.tasksLauncher = (taskQueue, workDir) => {
  if (!taskQueue.length) return;
  const config = readJsonConfig(workDir);
  taskQueue.forEach(i => taskStart(i, config));
}



