import { relative } from 'node:path'
import { parse, traverse } from '@babel/core'
import MagicString from 'magic-string'
import { locatorAttr } from '../constant'

function transformJsx(code: string, id: string) {
  const res = new MagicString(code)
  const ast = parse(code, {
    sourceType: 'module',
    configFile: false,
    plugins: [['@babel/plugin-transform-typescript', { isTSX: true }]],
  })
  if (!ast)
    return code

  traverse(ast, {
    enter({ node }) {
      if (node.type === 'JSXOpeningElement' && node.name.type === 'JSXIdentifier') {
        const { line, column } = node.loc!.start
        // inject locatorAttr before /> or >
        const insertPosition = node.end! - (node.selfClosing ? 2 : 1)
        const file = relative('.', id)
        const appendStr = ` ${locatorAttr}="${file}:${line}:${column + 1}?${node.name.name}"`

        res.appendLeft(insertPosition, appendStr)
      }
    },
  })

  return res.toString()
}

export default transformJsx
