
import app from './wires'

import router from './stores/router'

import Contact from './views/contact'
import Home from './views/home'
import Missing from './views/missing'
import Resume from './views/resume'

app({
  state: {
    router: router.state
  },
  pages: {
    '/': Home,
    '/contact': Contact,
    '/missing': Missing,
    '/resume': Resume
  },
  rewrites: {
    '/detail': /^\/dp\/[0-9a-f]{24}$/i,
    '/user': /^\/user\/\w+$/i
  }
})

// Google Tag Manager
window.dataLayer = window.dataLayer || []
window.dataLayer.push({
  'gtm.start': Date.now(),
  'event': 'gtm.js'
})
