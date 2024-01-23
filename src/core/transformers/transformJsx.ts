import { parse, traverse } from '@babel/core'
import MagicString from 'magic-string'

function transformJsx(code: string, id: string) {
  const res = new MagicString(code)
  const ast = parse(code, {
    sourceType: 'module',
    plugins: [['@babel/plugin-transform-typescript', { isTSX: true }]],
  })
  if (!ast)
    return code

  traverse(ast, {
    enter({ node }) {
      if (node.type === 'JSXOpeningElement') {
        const { line, column } = node.loc!.start
        // inject data-v-file before /> or >
        const insertPosition = node.end! - (node.selfClosing ? 2 : 1)
        const appendStr = ` data-v-file="${id}:${line}:${column + 1}"`

        res.appendLeft(insertPosition, appendStr)
      }
    },
  })

  return res.toString()
}

export default transformJsx
