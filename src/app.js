
import app from './wires'

import netlifyForm from './stores/netlifyForm'
import router from './stores/router'

import Contact from './views/contact'
import Home from './views/home'
import Missing from './views/missing'
import Resume from './views/resume'

app({
  state: {
    netlifyForm: netlifyForm.state,
    router: router.state,
    benchmark: {
      ms: 0,
      kb: 0
    }
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
