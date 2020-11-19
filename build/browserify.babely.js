var fs = require('fs')
var path = require('path')
var browserify = require('browserify')
var babelify = require('babelify')
var rgex = /^(chunk-vendors)|(chunk-swiper)\.[\w]/
var bableFileArray = []
var pkg = require('../package.json')
// 打包后的静态资源目录
var staticName = pkg.name


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
function getFiles(url, ext) {
  fs.readdir(url, function(err, files) {
    if (err) {
      return console.error(err, 'getFileNameError')
    }
    files.forEach(function(file) {
      var stats = fs.statSync(url + file)
      if (stats && stats.isFile()) {
        if (path.extname(url + file) === ext) {
          if (rgex.test(file)) {
            bableFileArray.push(path.basename(file, ext))
          }
        }
      } else if (stats && stats.isDirectory()) {
        getFile(url + file + '/', ext)
      }
    })
    compileJs(url)
  })
}

// 查找是否含有版本文件夹
function dealFile(dir) {
  let url = null
  const list = fs.readdirSync(dir)
  if (list.length === 1) {
    url = `${dir}/${list[0]}/js/`
  } else {
    url = `dist/${staticName}/js/`
  }
  getFiles(url, '.js')
}

dealFile(`dist/${staticName}`)

function compileJs(url) {
  bableFileArray.map(function(item) {
    dealCompile(url, item)
  })
}

// 编译处理打包之后的 js 文件
function dealCompile(url, item) {
  browserify({ debug: false })
    .transform(babelify)
    .require(resolve(`/${url}/${item}.js`), { entry: true })
    .bundle(function(res) {
      console.log(res, 456)
      fs.unlink(resolve(`/${url}/${item}.js`), function(err) {
        try {
          var readerStream = fs.createReadStream(resolve(`/dist/${item}.js`))
          var writerStream = fs.createWriteStream(resolve(`/${url}/${item}.js`))
          readerStream.pipe(writerStream)
          console.log('结束')
          fs.unlink(resolve(`/dist/${item}.js`), function(errunlink) {
            try {
              console.log('success delete')
            } catch (errortetx) {
              console.log(errunlink, errortetx, 'delecopyError')
            }
          })
        } catch (err) {
          console.log(err, 'deleteFileError')
        }
      })
    })
    .on('error', function(err) {
      console.log('Error' + err.message)
    })
    .pipe(fs.createWriteStream(`dist/${item}.js`))
}

