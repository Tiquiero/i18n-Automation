const { TASK, configFileName } = require('../const');
const { getPathConcat, isPathExist } = require('../utils/pathUtils');
const { configFileNotFoundErrorHandler, configParseErrorHandler } = require('../Handler/errorHandler');
const { getPathConcat } = require('../utils/fileUtils');
const { Extract } = require('../Controller/extract');
const { Translate } = require('../Controller/translate');
const { Generate } = require('../Controller/generate');

// 启动器
exports.tasksLauncher = (taskQueue, workDir) => {
  const config = readJsonConfig(workDir);
  // let queuePointer = 0;
  // const taskIteratorAsync = () => {
  //   if (queuePointer === taskQueue.length) {
  //     return
  //   }
  //   taskGo(taskQueue[queuePointer], config).then(() => {
  //     queuePointer++;
  //     taskIteratorAsync();
  //   })
  // }
  // return taskIteratorAsync();
  if (!taskQueue.length) return;
  taskQueue.forEach(i => taskStart(i, config));
}

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