
import { div } from '../lib/vnodes/html'

import main from './_main'
import link from './_link'

const Missing = () => {
  return (state, dispatch) => {
    const Link = link(state, dispatch)

    return div({ class: 'missing' }, [
      div([
        Link({ to: '/contact' }, 'Contact'),
        Link({ to: '/resize' }, 'Resize'),
        Link({ to: '/insights' }, 'Insights'),
        Link({ to: '/insights/interface' }, 'Interface')
      ])
    ])
  }
}

export default {
  view: register => main(Missing(register)),
  onroute: () => () => {}
}
