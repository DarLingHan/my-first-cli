const ora = require('ora')
const {getTemplate, createGitProject, addTemplateToGit} = require('./git')
const path = require('path')

const download = require('download-git-repo')

module.exports = async (name) => {
    // 第一步创建git项目
    // const gitCreateResult = await createGitProject(name)
    
    // 第二步获取项目模版
    await getTemplate(path.resolve(process.cwd(), name), 'direct:https://gitlab.com/DarLingHan/my-first-project.git')

    // 第三步将模版上传到git仓库
    await addTemplateToGit(name)
}
