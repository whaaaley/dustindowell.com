
import { encode } from './routerLib'

/**
 * Uses the History API to sync browser session history with router state.
 * @function link
 * @example
 * link(state, {
 *   to: '/foobar',
 *   query: {
 *     foo: 'bar'
 *   }
 * })
 */

const dispatchEvent = window.dispatchEvent
const history = window.history

const pushstateEvent = new CustomEvent('pushstate')

export default (state, data) => {
  if (data.to === history.state) {
    history.back()
    return // stop execution
  }

  const to = typeof data.to === 'string' ? data.to : state.router.to
  const href = data.query ? to + encode(data.query) : to

  history.pushState(state.router.to, null, href)
  dispatchEvent(pushstateEvent)
}
