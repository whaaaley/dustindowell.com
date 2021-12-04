
import main from './_main'

import { html, text } from '@onclick/superstatic'
const { div } = html

const Text = (h, data) => h([text(data)])

const Missing = (state, dispatch) => {
  return function () {
    return div({ class: 'missing' }, [
      Text(div, '404 NOT FOUND')
    ])
  }
}

export default {
  setup: main(Missing)
}
