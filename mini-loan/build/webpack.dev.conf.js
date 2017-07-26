var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['app'] //需要引入的Chunk，不配置就会引入所有页面的资源
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'pay.html', //生成的html
    //   template: 'pay.html', //来源html
    //   inject: true, //是否开启注入
    //   chunks: ['pay'] //需要引入的Chunk，不配置就会引入所有页面的资源
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'test.html', //生成的html
    //   template: './../src/testPage/test.html', //来源html
    //   inject: true, //是否开启注入
    //   chunks: ['test'] //需要引入的Chunk，不配置就会引入所有页面的资源
    // }),
    new FriendlyErrorsPlugin()
  ]
})