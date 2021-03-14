import app from './lib/pocket'

import Home from './views/home'
import Apps from './views/apps'
import Blog from './views/blog'
import Feedback from './views/feedback'
// import Counter from './views/counter'

import Missing from './views/missing'
import Policy from './views/policy'
import Resume from './views/resume'

import * as subs from './subscriptions'

app({
  state: {
    benchmark: {
      ms: 0,
      kb: 0
    },
    counter: {
      data: 0
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
    // '/counter': Counter,
    '/missing': Missing,
    '/policy': Policy,
    '/resume': Resume
  },
  mount: (state, dispatch) => {
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
