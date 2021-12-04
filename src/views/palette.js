
import main from './_main'

import { html } from '@onclick/superstatic'
const { div } = html

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
  return function () {
    return div({ class: 'palette' }, [
      div({ class: 'palette-main' }, [
        Card({ theme: '-light' }),
        Card({ theme: '-dark' }),
        Card({ theme: '-purple' })
      ])
    ])
  }
}

export default {
  setup: main(Palette)
}
