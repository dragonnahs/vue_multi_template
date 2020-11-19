/**
 * vue.config.js 配置参考
 * https://cli.vuejs.org/zh/config
 */
const AutoInjectPlugin = require('auto-inject-plugin')
const path = require('path')
const fs = require('fs')
const getEntry = require('./build/pageEntry')
const resolve = dir => path.join(__dirname, dir)

const isProd = process.env.VUE_APP_DEVELOP_ENV === 'false'
const isDev = process.env.VUE_APP_DEVELOP_ENV === 'true'



// CDN 地址
const bkReadCDN = 'https://scdn.ibreader.com'


// package
const pkg = require('./package.json')
// 打包后的静态资源目录
const staticName = pkg.name
process.env.staticName = staticName

const pageUrl = isProd ? `${staticName}/${pkg.version}` : `${staticName}/`

let globMatch = '*'
if (!isProd && process.env.BK_H5_PAGES) {
  globMatch = process.env.BK_H5_PAGES
}

let entries = getEntry(`src/features/${globMatch}/index.js`)

const pagesMaker = () => {
  let pagesObj = {}
  let pages = getEntry(`src/features/${globMatch}/index.pug`)
  const filePrefix = staticName + '_'
  for (let pathname in pages) {
    let pathInfo = pages[pathname]
    const folderName = pathInfo.split('/').splice(-2)[0]
    const fileName = `${folderName}.html`
    let conf = {
      template: pathInfo,
      filename: `${filePrefix}${fileName}`,
      entry: [`src/features/${pathname}/index.js`],
      chunks: ['chunk-vendors', 'chunk-common', pathname],
    }
    pagesObj[folderName] = conf
  }
  if (isDev) {
    pagesObj['index'] = {
      template: 'src/common/index.html',
      filename: 'index.html',
      entry: Object.values(entries),
      pages: Object.keys(entries),
      filePrefix: filePrefix,
      chunks: ['chunk-vendors', 'chunk-common']
    }
  }
  return pagesObj
}
const pages = pagesMaker()
module.exports = {
  publicPath: isDev ? './' : bkReadCDN,
  assetsDir: isProd ? `${staticName}/${pkg.version}` : `${staticName}`, // isDev ? 'bkh5-static' :
  indexPath: 'index.html',
  filenameHashing: !isProd,
  pages,
  lintOnSave: isDev ? 'error' : true,
  // https://cli.vuejs.org/zh/config/#lintonsave
  runtimeCompiler: true,
  // 是否使用包含运行时编译器的 Vue 构建版本。https://cli.vuejs.org/zh/config/#runtimecompiler
  productionSourceMap: false,
  configureWebpack: config => {
    for (let keys in config.entry) {
      config.entry[keys].unshift('babel-polyfill')
    }

    const newRules = config.module.rules.map(rule => {
      if (rule.test.test('.pug') === false) {
        return rule
      } else {
        return {
          test: /\.pug$/,
          oneOf: [
            // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
            {
              resourceQuery: /^\?vue/,
              use: [
                {
                  loader: 'pug-plain-loader',
                },
              ],
            },
            // 这条规则应用到 JavaScript 内的 pug 导入
            {
              use: [
                {
                  loader: 'raw-loader',
                },
                {
                  loader: 'pug-plain-loader',
                },
              ],
            },
          ],
        }
      }
    })
    config.module.rules = newRules
  },
  chainWebpack: config => {
    // image output config
    config.module.rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('file-loader')
      .options({
        name: `${pageUrl}/img/[name].[hash:8].[ext]`
      })
    config.module.rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: `${pageUrl}/img/[name].[hash:8].[ext]`
      })
    config.resolve.alias.set('@', resolve('src'))
    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks({
        cacheGroups: {
          // default: {
          //   minChunks: 2,
          //   priority: -20,
          //   reuseExistingChunk: true,
          //   chunks: "initial",
          //   enforce: true,
          // },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
            reuseExistingChunk: true,
            enforce: true
          },
          swiper: {
            name: 'chunk-swiper',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?swiper(.*)/,
            reuseExistingChunk: true,
            chunks: 'all'
          },
          'chunk-better-scroll': {
            name: 'chunk-better-scroll',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?better-scroll(.*)/,
            reuseExistingChunk: true,
            chunks: 'all'
          },
          'chunk-ali-oss': {
            name: 'chunk-ali-oss',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?ali-oss(.*)/,
            reuseExistingChunk: true,
            chunks: 'all'
          },
          'chunk-video': {
            name: 'chunk-video',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?video(.*)/,
            reuseExistingChunk: true,
            chunks: 'all'
          },
        }
      })
      config.plugin('AutoInjectPlugin').use(AutoInjectPlugin)
      // config.plugin('BundleAnalyzerPlugin').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }

    config.module
      .rule('compile')
      .test(/\.js$/)
      .include
      .add(resolve('src'))
      .add(/node_modules\/(dom7|swiper)\/.*/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        sourceType: 'unambiguous',
        presets: [
          ['@babel/preset-env', {
            modules: false
          }]
        ],
        plugins: [
          '@babel/plugin-transform-exponentiation-operator',
          '@babel/plugin-transform-runtime',
        ]
      })
    config.plugin('copy').tap(args => {
      const { toType, ignore } = args[0][0]
      args[0] = []
      args[0].push(
        {
          from: resolve('public'),
          to: resolve(`dist/${pageUrl}/js`),
          toType,
          ignore,
        },
        {
          from: resolve('static'),
          to: resolve(`dist/${pageUrl}/others`),
          toType,
        }
      )
      return args
    })
    // config.plugin('analyzer').use(BundleAnalyzerPlugin)
  },
  devServer: {
    open: true,
    hotOnly: true,
    host: '0.0.0.0',
    port: '1024',
    disableHostCheck: true, // 配置内网穿透
    // sockHost: 'localhost:80',
    proxy: {
      '/*': {
        target: 'http://testapi.ibreader.com/',
        // ws: true,
        changeOrigin: true,
      },
    },
  },
}

