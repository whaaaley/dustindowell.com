
/**
 * Just for fun benchmark. Results shouldn't be taken seriously.
 * @function benchmark
 */

export const benchmark = dispatch => {
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

export const gtm = data => {
  if (PROD) {
    window.addEventListener('load', () => {
      const script = document.createElement('script')

      script.async = true
      script.defer = true

      script.id = 'gtm'
      script.src = 'https://googletagmanager.com/gtm.js?id=' + data.id

      document.body.appendChild(script)
    })
  }
}

/**
 * Ensure that Facebook SDK never affects load time performance.
 * @function fbsdk
 */

export const fbsdk = () => {
  window.addEventListener('load', () => {
    const script = document.createElement('script')

    script.async = true
    script.defer = true

    script.id = 'facebook-jssdk'
    script.src = 'https://connect.facebook.net/en_US/sdk.js'

    document.body.appendChild(script)
  })
}
