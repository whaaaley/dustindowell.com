
import app from './lib/pocket'

import stores from './plugins/stores'
import router from './plugins/router'
import saga from './plugins/saga'

import * as fb from './actions/facebook'

import facebook from './stores/facebook'

import Home from './views/home'
import AppStore from './views/appstore'
import Blog from './views/blog'
import Contact from './views/contact'
import Counter from './views/counter'
// import Insights from './views/insights'

import Insights from './views/insights2'
import Interface from './views/interface'

import Missing from './views/missing'
import Policy from './views/policy'
import Resume from './views/resume'

import * as subs from './subscriptions'

window._logs = [
  ['The inline console is currently unavailable.'],
  ['Open dev tools until this feature becomes stable.']
]

// console._log_old = console.log

// Avert your eyes from the unethtical monkey patching.
// This is for demo purposes only.

// console.log = (...args) => {
//   window._logs.push(args)
//   console._log_old(...args)
// }

app([stores, router, saga], {
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
    form: { data: null, error: null, loading: null, success: null },
    formData: { name: '', email: '', message: '' },
    github: { data: null, error: null, loading: null, success: null },
    resume: { data: null, error: null, loading: null, success: null },

    interface: {
      activeTab: 'stats'
    },

    foo: {
      persist: true
    },

    prompt: {
      account: {
        id: '124',
        name: 'whaley'
      },
      active: null,
      loading: null,
      success: null
    },

    fbAccounts: { data: null, error: null, loading: null, success: null },
    fbLogin: { data: null, error: null, loading: null, success: null },
    fbMe: { data: null, error: null, loading: null, success: null },
    insights: { data: null, error: null, loading: null, success: null },
    igAccount: { data: null, error: null, loading: null, success: null }
  },
  actions: {

  },
  stores: {
    facebook
  },
  pages: {
    '/': Home,
    '/apps': AppStore,
    '/blog': Blog,
    '/contact': Contact,
    '/counter': Counter,
    '/insights': Insights, // insights/login ???
    '/insights/interface': Interface,
    '/missing': Missing,
    '/policy': Policy,
    '/resume': Resume
  },
  rewrites: {
    '/detail': '^\\/dp\\/[0-9a-f]{24}$',
    '/user': '^\\/user\\/\\w+$'
  },
  mount: (state, dispatch) => {
    subs.benchmark(dispatch)
    subs.gtm({ id: 'GTM-TC9VHP2' })
    subs.fbsdk()

    //
    // Simple session state persistence
    //

    window.addEventListener('beforeunload', () => {
      dispatch(state => {
        if (state.foo.persist === false) {
          return // do nothing
        }

        const { fbAccounts, fbLogin, fbMe, igAccount, insights, prompt } = state
        const data = { fbAccounts, fbLogin, fbMe, igAccount, insights, prompt }

        sessionStorage.setItem('state', JSON.stringify(data))
      })
    })

    window.addEventListener('DOMContentLoaded', () => {
      dispatch(() => {
        return JSON.parse(sessionStorage.getItem('state'))
      })
    })

    //
    // Facebook SDK
    // Maybe there's a better place for this? Perhaps a plugin.
    //

    window.fbAsyncInit = () => {
      FB.init({
        appId: '813793032539615',
        cookie: true,
        version: 'v10.0'
      })

      dispatch(fb.loginStatus)

      FB.AppEvents.logPageView()
    }
  }
})

// Google Tag Manager
window.dataLayer = window.dataLayer || []
window.dataLayer.push({
  'gtm.start': Date.now(),
  'event': 'gtm.js'
})
