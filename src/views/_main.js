
import { div, nav, text } from '../lib/vnodes/html'
import Link from './_link'

const Text = (h, data) => h([text(data)])

const Main = slot => (state, dispatch) => {
  const Slot = slot(state, dispatch)

  return div([
    nav([
      Text(div, 'D'),
      Link({ to: '/' }, 'Home'),
      Link({ to: '/apps' }, 'Apps'),
      // Link({ to: '/blog' }, 'Blog'),
      // Link({ to: '/contact' }, 'Contact'),
      Link({ to: '/resume' }, 'Resume')
    ]),
    Slot
  ])
}

export default Main
