import { env } from 'node:process'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'
import transform from './core/transform'
import { defaultOptions } from './core/constant'
import startServer from './core/server'

let isInited = false

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    name: 'unplugin-locator',
    enforce: 'pre',
    buildStart() {
      if (isInited || env.NODE_ENV !== 'development')
        return
      startServer(mergedOptions)
    },
    buildEnd() {
      isInited = true
    },
    transformInclude(id) {
      if (isInited || env.NODE_ENV !== 'development')
        return false
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
