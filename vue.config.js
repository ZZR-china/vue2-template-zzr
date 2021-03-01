const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const FileManagerPlugin = require('filemanager-webpack-plugin')

module.exports = {
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        externals: {
          AMap: 'AMap'
        },
        plugins: [
          new FileManagerPlugin({
            onEnd: {
              delete: [
                './dist.zip'
              ],
              archive: [{
                source: './dist',
                destination: './dist.zip'
              }]
            }
          })
        ],
        performance: {
          hints: false
        }
      }
    }
    return {
      externals: {
        AMap: 'AMap'
      }
    }
  },

  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugins.delete('preload')

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('base', resolve('baseConfig'))
      .set('public', resolve('public'))

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
      '/api': {
        // 测试环境 2
        target: 'http://135.173.12.30:9080/portal',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    https: false
  }
}
