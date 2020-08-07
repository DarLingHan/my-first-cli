const inquirer = require('inquirer')
const api = require('./api')
const ora = require('ora')
const downloadGit = require('download-git-repo')
const execa = require('execa')
const path = require('path')
const { command } = require('commander')

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
        console.log(obj)
        spinner.succeed(`👏👏 创建git仓库成功!`);
        return obj
    }).catch(err => {
        spinner.fail(`💋💋 创建 gitlab 仓库失败!${err}`);
    })
}

async function getTemplate (targetDir, gitPath) {
    // let list = await api.get('https://git.qutoutiao.net/api/v4/groups/1039/projects')
    // let types = list.map(item => `${item.name}`);
    // let repo = list[types.indexOf('withdraw-h5-template')];
    // return repo
    const spinner = ora('🚀  初始化模板...')
    try {
        spinner.start()
        await new Promise((resolve, reject) => {
            downloadGit(gitPath, targetDir, { clone: true } ,error => {
              if (error) {
                reject(error)
              }
              else {
                resolve(targetDir)
              }
            })
          })
      
        spinner.succeed('初始化成功')
    } catch ({message = '初始化模版失败'}) {
        spinner.fail(message)
        process.exit()
    }
    // try {
    //     await execa(
    //         vuePath,
    //         ['create', '-p', gitTemplatePath, name, '-c', '-n', '-r', 'http://nexus.qutoutiao.net/repository/qtt/'],
    //         {
    //             stdio: 'inherit',
    //             env
    //         }
    //     )
    //     console.log('拉取成功！')
    // } catch (e) {
    //     console.log('拉取失败——！', e)
    // }
}

async function addTemplateToGit (name) {
    const spinner = ora('🚀  提交模版...')
    spinner.start()
    const gitPath = `git@gitlab.com:DarLingHan/${name}.git`
    execa('git', 'init', {cwd: path.join(process.cwd(), name)})
    execa('git', 'add', '-A', {cwd: path.join(process.cwd(), name)})
    execa('git', 'commit', '-m', 'init', {cwd: path.join(process.cwd(), name)})
    execa('git', 'remote', 'add', 'origin', gitPath, {cwd: path.join(process.cwd(), name)})
    execa('git', 'push', '--set-upstream', 'origin', 'master', {cwd: path.join(process.cwd(), name)})
    spinner.succeed('提交成功')
}

module.exports = {
    getTemplate,
    createGitProject,
    addTemplateToGit
}
