const GTAG_ID = 'G-TFQF6XTQLL'

const dataLayer = (): unknown[] => {
  const existing = Reflect.get(globalThis, 'dataLayer')
  if (Array.isArray(existing)) {
    return existing
  }
  const created: unknown[] = []
  Reflect.set(globalThis, 'dataLayer', created)
  return created
}

// gtag.js reads the arguments object off the data layer, so this cannot be an arrow function with rest params
function gtag (..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  dataLayer().push(arguments)
}

if (!import.meta.env.SSR && import.meta.env.PROD) {
  Reflect.set(globalThis, 'gtag', gtag)
  gtag('js', new Date())
  gtag('config', GTAG_ID)
}
