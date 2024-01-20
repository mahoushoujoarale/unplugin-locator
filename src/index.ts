import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'
import transform from './core/transform'
import { defaultOptions } from './core/constant'
import startServer from './core/server'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    name: 'unplugin-locator',
    enforce: 'pre',
    buildStart() {
      startServer(mergedOptions)
    },
    transformInclude(id) {
      // support react, preact, solid.js, vue
      return /\.(jsx?|tsx?|vue)$/.test(id)
    },
    transform(code: string, id: string) {
      return transform(code, id)
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
