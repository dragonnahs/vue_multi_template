const glob = require('glob')

module.exports = function(globPath) {
  let entries = {},
    tmp,
    pathname,
    folderName

  glob.sync(globPath).forEach(entry => {
    tmp = entry.split('/').splice(-2) // 页面文件夹名字
    folderName = tmp.splice(0, 1)
    pathname = folderName
    entries[pathname] = entry
  })

  return entries
}
