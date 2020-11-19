const glob = require('glob')
var pkg = require('../package.json')
// 打包后的静态资源目录
var staticName = pkg.name
// const shell = require('shelljs')
let { sourcemap } = require('../.sentryrc.js')
let paths = []
let allFiles = glob.sync(`./dist/${staticName}/js/*`)
paths.push(...allFiles.filter(item => sourcemap.some(source => item.includes(source))))
