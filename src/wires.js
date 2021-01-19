
import { patch } from 'superfine'

import pocket from './lib/pocket'
import router from './stores/router'

const node = document.getElementById('app')
const listener = window.addEventListener

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

  listener('popstate', routeHandler)
  listener('pushstate', routeHandler)

  listener('DOMContentLoaded', () => {
    const html = document.getElementsByTagName('html')[0].outerHTML

    const benchmark = {
      ms: window._ms,
      kb: Math.round((html.length / 1000) * 10) / 10
    }

    dispatch(() => ({ benchmark }))
  })
}
