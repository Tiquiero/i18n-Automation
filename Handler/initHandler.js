const { configFileName } = require('../const');
const { initConfigFileErrorHandler } = require('../handler/errorHandler');
const { readFileBuffer, writeFileBuffer } = require("../utils/fileUtils");
const { getPathConcat } = require("../utils/pathUtils");

const initConfig = (workDir) => {
  try {
    const configTpPath = getPathConcat(__dirname, `../templates/${configFileName}`);
    const configTp = readFileBuffer(configTpPath);
    const targetConfigPath = getPathConcat(workDir, configFileName);
    writeFileBuffer(targetConfigPath, configTp);
  } catch {
    initConfigFileErrorHandler();
  }
}

module.exports = { initConfig };