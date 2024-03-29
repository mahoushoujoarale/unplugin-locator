const { defineConfig } = require('@vue/cli-service')
const unpluginLocator = require('../../dist/webpack.cjs')

module.exports = defineConfig({
  chainWebpack: (config) => {
    config.plugin('unplugin-locator').use(unpluginLocator.default()).end()
  },
})
