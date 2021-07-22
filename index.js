const { TASK, helpMessage, configFileName } = require('./const');
const { argumentErrorHanler, initConfigFileErrorHandler } = require('./errorHandler');
const { tasksLauncher } = require('./TaskLaunch/launch');
const { readFileBuffer, writeFileBuffer } = require("./utils/fileUtils");
const { getPathConcat } = require("./utils/pathUtils");

const workDir = process.cwd();
const argv = process.argv.slice(2);

if (argv.length === 0) argv.push('help');

const initConfig = (workDir) => {
  try {
    const configTpPath = getPathConcat(__dirname, `./templates/${configFileName}`);
    const configTp = readFileBuffer(configTpPath);
    const targetConfigPath = getPathConcat(workDir, configFileName);
    writeFileBuffer(targetConfigPath, configTp);
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
    case '-t':
      taskQueue = [TASK.TRANSLATE];
      break;
    case '-g':
      taskQueue = [TASK.GENERATE];
      break;
    case '-et':
      taskQueue = [TASK.EXTRACT, TASK.TRANSLATE];
      break;
    case '-eg':
      taskQueue = [TASK.EXTRACT, TASK.GENERATE];
      break;
    case '-tg':
      taskQueue = [TASK.TRANSLATE, TASK.GENERATE];
      break;
    case '-etg':
      taskQueue = [TASK.EXTRACT, TASK.TRANSLATE, TASK.GENERATE];
      break;
    default:
      argumentErrorHanler();
  }
  return taskQueue;
}

argv1Handler(argv[0]);

// 任务处理
tasksLauncher(argv2Handler(argv[1]), workDir);