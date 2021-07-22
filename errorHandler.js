exports.argumentErrorHandler = () => {
  console.error('参数错误');
  process.exit(1);
}

exports.configParseErrorHandler = () => {
  console.error("配置文件解析错误，请检查");
  process.exit(1);
}

exports.initConfigFileErrorHandler =() => {
  console.error("初始化配置文件错误");
  process.exit(1);
}

exports.configFileNotFoundErrorHandler = () => {
  console.error("当前路径下没有找到 i18n.config.json 配置文件，您可以选择输入 i18n init快速生成配置文件");
  process.exit(1);
}

exports.fromCodeErrorHandler =() => {
  console.error("fromCode参数格式错误，仅支持字符串或者字符串数组");
  process.exit(1);
}

