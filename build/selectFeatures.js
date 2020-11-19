// 更新：
//     1. 包含 .ignore 后缀的文件夹将会忽略（不会出现在可选列表内）
const inquirer = require('inquirer')
const fuzzy = require('fuzzy')
const glob = require('glob')
const chalk = require('chalk')
const exec = require('shelljs').exec

exec('clear')

inquirer.registerPrompt(
  'checkbox-plus',
  require('inquirer-checkbox-plus-prompt')
)

const allPages = []
glob
  .sync('./src/features/*/index.js')
  .filter(path => {
    // 后缀有 .ignore 的文件夹将被忽略掉
    const pathToArr = path.split('/')
    const dirName = pathToArr[pathToArr.length - 2]
    if (!dirName.includes('.ignore')) {
      return path
    }
  })
  .forEach(entry => {
    const tmp = entry.split('/').splice(-2) // 页面文件夹名字
    const folderName = tmp[0]
    allPages.push(folderName)
  })

console.log(chalk.green('请选择需要调试的页面（多选）：'))
console.log(chalk.yellow('操作说明：'))
console.log(chalk.yellow('空格：选中'))
console.log(chalk.yellow('上下：选择页面'))
console.log(chalk.yellow('回车：确定'))

inquirer
  .prompt({
    type: 'checkbox-plus',
    name: 'pages',
    message: '选择开发页面',
    pageSize: 10,
    highlight: true,
    searchable: true,
    default: [],
    source: function(answersSoFar, input) {
      input = input || ''
      return new Promise(function(resolve) {
        var fuzzyResult = fuzzy.filter(input, allPages)
        var data = fuzzyResult.map(function(element) {
          return element.original
        })
        resolve(data)
      })
    },
  })
  .then(answers => {
    const pages = answers.pages
    if (pages.length === 0) {
      console.log(chalk.red('您没有选择任何页面!\n拜拜啦👋'))
      return
    }
    const globMatch = `@(${pages.join('|')})`
    console.log(
      chalk.green('您选择了：'),
      chalk.italic(`\n${pages.join('、')}`)
    )
    process.env.BK_H5_PAGES = globMatch
    exec('npm run serve')
  })
  .catch(err => {
    console.error(err)
  })
