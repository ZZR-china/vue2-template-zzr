# vue2-template-zzr
一个Vue@2 模板项目，便于快速开发项目

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 采用的库

## vuejs
vue@2.6.11

## vue-router

## vuex
## svg-sprite-loader
引入svg icon，便于在vue文件中引入svg图标，
加入svgo库：优化svg，将svg代码转化为.svg格式文件

## mockjs
mock数据，无后端开发时使用

## axios
ajax请求库

## 引入element-ui
按需引入，plugins-element.js Vue.use(Button)

## main.js全局引入filters
解析时间等常用的filter

## styles
main.js引入element-variables.scss，可以更改element默认颜色等，element-ui.scss覆盖element一些默认样式
index.scss添加全局样式，body等

# 项目目录

## -vue.config.js
打包配置、运行配置等
## -mock
模拟数据api服务

## -public
静态资源存放，favicon.ico、index.html

## -src
APP.vue、main.js、setting.js

## -src-api
项目使用后端接口目录

## -src-assets
图片、pdf等页面资源
## -src-components
组件目录

## -src-filters
全局filter方法

## -src-icons
图标资源和图标组件

## -src-plugins
插件，element.js按需引入插件

## -src-router
路由 js

## -src-store
数据控制store vuex

## -src-styles
页面样式scss

## -src-utils
工具方法 request.js、validate.js

## -src-views
Vue页面


# 打包配置

## script-ext-html-webpack-plugin
对js css包进行分割，element-ui等

## webpack-bundle-analyzer
对打包后的代码解析 
（1）使用webpack-bundle-analyzer
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
（2）使用vue-cli自带的report命令，vue-cli-service build --report

## 启用giz压缩，需要服务端配合
vue.config.js

`
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
new CompressionPlugin({
    filename: '[path].gz',
    algorithm: 'gzip',
    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
    threshold: 10240, // 对10K以上的数据进行压缩
    minRatio: 0.8,
    deleteOriginalAssets: false
})
`

服务端

Nginx服务器配置：
`
server {
    gzip on;
    gzip_buffers 4 16K;
    gzip_comp_level 5;
    gzip_min_length 100k;
    gzip_types text/plain application/x-javascript application/javascript application/json text/css application/xml text/javascript image/jpeg image/gif image/png;
    gzip_disable "MSIE [1-6\]\."; 
    gzip_vary on;
}
`

gzip on|off; // 是否开启gzip
gzip_min_length 100k; // 压缩的最小长度(再小就不要压缩了,意义不在)
gzip_buffers 4 16k; // 缓冲(压缩在内存中缓冲几块? 每块多大?)
gzip_comp_level 5; // 压缩级别(级别越高,压的越小,越浪费CPU计算资源)
gzip_types text/plain; // 对哪些类型的文件用压缩 如txt,xml,html,css,js等
gzip_vary on|off; // 是否传输gzip压缩标志

