"use strict";
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: __dirname + '/../server/web',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/web/'
    : '/',
  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('common', resolve('src/common'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
  },
}