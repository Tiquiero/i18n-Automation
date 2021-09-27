const path = require('path');
const fs = require('fs');
const { TASK, helpMessage, configFileName } = require('./const');
const { argumentErrorHanler, initConfigFileErrorHandler, configFileNotFoundErrorHandler, configParseErrorHandler } = require('./errorHandler');
const { Extract, Translate, Generate } = require('./TaskController/index');

const workDir = process.cwd();
const argv = process.argv.slice(2);

if (argv.length === 0) argv.push('help');

const initConfig = (workDir) => {
  try {
    const configTp = fs.readFileSync(path.join(__dirname, `./templates/${configFileName}`));
    const targetConfigPath = path.join(workDir, configFileName);
    fs.writeFileSync(targetConfigPath, configTp);
  } catch {
    initConfigFileErrorHandler();
  }
}

// 解析第一个参数
const argv1Handler = argv1 => {
  switch (argv1) {
    case 'init':
      initConfig(workDir);
      process.exit(0);
    case 'help':
      console.log(helpMessage);
      process.exit(0);
    default:
      argumentErrorHanler();
  }
}

// 解析第二个参数
const argv2Handler = (argv2) => {
  let taskQueue = [];
  switch(argv2) {
    case '-e':
      taskQueue = [TASK.EXTRACT];
      break;
    case '-g':
      taskQueue = [TASK.GENERATE];
      break;
    case '-eg':
      taskQueue = [TASK.EXTRACT, TASK.GENERATE];
      break;
    default:
      argumentErrorHanler();
  }
  return taskQueue;
}

// 读取配置文件
const readJsonConfig = () => {
  const configFilePath = path.join(workDir, configFileName);
  if (!fs.existsSync(configFilePath)) configFileNotFoundErrorHandler();
  try {
    const jsonObj = fs.readFileSync(configFilePath);
    return JSON.parse(jsonObj);
  } catch(e) {
    configParseErrorHandler(e);
  }
};

// 任务分配器：分配到对应的taskController
const taskStart = (taskType, config) => {
  const { extract, generate } = config;
  
  switch (taskType) {
    case TASK.EXTRACT:
      return Extract(extract);
    case TASK.GENERATE:
      return Generate(generate);
  }
}

const tasksLauncher = () => {
  const taskQueue = argv2Handler(argv[1]);
  if (!taskQueue.length) return;
  const config = readJsonConfig(workDir);
  taskQueue.forEach(i => taskStart(i, config));
}

argv1Handler(argv[0]);

// 任务处理
tasksLauncher();