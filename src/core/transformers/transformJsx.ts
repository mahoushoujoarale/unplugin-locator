import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import MagicString from 'magic-string'
import type { Options } from '../../types'

async function transformJsx(code: string, options: Options) {
  const res = new MagicString(code)
  const ast = await parse(code)

  traverse(ast, {
    enter({ node }) {
      if (node.type === 'JSXElement') {
        const { start, end } = node
      }
    },
  })

  return res.toString()
}

export default transformJsx
