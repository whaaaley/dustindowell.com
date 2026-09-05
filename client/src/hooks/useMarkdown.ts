import { type RootContent as HastContent, type Nodes as HastNodes } from 'hast'
import { toHtml } from 'hast-util-to-html'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { type Root } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter'
import { gfmFromMarkdown } from 'mdast-util-gfm'
import { toHast } from 'mdast-util-to-hast'
import { frontmatter } from 'micromark-extension-frontmatter'
import { gfm } from 'micromark-extension-gfm'
import { visit } from 'unist-util-visit'
import { computed } from 'vue'
import { Fragment, jsx } from 'vue/jsx-runtime'
import YAML from 'yaml'

import '~/components/markdown/markdown.css'

const star = '✦'
const noBreakSpace = String.fromCharCode(160)

const starElement = () => ({
  type: 'element' as const,
  tagName: 'span',
  properties: { className: ['star'] },
  children: [{ type: 'text' as const, value: star }],
})

const decorateStars = (hast: HastNodes) => {
  visit(hast, 'text', (node, index, parent) => {
    if (!parent || index === undefined || !node.value.includes(star)) {
      return
    }

    const pieces = node.value.split(star)
    const replacement: HastContent[] = []

    pieces.forEach((piece, pieceIndex) => {
      const value = pieceIndex > 0 ? piece.replace(/^ /, noBreakSpace) : piece

      if (pieceIndex > 0) {
        replacement.push(starElement())
      }

      if (value) {
        replacement.push({ type: 'text', value })
      }
    })

    parent.children.splice(index, 1, ...replacement)

    return index + replacement.length
  })

  return hast
}

export const parseMarkdown = (content: string) => {
  return fromMarkdown(content.trim(), {
    extensions: [gfm(), frontmatter('yaml')],
    mdastExtensions: [gfmFromMarkdown(), frontmatterFromMarkdown('yaml')],
  })
}

export const renderMdast = (mdast: Root) => {
  return toJsxRuntime(decorateStars(toHast(mdast)), {
    Fragment,
    jsx,
    jsxs: jsx,
    elementAttributeNameCase: 'html',
    development: false,
  })
}

export const extractFrontmatter = (mdast: Root) => {
  let parsedData = {}

  if (mdast) {
    visit(mdast, 'yaml', (node) => {
      parsedData = YAML.parse(node.value)
    })
  }

  return parsedData
}

type Props = {
  content: string
}

export const useMarkdown = (props: Props) => {
  const mdast = computed(() => parseMarkdown(props.content))
  const vnodes = computed(() => renderMdast(mdast.value))
  const html = computed(() => toHtml(toHast(mdast.value)))
  const metadata = computed(() => extractFrontmatter(mdast.value))

  return {
    mdast,
    vnodes,
    html,
    metadata,
  }
}
