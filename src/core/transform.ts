import transformJsx from './transformers/transformJsx'
import transformVue from './transformers/transformVue'

function transform(code: string, id: string) {
  if (/\.(jsx?|tsx?)$/.test(id))
    return transformJsx(code, id)
  if (/\.(vue$)|(vue\?vue)/.test(id))
    return transformVue(code, id)
  return code
}

export default transform
