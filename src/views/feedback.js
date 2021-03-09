
import { a, div, form, h1, input, p, text, textarea } from '../lib/vnodes/html'
import * as formActions from '../actions/form'
import main from './_main'

const Text = (h, data) => h([text(data)])

const SubmitHandler = dispatch => () => {
  dispatch(formActions.send)
}

const FieldComponent = dispatch => (h, props) => {
  props.placeholder = props.name

  props.oninput = event => {
    dispatch(formActions.update, [
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

const Feedback = () => dispatch => {
  const Submit = SubmitHandler(dispatch)
  const Field = FieldComponent(dispatch)

  return div({ class: 'contact feedback' }, [
    div({ class: 'card' }, [
      Text(h1, 'Feedback'),
      Text(p, 'Send me feedback on how to improve my apps or maybe some cute messages.'),
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
  view: register => main(Feedback(register)),
  onroute: () => () => {}
}