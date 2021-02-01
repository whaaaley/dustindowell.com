
/**
 * Just for fun benchmark. Results shouldn't be taken seriously.
 * @function benchmark
 */

export const benchmark = (state, dispatch) => data => {
  const date = Date.now()
  const html = document.documentElement.outerHTML

  const benchmark = {
    ms: date - window._ms,
    kb: Math.round((html.length / 1000) * 10) / 10
  }

  dispatch(() => ({ benchmark }))
}

/**
 * Ensure that gtm.js never affects load time performance.
 * @function gtm
 */

export const gtmanager = (state, dispatch) => data => {
  if (PROD) {
    window.addEventListener('load', () => {
      const script = document.createElement('script')

      script.defer = true // probably unnecessary
      script.src = 'https://googletagmanager.com/gtm.js?id=' + data.id

      document.body.appendChild(script)
    })
  }
}
