'use strict'

const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = '后台管理系统'
const port = 9527 // dev port
const cdn = {
  // 开发环境
  dev: {
    css: [
      '/css/nprogress.min.css'
    ],
    js: [
      '/js/vue.js',
      '/js/vue-router.min.js',
      '/js/vuex.min.js',
      '/js/axios.min.js',
      '/js/lodash.min.js',
      '/js/element.min.js',
      '/js/tinymce.min.js',
      '/js/highlight.js',
      '/js/mock-min.js',
      '/js/vue-i18n.min.js',
      '/js/fuse.min.js',
      '/js/nprogress.min.js',
      '/js/moment.min.js',
      '/js/echarts.min.js'
    ]
  },
  // 生产环境
  build: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
    ],
    js: [
      'https://cdn.bootcss.com/vue/2.5.21/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
      'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
      'https://unpkg.com/element-ui/lib/index.js',
      'https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts.min.js',
      'https://cdn.bootcss.com/lodash.js/4.17.12-pre/lodash.min.js',
      'https://cdn.bootcss.com/Mock.js/1.0.1-beta3/mock-min.js',
      'https://cdn.bootcss.com/vue-i18n/8.9.0/vue-i18n.min.js',
      'https://cdn.bootcss.com/fuse.js/3.4.4/fuse.min.js',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
      'https://cdn.bootcss.com/highlight.js/9.15.6/highlight.min.js'
    ]
  }
}

// Explanation of each configuration item You can find it in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#publicPath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: `http://localhost:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    after(app) {
      require('@babel/register')
      const bodyParser = require('body-parser')

      // parse app.body
      // http://expressjs.com/en/4x/api.html#req.body
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({
        extended: true
      }))

      const { default: mocks } = require('./mock')
      for (const mock of mocks) {
        app[mock.type](mock.url, mock.response)
      }
    }
  },
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'lodash': '_',
      'echarts': 'echarts',
      'highlight': 'highlight',
      'tui-editor': 'tui-editor',
      'xlsx': 'xlsx',
      'mockjs': 'Mock',
      'vue-i18n': 'VueI18n',
      'fuse.js': 'Fuse',
      'nprogress': 'NProgress', 
      'element-ui': 'ELEMENT',
      'moment': 'moment'
    }
  },
  chainWebpack(config) {
    config.plugin('define').tap(args => {
      const argv = process.argv

      const mode = argv[argv.indexOf('--project-mode') + 1]
      args[0]['process.env'].MODE = `"${mode}"`  //取得命令行之后的"pro"
      args[0]['process.env'].BASE_API = '"http://editor-api.eloco.cn"'
      
      
      return args
    })

    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })

    config.resolve.alias
      .set('@', resolve('src')) 
      .set('@u', resolve('src/utils')) 
      .set('@com', resolve('src/components')) 
      .set('@dudu', resolve('src/components/dudu')) 
      .set('@css', resolve('src/assets/scss')) 
      .set('@img', resolve('src/assets/images')) 

    /*moment仅包含特定语言包的moment文件*/
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])


    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
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
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
          // .plugin('ScriptExtHtmlWebpackPlugin')
          // .after('html')
          // .use('script-ext-html-webpack-plugin', [{
          //   // `runtime` must same as runtimeChunk name. default is `runtime`
          //   inline: /runtime\..*\.js$/
          // }])
          // .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包初始时依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // 单独将 elementUI 拆包
                  priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                  test: /[\\/]node_modules[\\/]element-ui[\\/]/
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可自定义拓展你的规则
                  minChunks: 3, // 最小公用次数
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
