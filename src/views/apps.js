
import { div, text } from '../lib/vnodes/html'
import main from './_main'

const Text = (h, data) => h([text(data)])

const Missing = register => (state, dispatch) => {
  return div({ class: 'missing' }, [
    Text(div, 'APPS PAGE SOON')
  ])
}

export default {
  view: register => main(Missing(register)),
  onroute: () => () => {}
}
