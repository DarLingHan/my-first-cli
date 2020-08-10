## 第一步：npm init
## 第二步：创建bin目录，此目录下创建XX.js文件
## 第三步：XX.js文件手行配置兼容mac，执行node的代码#!/usr/bin/env node
## 第四步：命令行输入node ./bin/XX.js
## 第五步：优化以上命令 在package.json中配置 bin:{"my-first-cl"': "bin/XX.js"}
## 执行npm link(把命令挂载到全局）

## 1.创建git仓库
## 2.基于项目模版初始化项目
## 3.上传到git仓库
## 4.触发ci部署——在模版的根目录配置.gitlab-ci.yml文件