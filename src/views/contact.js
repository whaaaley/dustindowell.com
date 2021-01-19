
import { a, div, form, h1, input, p, text, textarea } from '../lib/vnodes/html'

import main from './_main'

const Text = (h, data) => h([text(data)])

const Contact = (state, dispatch) => {
  return div({ class: 'contact' }, [
    div({ class: '_topography' }, [
      Text(h1, 'Contact'),
      Text(p, 'Send me something nice.'),
      form([
        input({ placeholder: 'Name' }),
        input({ placeholder: 'Email' }),
        textarea({ placeholder: 'Email' }),
        a({ class: '_button' }, [text('Send')])
      ])
    ])
  ])
}

export default {
  view: main(Contact),
  init: () => {
    console.log('contact')
  }
}
