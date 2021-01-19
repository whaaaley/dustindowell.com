
import { renderNode, renderTextNode } from '../static/render'

const isArray = Array.isArray

const EMPTY_ARR = []
const EMPTY_OBJ = {}

const virtualNode = (type, props, children) => ({
  type,
  props,
  children: children == null ? EMPTY_ARR : children,
  key: props.key
})

const virtualTextNode = type => ({
  type,
  props: EMPTY_OBJ,
  children: EMPTY_ARR,
  tag: 3
})

const node = STATIC ? renderNode : virtualNode
const text = STATIC ? renderTextNode : virtualTextNode

const h = type => (props, children) => {
  const staticProps = STATIC && typeof props === 'string'

  return staticProps || props == null || isArray(props)
    ? node(type, EMPTY_OBJ, props)
    : node(type, props, children)
}

export { h, text }
