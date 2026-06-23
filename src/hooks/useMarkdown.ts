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

// Import CSS only once when useMarkdown is first used
import '~/components/markdown/markdown.css'

export const parseMarkdown = (content: string) => {
  return fromMarkdown(content.trim(), {
    extensions: [gfm(), frontmatter('yaml')],
    mdastExtensions: [gfmFromMarkdown(), frontmatterFromMarkdown('yaml')],
  })
}

export const renderMdast = (mdast: Root) => {
  return toJsxRuntime(toHast(mdast), {
    Fragment,
    jsx,
    jsxs: jsx,
    elementAttributeNameCase: 'html', // Required for Vue
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
