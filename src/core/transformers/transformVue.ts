import { parse } from '@vue/compiler-dom'
import chalk from 'chalk'
import type { Options } from '../../types'

function transformVue(code: string, options: Options) {
  const ast = parse(code)
  console.warn(chalk.green('ast', ast.type))
  return code.replace('__UNPLUGIN__', `vue hahah`)
}

export default transformVue
