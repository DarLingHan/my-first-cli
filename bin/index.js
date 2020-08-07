#!/usr/bin/env node

const program = require('commander')

program
    .command('create <project-name>')
    .description('初始化项目')
    .option('-g, --git [path]', '是否创建git仓库')
    .action(async (name, cmd) => {
        require('./create')(name)
    })

// 解析命令行参数
program.parse(process.argv)