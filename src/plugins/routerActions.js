
import { encode, decode } from './routerLib'

/**
 * Sets router state based on the `window.location` property and apply route
 * rewrites if any.
 * @function routerInit
 * @example
 * dispatch(routerInit, {
 *   '/detail': '^\\/dp\\/[0-9a-f]{24}$',
 *   '/user': '^\\/user\\/\\w+$'
 * })
 */

export const routerInit = ({ router }, data) => {
  const { pathname, search } = window.location

  if (typeof search === 'string') {
    router.query = decode(search)
  }

  for (const key in data) {
    const regexp = new RegExp(data[key], 'i')
    const result = regexp.exec(pathname)

    if (result != null) {
      router.id = result[0]
      router.to = key

      return { router }
    }
  }

  router.to = pathname

  return { router }
}

/**
 * Uses the History API to sync browser session history with router state.
 * @function routerLink
 * @example
 * routerLink(state)({
 *   to: '/foobar',
 *   query: {
 *     foo: 'bar'
 *   }
 * })
 */

const pushstateEvent = new CustomEvent('pushstate')

export const routerLink = (state, data) => {
  if (data.to === window.history.state) {
    window.history.back()
    return // stop execution
  }

  const to = typeof data.to === 'string' ? data.to : state.router.to
  const href = data.query ? to + encode(data.query) : to

  window.history.pushState(state.router.to, null, href)
  window.dispatchEvent(pushstateEvent)
}
