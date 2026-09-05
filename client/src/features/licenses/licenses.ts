import { extractFrontmatter, parseMarkdown } from '~/hooks/useMarkdown.ts'
import { isRecord, readString, slugFromPath, stripFrontmatter } from '~/utils/content.utils.ts'

export type License = {
  slug: string
  name: string
  version: string
  license: string
  body: string
}

const files = import.meta.glob('./notices/*.md', { query: '?raw', import: 'default', eager: true })

const toLicense = (path: string, content: string): License => {
  const data = extractFrontmatter(parseMarkdown(content))
  const frontmatter = isRecord(data) ? data : {}
  return {
    slug: slugFromPath(path),
    name: readString(frontmatter, 'name'),
    version: readString(frontmatter, 'version'),
    license: readString(frontmatter, 'license'),
    body: stripFrontmatter(content).trim(),
  }
}

export const licenses: License[] = Object.entries(files)
  .flatMap(([path, content]) => (typeof content === 'string' ? [toLicense(path, content)] : []))
  .sort((a, b) => a.name.localeCompare(b.name))

export const findLicense = (slug: string): License | undefined => licenses.find(license => license.slug === slug)

export const licensePath = (license: License) => `/licenses/${license.slug}`
