"use strict";
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('common', resolve('src/common'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
  },
}