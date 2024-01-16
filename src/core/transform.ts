import type { Options } from '../types'
import transformJsx from './transformers/transformJsx'
import transformVue from './transformers/transformVue'

function transform(id: string, code: string, options: Options) {
  // if (/\.(jsx?|tsx?)$/.test(id))
  //   return transformJsx(code, options)
  if (/\.vue$/.test(id))
    return transformVue(code, options)
  return code
}

export default transform
