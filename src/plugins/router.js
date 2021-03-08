
import { decode } from './routerLib'

/**
 * A minimal router using the History API.
 * @module router
 */

export default init => {
  const { state, pages, rewrites, mount } = init
  const registeredPages = {}
  let route

  state.router = {
    id: null,
    query: null,
    to: '/'
  }

  /**
   * Sets router state based on `window.location` and applies route rewrites.
   * @function routerSync
   * @example
   * dispatch(routerSync, {
   *   '/detail': '^\\/dp\\/[0-9a-f]{24}$',
   *   '/user': '^\\/user\\/\\w+$'
   * })
   */

  const location = window.location

  const routerSync = ({ router }, data) => {
    if (typeof search === 'string') {
      router.query = decode(data.query)
    }

    for (const key in rewrites) {
      const regexp = new RegExp(rewrites[key], 'i')
      const result = regexp.exec(data.to)

      if (result != null) {
        router.id = result[0]
        router.to = key

        return { router }
      }
    }

    router.to = data.to

    return { router }
  }

  /**
   * This plugin requires the saga plugin.
   *
   * The saga plugin wraps the view and mount functions in a callback exposing
   * actions and a register function.
   *
   * Place the saga plugin after this plugin.
   */

  const listener = window.addEventListener

  init.view = (state, dispatch) => route.view(state, dispatch)

  init.mount = (actions, register) => {
    for (const key in pages) {
      const page = pages[key]

      registeredPages[key] = {
        view: page.view(actions, register),
        onroute: page.onroute(actions, register)
      }
    }

    const sync = register('router.sync', routerSync)

    return (state, dispatch) => {
      const handler = () => {
        dispatch(sync, {
          to: location.pathname,
          query: location.search
        })

        route = registeredPages[state.router.to] || registeredPages['/missing']

        if (typeof route.onroute === 'function') {
          route.onroute(state, dispatch)
        }
      }

      handler()

      listener('pushstate', handler)
      listener('popstate', handler)

      mount(state, dispatch)
    }
  }

  /**
   * Clean up custom init properties this plugin exposes.
   */

  delete init.pages
  delete init.rewrites

  return init
}
