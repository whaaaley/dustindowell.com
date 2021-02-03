
import app from './lib/router'

import form from './stores/form'
import * as resume from './stores/resume'

// import Contact from './views/contact'
import Home from './views/home'
import Missing from './views/missing'
import Resume from './views/resume'

import * as subscriptions from './subscriptions'

app({
  state: {
    form: form.state,
    resume: resume.state,
    benchmark: {
      ms: 0,
      kb: 0
    },
    footer: {
      year: new Date().getFullYear()
    }
  },
  pages: {
    '/': Home,
    // '/contact': Contact,
    '/missing': Missing,
    '/resume': Resume
  },
  rewrites: {
    '/detail': /^\/dp\/[0-9a-f]{24}$/i,
    '/user': /^\/user\/\w+$/i
  },
  mount: (state, dispatch) => {
    const benchmark = subscriptions.benchmark(state, dispatch)
    const gtmanager = subscriptions.gtmanager(state, dispatch)

    dispatch(resume.fetchResume)

    benchmark()
    gtmanager({ id: 'GTM-TC9VHP2' })
  }
})

// Google Tag Manager
window.dataLayer = window.dataLayer || []
window.dataLayer.push({
  'gtm.start': Date.now(),
  'event': 'gtm.js'
})
