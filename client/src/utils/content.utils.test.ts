import { describe, expect, it } from 'vitest'
import { directoryPattern, frontmatterPattern, hasMarker, isRecord, markdownExtensionPattern, markerPattern, readNumber, readString, slugFromPath, splitOnMarker, stripFrontmatter } from './content.utils.ts'

describe('content.utils', () => {
  describe('patterns', () => {
    it('frontmatterPattern matches only a block at the start of the file', () => {
      // Arrange
      const leading = '---\ntitle: "Compose"\n---\nBody'
      const later = 'Body\n---\ntitle: "Compose"\n---\n'

      // Act
      const matchesLeading = frontmatterPattern.test(leading)
      const matchesLater = frontmatterPattern.test(later)

      // Assert
      expect(matchesLeading).toBe(true)
      expect(matchesLater).toBe(false)
    })

    it('directoryPattern and markdownExtensionPattern strip the parts around a file name', () => {
      // Arrange
      const path = './products/compose.md'

      // Act
      const withoutDirectory = path.replace(directoryPattern, '')
      const withoutExtension = withoutDirectory.replace(markdownExtensionPattern, '')

      // Assert
      expect(withoutDirectory).toBe('compose.md')
      expect(withoutExtension).toBe('compose')
    })

    it('markerPattern matches a whole line of ::name in multiline text', () => {
      // Arrange
      const pattern = markerPattern('slider')

      // Act
      const wholeLine = pattern.test('Before\n::slider\nAfter')
      const inline = pattern.test('Before ::slider After')
      const otherName = pattern.test('Before\n::gallery\nAfter')

      // Assert
      expect(wholeLine).toBe(true)
      expect(inline).toBe(false)
      expect(otherName).toBe(false)
    })
  })

  describe('stripFrontmatter', () => {
    it('removes a leading YAML block and keeps the body', () => {
      // Arrange
      const content = '---\ntitle: "Compose"\norder: 2\n---\n\n## ABOUT\n\nBody'

      // Act
      const body = stripFrontmatter(content)

      // Assert
      expect(body).toBe('\n## ABOUT\n\nBody')
    })

    it('leaves content without front matter untouched', () => {
      // Arrange
      const content = '## ABOUT\n\nBody'

      // Act
      const body = stripFrontmatter(content)

      // Assert
      expect(body).toBe(content)
    })

    it('does not treat a horizontal rule later in the body as front matter', () => {
      // Arrange
      const content = '## ABOUT\n\n---\n\nAfter the rule'

      // Act
      const body = stripFrontmatter(content)

      // Assert
      expect(body).toBe(content)
    })
  })

  describe('splitOnMarker', () => {
    it('splits the body at a marker line and trims each part', () => {
      // Arrange
      const content = '## ABOUT\n\nBefore\n\n::slider\n\n## STACK\n\nAfter'

      // Act
      const parts = splitOnMarker(content, 'slider')

      // Assert
      expect(parts).toEqual(['## ABOUT\n\nBefore', '## STACK\n\nAfter'])
    })

    it('returns the whole body as one part when the marker is absent', () => {
      // Arrange
      const content = '## ABOUT\n\nBody'

      // Act
      const parts = splitOnMarker(content, 'slider')

      // Assert
      expect(parts).toEqual(['## ABOUT\n\nBody'])
    })

    it('ignores the marker text when it is not alone on its line', () => {
      // Arrange
      const content = 'The ::slider marker inline\n\n::slider\n\nAfter'

      // Act
      const parts = splitOnMarker(content, 'slider')

      // Assert
      expect(parts).toEqual(['The ::slider marker inline', 'After'])
    })

    it('only matches the named marker', () => {
      // Arrange
      const content = 'Before\n\n::gallery\n\nAfter'

      // Act
      const parts = splitOnMarker(content, 'slider')

      // Assert
      expect(parts).toEqual(['Before\n\n::gallery\n\nAfter'])
    })
  })

  describe('hasMarker', () => {
    it('reports whether the named marker line is present', () => {
      // Arrange
      const content = 'Before\n\n::slider\n\nAfter'

      // Act
      const present = hasMarker(content, 'slider')
      const absent = hasMarker(content, 'gallery')

      // Assert
      expect(present).toBe(true)
      expect(absent).toBe(false)
    })
  })

  describe('slugFromPath', () => {
    it('takes the file name without its extension', () => {
      // Arrange
      const path = './products/access-publishing.md'

      // Act
      const slug = slugFromPath(path)

      // Assert
      expect(slug).toBe('access-publishing')
    })
  })

  describe('readers', () => {
    it('reads strings and numbers with fallbacks for missing or mistyped fields', () => {
      // Arrange
      const data = { title: 'Compose', order: 2, dates: 2022 }

      // Act
      const title = readString(data, 'title')
      const dates = readString(data, 'dates')
      const order = readNumber(data, 'order', 99)
      const missing = readNumber(data, 'missing', 99)

      // Assert
      expect(title).toBe('Compose')
      expect(dates).toBe('')
      expect(order).toBe(2)
      expect(missing).toBe(99)
    })

    it('narrows plain objects and rejects null and primitives', () => {
      // Arrange
      const values = [{}, null, 'text', 3]

      // Act
      const results = values.map(isRecord)

      // Assert
      expect(results).toEqual([true, false, false, false])
    })
  })
})
