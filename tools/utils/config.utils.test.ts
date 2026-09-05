import { assertEquals } from '@std/assert'
import { describe, it } from '@std/testing/bdd'
import { z } from 'zod'
import { loadConfigSlice } from './config.utils.ts'

describe('All Config Utils Tests', () => {
  it('returns the committed slice for a configured tool', async () => {
    // Arrange
    const schema = z.object({ text: z.string(), output: z.string() })

    // Act
    const config = await loadConfigSlice({ key: 'wordmark', schema })

    // Assert
    assertEquals(config.text, 'Dustin Dowell')
    assertEquals(config.output, '../client/src/components/brand/Wordmark.tsx')
  })

  it('falls back to schema defaults for a tool with no slice', async () => {
    // Arrange
    const schema = z.object({ retries: z.number().default(3) })

    // Act
    const config = await loadConfigSlice({ key: 'missing-tool', schema })

    // Assert
    assertEquals(config.retries, 3)
  })
})
