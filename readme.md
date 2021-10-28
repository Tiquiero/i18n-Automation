## install 

```shell
npm install i18n-automation -g
// or
yarn global add i18n-automation
```
## usage
### 初始化配置文件
```shell
i18n init
```
### 提取  -> 生成
- 提取 -> 生成（不需要人工校验）

```shell
i18n task -eg
```

## task

| 任务名称                               | 任务职责                                    |
| -------------------------------------- | ------------------------------------------- |
| EXTRACT：提取 code ( src ) -> md         | 将代码中的英文提取到markdown文件中的表格中  |
| GENERATE：生成 md -> code ( locales ) | 将markdown文件中的表格生成到locales文件夹中 |

## cli

| 参数名 | 参数意义                                                     |
| ------ | ------------------------------------------------------------ |
| help  | 输出这张表格                                                 |
| init   | 初始化配置文件                                               |
| task -e     | 执行EXTRA提取任务                                            |
| task -g     | 执行GENERATOR生成任务                                        |
| task -eg    | 先执行EXTRA提取，再执行GENERATOR生成任务                     |

## TODO

增加一个翻译任务，引入翻译API自动进行翻译，然后再生成md （i18n task -etg）

| 任务名称                               | 任务职责                                    |
| -------------------------------------- | ------------------------------------------- |
| TRANSLATE：翻译 md                     | 将markdown文件中的表格新加一列并翻译        |