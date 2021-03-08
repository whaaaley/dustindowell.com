
import link from '../plugins/routerLink'
import { a, text } from '../lib/vnodes/html'

const onclick = (state, data) => event => {
  event.preventDefault()

  link(state, {
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
