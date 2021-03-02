'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || ''
const FileManagerPlugin = require('filemanager-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

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
        }),
        new CompressionPlugin({
          filename: '[path].gz',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
          threshold: 10240, // 对10K以上的数据进行压缩
          minRatio: 0.8,
          deleteOriginalAssets: false
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

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
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
