// 任务类型
exports.TASK = {
  EXTRACT: Symbol(),
  GENERATE: Symbol()
}

// 配置文件名称
exports.configFileName = 'i18n.config.json';

exports.helpMessage = `
| 参数名       | 参数意义                                                     |
| ------      | ------------------------------------------------------------|
| help        | 输出这张表格                                                 |
| init        | 初始化配置文件                                               |
| task -e     | 执行EXTRA提取任务                                            |
| task -g     | 执行GENERATOR生成任务                                        |
| task -eg    | 先EXTRA提取，再GENERATOR生成                                 |
`;
