// Matches a YAML front matter block at the very start of a markdown file.
export const frontmatterPattern = /^---\n[\s\S]*?\n---\n/

// Matches everything up to and including the last slash of a path.
export const directoryPattern = /^.*\//

// Matches the file name at the end of a path, keeping the directory and the name apart.
export const fileNamePattern = /^(.*\/)([^/]+)$/

// Matches every run of characters that cannot appear in a URL slug.
export const slugSeparatorPattern = /[^a-z0-9]+/g

// Matches dashes at either end of a slug.
export const slugEdgePattern = /^-+|-+$/g

// Matches a trailing markdown extension.
export const markdownExtensionPattern = /\.md$/

// Builds the pattern for a marker line holding only `::name`, the remark directive shape, so it never collides with prose.
export const markerPattern = (name: string): RegExp => new RegExp(`^::${name}$`, 'm')

export const stripFrontmatter = (content: string): string => content.replace(frontmatterPattern, '')

export const splitOnMarker = (content: string, name: string): string[] => (
  content.split(markerPattern(name)).map(part => part.trim())
)

export const hasMarker = (content: string, name: string): boolean => markerPattern(name).test(content)

export const variantPath = (src: string, variant: string): string => src.replace(fileNamePattern, `$1${variant}/$2`)

export const thumbnailPath = (src: string): string => variantPath(src, 'thumbs')

export const slugFromPath = (path: string): string => path.replace(directoryPattern, '').replace(markdownExtensionPattern, '')

export const slugify = (value: string): string => value.toLowerCase().replace(slugSeparatorPattern, '-').replace(slugEdgePattern, '')

export const isRecord = (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object' && value !== null
)

export const readString = (data: Record<string, unknown>, key: string): string => {
  const value = data[key]
  return typeof value === 'string' ? value : ''
}

export const readNumber = (data: Record<string, unknown>, key: string, fallback: number): number => {
  const value = data[key]
  return typeof value === 'number' ? value : fallback
}
