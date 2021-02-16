
import app from './lib/pocket'

import saga from './plugins/saga'
import router from './plugins/router'

import * as resume from './actions/resume'

import Home from './views/home'
import Blog from './views/blog'
import Contact from './views/contact'
import Counter from './views/counter'
import Missing from './views/missing'
import Resume from './views/resume'

import * as subscriptions from './subscriptions'

// avert your eyes from the unethtical monkey patching
// this is for demo purposes only
window._logs = []
console._log_old = console.log

console.log = (...args) => {
  window._logs.push(args)
  console._log_old(...args)
}

app([router, saga], {
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
    github: {
      data: null,
      error: null,
      loading: null,
      success: null
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
    '/blog': Blog,
    '/contact': Contact,
    '/counter': Counter,
    '/missing': Missing,
    '/resume': Resume
  },
  rewrites: {
    '/detail': '^\\/dp\\/[0-9a-f]{24}$',
    '/user': '^\\/user\\/\\w+$'
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
