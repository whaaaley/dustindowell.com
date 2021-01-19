
import router from '../stores/router'
import { a, text } from '../lib/vnodes/html'

const onclick = (dispatch, data) => event => {
  event.preventDefault()

  dispatch(router.actions.routerLink, {
    to: data.to,
    query: data.query
  })
}

const Link = (state, dispatch) => (data, content) => {
  const props = {
    class: state.router.to === data.to && '-active',
    href: data.to,
    onclick: onclick(dispatch, data)
  }

  return a(props, [text(content)])
}

export default Link
