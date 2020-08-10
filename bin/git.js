const inquirer = require('inquirer')
const api = require('./api')
const ora = require('ora')
const downloadGit = require('download-git-repo')
const execa = require('execa') // 调用shell和本地外部程序的javascript封装
const path = require('path')
const vuePath = require.resolve('@vue/cli/bin/vue')
// const { command } = require('commander')

async function createGitProject (name) {
    const {desc} = await inquirer.prompt({
        type: 'input',
        name: 'desc',
        message: '请输入仓库的描述'
    })
    const spinner = ora(' ⚡️ 正在创建git仓库...')
    spinner.start();
    return api.post(`https://gitlab.com/api/v4/projects`, {
        name,
        desc
    }).then(res => {
        let obj = {
            projectName: res.path_with_namespace,
            projectId: res.id
        }
        spinner.succeed(`👏👏 创建git仓库成功!`);
        return obj
    }).catch(err => {
        spinner.fail(`💋💋 创建 gitlab 仓库失败!${err}`);
    })
}

/**
 * 
 * 方式1 基于本地preset生成模版 第一步拉下模版 第二步执行--preset
 * 方式2 基于远程git仓库生成模版 直接执行--prest git地址
 */
async function getTemplateOnLocal (targetDir, gitPath, name) {
    const spinner = ora('🚀  初始化模板...')
    // spinner.start()
    try {
        // 拉取模版
        await new Promise((resolve, reject) => {
            downloadGit(gitPath, targetDir + '-template', { clone: true } ,error => {
              if (error) {
                reject(error)
              }
              else {
                resolve(targetDir + '-template')
              }
            })
        })
        // 初始化模版
        //    因为我写的模版是一个preset 所以执行一下
        await execa(vuePath, ['create', '--preset', `./${name}-template`, name, '-c', '-n'], {stdio: 'inherit'})
        spinner.succeed('初始化模版成功')
    } catch (e) {
        spinner.fail(`失败：${message}`)
        process.exit()
    }
}

async function getTemplateOnGitPath (targetDir, gitPath, name) {
    try {
        await execa(vuePath, ['create', '--preset', gitPath, name, '-c', '-n'], {stdio: 'inherit'})
    } catch (error) {
        console.log('模版初始化失败——'+error)
    }
}

async function addTemplateToGit (targetDir, name) {
    const spinner = ora('🚀  提交模版...')
    spinner.start()
    const gitPath = `git@gitlab.com:DarLingHan/${name}.git`
    await execa('git', ['init'], {cwd: targetDir})
    await execa('git', ['add', '-A'], {cwd: targetDir})
    await execa('git', ['commit', '-m', 'init'], {cwd: targetDir})
    await execa('git', ['remote', 'add', 'origin', gitPath], {cwd: targetDir})
    await execa('git', ['push', '--set-upstream', 'origin', 'master'], {cwd: targetDir})
    spinner.succeed('提交成功')
}

module.exports = {
    getTemplateOnLocal,
    getTemplateOnGitPath,
    createGitProject,
    addTemplateToGit
}
