## 第一步：npm init
## 第二步：创建bin目录，此目录下创建XX.js文件
## 第三步：XX.js文件手行配置兼容mac，执行node的代码#!/usr/bin/env node
## 第四步：命令行输入node ./bin/XX.js
## 第五步：优化以上命令 在package.json中配置 bin:{"my-first-cl"': "bin/XX.js"}
## 执行npm link(把命令挂载到全局）

## 1.创建git仓库
## 2.基于项目模版初始化项目
## 3.上传到git仓库
## 4.触发ci部署
- (1)在模版的根目录配置.gitlab-ci.yml文件
- (2)调用同事提供的api

## ci部署
- 创建gitlab-ci.yml文件
- 创建job 执行npm i && npm run build等命令生成打包后等静态文件
- 执行脚本 将静态文件放到服务器上（oss)阿里云服务 （指定目录下，就相当于新加了一个目录，自动生成对应等域名，不需要生效时间）
