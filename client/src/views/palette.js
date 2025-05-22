
import { div } from '../lib/vnodes/html'

import main from './_main'

const Card = data => {
  return div({ class: 'palette-card ' + data.theme }, [
    div(),
    div(),
    div(),
    div(),
    div(),
    div()
  ])
}

const Palette = (state, dispatch) => {
  return div({ class: 'palette' }, [
    div({ class: 'palette-main' }, [
      Card({ theme: '-light' }),
      Card({ theme: '-dark' }),
      Card({ theme: '-purple' })
    ])
  ])
}

export default {
  view: main(Palette),
  onroute: () => {}
}
