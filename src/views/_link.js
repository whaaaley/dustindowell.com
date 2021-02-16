
import { routerLink } from '../plugins/routerActions'
import { a, text } from '../lib/vnodes/html'

// Note: It might be worth exploring a way to wire this from the plugin.
// something like doing a partial application from mount or effects.

const onclick = (state, data) => event => {
  event.preventDefault()

  // NOTE: Using this action directly rather than through dispatch prevents
  // scheduling an unessecary render since routerLink doesn't return any state.
  // Now we're only triggering the event lisenters for the custom pushstate
  // event or the History API's popstate event.
  routerLink(state, {
    to: data.to,
    query: data.query
  })
}

const Link = state => (data, content) => {
  const props = {
    class: state.router.to === data.to && '-active',
    href: data.to,
    onclick: onclick(state, data)
  }

  return a(props, [text(content)])
}

export default Link
