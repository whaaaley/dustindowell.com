import { describe, expect, it } from 'vitest'
import { desktopUnit, generateSpacing, linearClamp, linearScale, pageUnit } from './spacing.utils.ts'

const evaluateClamp = (clamp: string, viewportPx: number): number => {
  const match = clamp.match(/^clamp\((.+)rem, (.+)rem \+ (.+)vw, (.+)rem\)$/)

  if (!match) {
    throw new Error(`Unexpected clamp shape: ${clamp}`)
  }

  const [, minRem, interceptRem, slopeVw, maxRem] = match
  const preferredRem = Number(interceptRem) + Number(slopeVw) * viewportPx / 100 / 16
  const rem = Math.min(Math.max(preferredRem, Number(minRem)), Number(maxRem))

  return rem * 16
}

describe('spacing.utils', () => {
  describe('linearClamp', () => {
    it('returns the minimum at the 425px mobile anchor', () => {
      // Arrange
      const clamp = linearClamp(16, 32)

      // Act
      const px = evaluateClamp(clamp, 425)

      // Assert
      expect(px).toBeCloseTo(16, 6)
    })

    it('returns the maximum at the 1440px laptop anchor', () => {
      // Arrange
      const clamp = linearClamp(16, 32)

      // Act
      const px = evaluateClamp(clamp, 1440)

      // Assert
      expect(px).toBeCloseTo(32, 6)
    })

    it('interpolates linearly halfway between the anchors', () => {
      // Arrange
      const clamp = linearClamp(16, 32)

      // Act
      const px = evaluateClamp(clamp, (425 + 1440) / 2)

      // Assert
      expect(px).toBeCloseTo(24, 6)
    })

    it('holds the maximum past the laptop anchor', () => {
      // Arrange
      const clamp = linearClamp(16, 32)

      // Act
      const px = evaluateClamp(clamp, 2560)

      // Assert
      expect(px).toBeCloseTo(32, 6)
    })

    it('emits the requested unit', () => {
      // Arrange
      const unit = '%'

      // Act
      const clamp = linearClamp(6.25, 0, unit)

      // Assert
      expect(clamp.startsWith('clamp(0.390625%, ')).toBe(true)
      expect(clamp.endsWith(', 0%)')).toBe(true)
    })
  })

  describe('linearScale', () => {
    it('keeps growing past the laptop anchor', () => {
      // Arrange
      const scale = linearScale(0, 48)

      // Act
      const atLaptop = evaluateClamp(scale, 1440)
      const atUltrawide = evaluateClamp(scale, 2560)

      // Assert
      expect(atUltrawide).toBeGreaterThan(atLaptop)
    })

    it('reaches the extrapolated maximum at 5120px', () => {
      // Arrange
      const scale = linearScale(0, 48)

      // Act
      const px = evaluateClamp(scale, 5120)

      // Assert
      expect(px).toBeCloseTo(48 * 5120 / 1440, 6)
    })
  })

  describe('generateSpacing', () => {
    it('maps each unit to a multiple of 3px in rem', () => {
      // Arrange
      const units = [1, 2, 4]

      // Act
      const spacing = generateSpacing('t', units)

      // Assert
      expect(spacing).toEqual({ t1: '0.1875rem', t2: '0.375rem', t4: '0.75rem' })
    })

    it('returns an empty object for no units', () => {
      // Act
      const spacing = generateSpacing('t')

      // Assert
      expect(spacing).toEqual({})
    })
  })

  describe('desktopUnit', () => {
    it('reads the given pixels exactly at the 1440px laptop anchor', () => {
      // Arrange
      const clamp = desktopUnit(9, 1)

      // Act
      const px = evaluateClamp(clamp, 1440)

      // Assert
      expect(px).toBeCloseTo(9, 6)
    })

    it('shrinks to the page scale on mobile', () => {
      // Arrange
      const clamp = desktopUnit(12, 1)

      // Act
      const px = evaluateClamp(clamp, 425)

      // Assert
      expect(px).toBeCloseTo(12 * 816 / 1440, 6)
    })
  })

  describe('pageUnit', () => {
    it('reads 9px body text as 14px on mobile', () => {
      // Arrange
      const clamp = pageUnit(9)

      // Act
      const px = evaluateClamp(clamp, 425)

      // Assert
      expect(px).toBeCloseTo(14, 6)
    })

    it('scales the 816px page to 1440px on laptop', () => {
      // Arrange
      const clamp = pageUnit(816)

      // Act
      const px = evaluateClamp(clamp, 1440)

      // Assert
      expect(px).toBeCloseTo(1440, 6)
    })

    it('applies a smaller mobile scale to spacing', () => {
      // Arrange
      const clamp = pageUnit(48, 0.5)

      // Act
      const px = evaluateClamp(clamp, 425)

      // Assert
      expect(px).toBeCloseTo(24, 6)
    })

    it('keeps two measurements in the same ratio at every viewport', () => {
      // Arrange
      const body = pageUnit(9)
      const line = pageUnit(13.5)

      // Act
      const ratios = [425, 800, 1200, 1440].map(viewport => evaluateClamp(line, viewport) / evaluateClamp(body, viewport))

      // Assert
      ratios.forEach((ratio) => {
        expect(ratio).toBeCloseTo(1.5, 6)
      })
    })
  })
})
