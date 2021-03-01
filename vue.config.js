'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || ''
const FileManagerPlugin = require('filemanager-webpack-plugin')

module.exports = {
  configureWebpack: () => {
    return {
      name: name,
      resolve: {
        alias: {
          '@': resolve('src')
        }
      },
      externals: {
        AMap: 'AMap'
      },
      plugins: [
        new FileManagerPlugin({
          events: {
            onEnd: {
              delete: [
                './dist.zip'
              ],
              archive: [{
                source: './dist',
                destination: './dist.zip',
                options: {
                  gzip: true,
                  gzipOptions: {
                    level: 1
                  },
                  globOptions: {
                    nomount: true
                  }
                }
              }]
            }
          }
        })
      ]
    }
  },

  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugins.delete('preload')

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  productionSourceMap: false,
  pages: {
    client: {
      // 入口js的路径
      entry: './src/main',
      // 页面模板路径
      template: './public/index.html',
      filename: 'index.html'
    }
  },
  devServer: {
    port: 8083,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://135.173.12.30:9080/portal',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    after: require('./mock/mock-server.js'),
    https: false
  }
}
