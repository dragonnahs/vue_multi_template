# Breader_Task_H5

## 项目介绍

> 项目的多页面开发

### 需求开发

> 该项目属于多页面开发，在开发新需求的时候，需要运行`npm run cli-create`输入活动名称，自动创建一个依赖于`tempalte`文件夹的需求文件

- 需求开发都在上面创建的文件中进行，一般情况下一个需求一个文件目录
- 所有的公共文件都要在`utils`文件夹中，并且要通过`utils/index.js`去暴露
- 项目单独使用的插件可以通过cdn的方式引入，如果需要npm包引入的话，需要到`vue.config.js`中做配置，把包单独引入到项目中，具体参考配置文件。
- `package.json`中的`name`是作为项目的打包静态资源目录的，因此要命名为英文
- UI使用的是375标准设计

### 项目目录

```bash
# |-- src
#    |-- assets
#        |-- task 资源文件
#        |-- ...
#   |-- common
#       |-- axiosConfig.js
#       |-- faskClick.js
#        |-- htmlClass.js
#        |-- index.js
#        |-- index.pug
#    |-- components
#        |-- tab
#        |-- ...
#    |-- features 路由组件
#    |-- mixin
#    |-- styles 样式文件
#    |-- utils 工具资源
#       |-- animation.js
#        |-- browser.js
#        |-- crop.js
#        |-- dom.js
#        |-- domain.js
#        |-- evn.js
#        |-- log.js
#        |-- native.js
#        |-- string.js
#        |-- url.js
#        |-- utils.js
# |-- static
# |-- template
# |-- static  静态资源
# |-- public
```

### 开发规范
  需求分支基于master去创建feature/*
  feature/* 开发完成之后合并到develop 进行测试，
  develop测试通过后将feature/*分支合并到master
  基于master 打tag上线

### 常用命令

```bash
# 开发本地开发服务器
$ npm run dev
# build 测试环境项目
$ npm run dev-build
# build 生产环境项目
$ npm build
# 输入webpack配置文件
$ npm run inspect > webpack.js
```

