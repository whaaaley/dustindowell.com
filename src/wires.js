
import { patch } from 'superfine'

import pocket from './lib/pocket'
import router from './stores/router'

const node = document.getElementById('app')
const addEventListener = window.addEventListener

export default ({ state, pages, rewrites }) => {
  let route

  const dispatch = pocket(state, () => {
    patch(node, route.view(state, dispatch))
  })

  const routeHandler = () => {
    dispatch(router.actions.routerInit, rewrites)
    route = pages[state.router.to] || pages['/missing']
    route.init()
  }

  routeHandler()

  addEventListener('popstate', routeHandler)
  addEventListener('pushstate', routeHandler)

  // Just for fun benchmark. Results shouldn't be taken seriously.
  addEventListener('DOMContentLoaded', () => {
    const date = Date.now()
    const html = document.documentElement.outerHTML

    const benchmark = {
      ms: date - window._ms,
      kb: Math.round((html.length / 1000) * 10) / 10
    }

    dispatch(() => ({ benchmark }))
  })

  // Ensure that gtm.js never affects load time performance.
  if (PROD === true) {
    addEventListener('load', () => {
      const script = document.createElement('script')

      script.defer = true // probably unnecessary
      script.src = 'https://googletagmanager.com/gtm.js?id=GTM-TC9VHP2'

      document.body.appendChild(script)
    })
  }
}
