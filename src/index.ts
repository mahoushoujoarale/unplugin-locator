import { env } from 'node:process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options, UserOptions } from './types'
import transform from './core/transform'
import { defaultOptions } from './core/constant'
import startServer, { serverInfo } from './core/server'

let isServerInited = false
let isClientInited = false

export const unpluginFactory: UnpluginFactory<UserOptions | undefined> = (options) => {
  const mergedOptions: Options = { ...defaultOptions, ...options }

  return {
    name: 'unplugin-locator',
    enforce: 'pre',
    buildStart() {
      if (isServerInited || env.NODE_ENV === 'production')
        return
      isServerInited = true
      startServer(mergedOptions)
    },
    transformInclude(id) {
      if (env.NODE_ENV === 'production')
        return false
      if (id.includes('node_modules'))
        return false
      // support react, preact, solid.js, vue
      return /\.(jsx?|tsx?|vue)$/.test(id)
    },
    transform(code: string, id: string) {
      // inject client script
      if (!isClientInited && /\.(jsx?|tsx?)$/.test(id)) {
        isClientInited = true
        const currentDirname = __dirname ?? dirname(fileURLToPath(import.meta.url))
        const clientUrl = resolve(currentDirname, './core/client.js')
        code += `\nimport initClient from '${clientUrl}'\ninitClient({ port: ${serverInfo.port}, hotKeys: '${mergedOptions.hotKeys?.join(',')}' })`
      }
      return transform(code, id)
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
