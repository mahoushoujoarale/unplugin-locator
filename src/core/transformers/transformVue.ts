import { ElementTypes, NodeTypes, parse, transform } from '@vue/compiler-dom'
import MagicString from 'magic-string'

function transformVue(code: string, id: string) {
  const res = new MagicString(code)
  const ast = parse(code)
  transform(ast, {
    nodeTransforms: [
      (node) => {
        if (
          node.type === NodeTypes.ELEMENT
          && [ElementTypes.ELEMENT, ElementTypes.COMPONENT].includes(node.tagType)
        ) {
          const { line, column, offset } = node.loc.start
          // inject data-v-file after <tag
          const insertPosition = offset + node.tag.length + 1
          const appendStr = ` data-v-file="${id}:${line}:${column}"`

          res.appendLeft(insertPosition, appendStr)
        }
      },
    ],
  })
  return res.toString()
}

export default transformVue
