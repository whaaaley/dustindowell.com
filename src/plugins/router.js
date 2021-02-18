
import * as router from './routerActions'

/**
 * A minimal router using the History API.
 * @module router
 */

const listener = window.addEventListener

export default init => {
  const { state, actions, pages, rewrites, mount } = init

  state.router = {
    id: null,
    query: null,
    to: '/'
  }

  actions.router = {
    init: router.init,
    link: router.link
  }

  /**
   * This plugin requires the saga plugin.
   *
   * The saga plugin wraps the view and mount functions in a callback exposing
   * actions and a define function.
   *
   * Place the saga plugin after this plugin.
   */

  init.view = (actions, register) => (state, dispatch) => {
    const route = pages[state.router.to] || pages['/missing']

    // console.log('Route >>', state.router.to)

    if (typeof route.init === 'function') {
      route.init()
    }

    return route.view(actions, register)(state, dispatch)
  }

  init.mount = actions => (state, dispatch) => {
    const handler = () => {
      dispatch(actions.router.init, rewrites)
    }

    handler()

    listener('pushstate', handler)
    listener('popstate', handler)

    mount(state, dispatch)
  }

  /**
   * Clean up custom init properties this plugin exposes.
   */

  delete init.pages
  delete init.rewrites

  return init
}
