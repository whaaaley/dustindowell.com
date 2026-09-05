import { assertEquals, assertInstanceOf } from '@std/assert'
import { describe, it } from '@std/testing/bdd'
import { safe, safeAsync } from './safe.ts'

describe('All Safe Tests', () => {
  describe('safe', () => {
    it('returns the value and a null error on success', () => {
      // Arrange
      const fn = () => 42

      // Act
      const result = safe(fn)

      // Assert
      assertEquals(result.data, 42)
      assertEquals(result.error, null)
    })

    it('returns a null data and the thrown Error on failure', () => {
      // Arrange
      const boom = new Error('boom')
      const fn = () => {
        throw boom
      }

      // Act
      const result = safe(fn)

      // Assert
      assertEquals(result.data, null)
      assertEquals(result.error, boom)
    })

    it('wraps a non-Error throw in an Error', () => {
      // Arrange
      const fn = () => {
        throw 'plain string'
      }

      // Act
      const result = safe(fn)

      // Assert
      assertInstanceOf(result.error, Error)
      assertEquals(result.error?.message, 'plain string')
    })
  })

  describe('safeAsync', () => {
    it('returns the resolved value and a null error on success', async () => {
      // Arrange
      const fn = () => Promise.resolve('ok')

      // Act
      const result = await safeAsync(fn)

      // Assert
      assertEquals(result.data, 'ok')
      assertEquals(result.error, null)
    })

    it('returns a null data and the rejection Error on failure', async () => {
      // Arrange
      const boom = new Error('async boom')
      const fn = () => Promise.reject(boom)

      // Act
      const result = await safeAsync(fn)

      // Assert
      assertEquals(result.data, null)
      assertEquals(result.error, boom)
    })

    it('wraps a non-Error rejection in an Error', async () => {
      // Arrange
      const fn = () => Promise.reject('plain rejection')

      // Act
      const result = await safeAsync(fn)

      // Assert
      assertInstanceOf(result.error, Error)
      assertEquals(result.error?.message, 'plain rejection')
    })
  })
})
