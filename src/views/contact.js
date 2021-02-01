
import { h } from 'superfine/index'

import { a, div, form, h1, input, p, text, textarea } from '../lib/vnodes/html'
import netlifyForm from '../stores/form'
import main from './_main'

const Text = (h, data) => h([text(data)])

const SubmitHandler = dispatch => () => {
  dispatch(netlifyForm.actions.send)
}

const FieldComponent = dispatch => (h, props) => {
  props.placeholder = props.name

  props.oninput = event => {
    dispatch(netlifyForm.actions.update, [
      props.name,
      event.target.value
    ])
  }

  return h(props)
}

const ErrorComponent = props => {
  const key = 'errorComponent'

  if (props.show === true) {
    return div({ key }, [
      text(props.message)
    ])
  }

  return div({ key, hidden: true }) // placeholder
}

const Contact = (state, dispatch) => {
  const Submit = SubmitHandler(dispatch)
  const Field = FieldComponent(dispatch)

  return div({ class: 'contact' }, [
    div({ class: '_topography' }, [
      Text(h1, 'Contact'),
      Text(p, 'Send me something nice.'),
      ErrorComponent({
        show: form.success === false,
        message: form.error
      }),
      form({ name: 'contact' }, [
        Field(input, { type: 'text', name: 'name' }),
        Field(input, { type: 'email', name: 'email' }),
        Field(textarea, { name: 'message' }),
        a({ class: '_button', onclick: Submit }, [text('Send')])
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
