const { defineConfig } = require('@vue/cli-service')
const { default: unpluginLocator } = require('../../dist/webpack.cjs')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    console.log(config.loader())
    // config.plugin('unplugin-locator').use(unpluginLocator())
  },
})
