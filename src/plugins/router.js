
import * as actions from './routerActions'

/**
 * A minimal router using the History API.
 * @module router
 */

const listener = window.addEventListener

export default ({ state, pages, rewrites, mount }) => {
  state.router = {
    id: null,
    query: null,
    to: '/'
  }

  return {
    state,
    view: register => (state, dispatch) => {
      const to = state.router.to
      const route = pages[to] || pages['/missing']

      console.log('Route', to)

      if (typeof route.init === 'function') {
        route.init()
      }

      return route.view(register)(state, dispatch)
    },
    mount: register => (state, dispatch) => {
      const init = register('router.routerInit', actions.routerInit)

      const handler = () =>
        dispatch(init, rewrites)

      listener('pushstate', handler)
      listener('popstate', handler)

      mount(state, dispatch)
    }
  }
}
