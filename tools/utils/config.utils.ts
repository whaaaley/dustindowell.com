import { fromFileUrl, resolve } from '@std/path'
import { z } from 'zod'
import { safeAsync } from '$common/safe.ts'

const CONFIG_PATH: string = resolve(fromFileUrl(import.meta.url), '../../config.json')

type LoadConfigSliceOptions<T extends z.ZodTypeAny> = {
  key: string
  schema: T
}

// Reads tools/config.json, extracts the slice keyed by `key`, and validates it through `schema`.
// Returns the parsed slice (with schema defaults applied) when the file is missing or the slice is absent,
// so individual tools always get a usable config without repeating fallback logic.
export const loadConfigSlice = async <T extends z.ZodTypeAny>(options: LoadConfigSliceOptions<T>): Promise<z.infer<T>> => {
  const { key, schema } = options

  const { data: raw, error: readError } = await safeAsync(() => Deno.readTextFile(CONFIG_PATH))
  if (readError) {
    return schema.parse({})
  }

  const fileSchema = z.record(z.string(), z.unknown())
  const fileResult = fileSchema.safeParse(JSON.parse(raw))
  if (!fileResult.success) {
    return schema.parse({})
  }

  const slice = fileResult.data[key] ?? {}

  return schema.parse(slice)
}
