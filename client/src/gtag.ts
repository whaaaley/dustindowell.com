declare global {
  interface Window {
    dataLayer: IArguments[]
    gtag: Gtag.Gtag
  }
}

// Uses arguments object instead of rest params because gtag.js requires it
// https://developers.google.com/tag-platform/gtagjs/install
function gtagFn () {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

if (!import.meta.env.SSR && import.meta.env.PROD) {
  window.dataLayer = window.dataLayer || []
  window.gtag = gtagFn as Gtag.Gtag
  window.gtag('js', new Date())
  window.gtag('config', 'G-TFQF6XTQLL')
}
