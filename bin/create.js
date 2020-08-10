const ora = require('ora')
const {getTemplateOnLocal, getTemplateOnGitPath, createGitProject, addTemplateToGit} = require('./git')
const path = require('path')


module.exports = async (name) => {
    const targetDir = path.resolve(process.cwd(), name)

    // 第一步创建git项目
    const gitCreateResult = await createGitProject(name)
    
    // 第二步获取项目模版
    // await getTemplateOnLocal(targetDir, 'direct:https://gitlab.com/DarLingHan/my-first-project.git', name)
    await getTemplateOnGitPath(targetDir, 'direct:https://gitlab.com/DarLingHan/my-first-project.git', name)

    // 第三步将模版上传到git仓库
    await addTemplateToGit(targetDir, name)
}
