
import { a, div, form, h1, input, p, text, textarea } from '../lib/vnodes/html'
import main from './_main'
import netlifyForm from '../stores/netlifyForm'

const Text = (h, data) => h([text(data)])

const SubmitHandler = dispatch => () => {
  dispatch(netlifyForm.actions.submit)
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

const Contact = (state, dispatch) => {
  const Submit = SubmitHandler(dispatch)
  const Field = FieldComponent(dispatch)

  return div({ class: 'contact' }, [
    div({ class: '_topography' }, [
      Text(h1, 'Contact'),
      Text(p, 'Send me something nice.'),
      form({ name: 'contact' }, [
        // input({ type: 'hidden', name: 'form-name', value: 'contact' }),
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
