import app from './lib/pocket'

import Home from './views/home'
import Apps from './views/apps'
import Blog from './views/blog'
import Feedback from './views/feedback'

import Missing from './views/missing'
import Resume from './views/resume'

import * as subs from './subscriptions'

app({
  state: {
    benchmark: {
      ms: 0,
      kb: 0
    },
    footer: {
      year: new Date().getFullYear()
    },
    form: {
      data: null,
      error: null,
      loading: null,
      success: null
    },
    formData: {
      name: '',
      email: '',
      message: ''
    },
    resume: {
      data: null,
      error: null,
      loading: null,
      success: null
    }
  },
  pages: {
    '/': Home,
    '/apps': Apps,
    '/blog': Blog,
    '/feedback': Feedback,
    '/missing': Missing,
    '/resume': Resume
  },
  start: dispatch => {
    subs.benchmark(dispatch)
    subs.gtm({ id: 'GTM-TC9VHP2' })
  }
})

// Google Tag Manager
window.dataLayer = window.dataLayer || []
window.dataLayer.push({
  'gtm.start': Date.now(),
  'event': 'gtm.js'
})
