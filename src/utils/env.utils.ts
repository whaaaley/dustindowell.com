type DefaultTuple = readonly [string, string?]

// Resolve one variable: env value wins, then a string default, then the dev/prod tuple slot.
// Returns undefined when nothing resolves so the caller can collect every miss before throwing.
const resolve = (isProd: boolean, key: string, defaultValue?: string | DefaultTuple): string | undefined => {
  const envValue = import.meta.env[key]

  if (envValue !== undefined && envValue !== '') {
    return envValue
  }

  if (defaultValue === undefined) {
    return undefined
  }

  if (typeof defaultValue === 'string') {
    return defaultValue
  }

  const [devDefault, prodDefault] = defaultValue
  const value = isProd ? prodDefault : devDefault

  return value === '' ? undefined : value
}

type EnvReader = {
  getEnv: (key: string, defaultValue?: string | DefaultTuple) => string
  assertComplete: () => void
}

// Build a reader that records every unresolved key, so a misconfigured build can report all misses at once.
// Pass isProd so the reader picks the right dev/prod default; call assertComplete() after declaring the env object.
export const createEnvReader = (isProd: boolean): EnvReader => {
  const missing: string[] = []

  const getEnv = (key: string, defaultValue?: string | DefaultTuple): string => {
    const value = resolve(isProd, key, defaultValue)

    if (value === undefined) {
      missing.push(key)
      return ''
    }

    return value
  }

  const assertComplete = (): void => {
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
    }
  }

  return { getEnv, assertComplete }
}
