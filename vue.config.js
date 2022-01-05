'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = '深圳水务集团' // 标题

const port = 8080 // 端口

module.exports = {

  publicPath: process.env.VUE_APP_ROOT_MOEL,
  outputDir: 'enterprise',
  // outputDir: `dist-${process.env.NODE_ENV}`,
  assetsDir: 'static',
  lintOnSave: false,
  runtimeCompiler: true,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: port,
    // proxy: {
    //   '': {
    //     target: `http://192.168.10.247:7778/`,
    //     // target: `http://192.168.19.74:8080`,
    //     // target: `http://192.168.19.72:8080`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '': ''
    //     }
    //   }
    // },
    disableHostCheck: true
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    externals: {
      'BMap': 'BMap',
      'BMapLib': 'BMapLib'
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    if (process.env.NODE_ENV == 'production') {
      config
        .plugin('html')
        .tap(args => {
          args[0].meta = { 'http-equiv': 'Content-Security-Policy', 'content': 'upgrade-insecure-requests' }
          return args
        })
    }
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config

      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', config => {
      // config
      //   .plugin('ScriptExtHtmlWebpackPlugin')
      //   .after('html')
      //   .use('script-ext-html-webpack-plugin', [
      //     {
      //       inline: /runtime\..*\.js$/
      //     }
      //   ])
      //   .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
