
import { a, div, form, h1, input, p, text, textarea } from '../lib/vnodes/html'
import * as formActions from '../actions/form'
import main from './_main'

const h = (tag, data) => tag([text(data)])

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

const Notify = props => {
  const key = 'feedbackNotify'

  if (props.success === true) {
    return div({ key, class: 'notify -success' }, [
      text(props.data)
    ])
  }

  if (props.success === false) {
    return div({ key, class: 'notify -error' }, [
      text(props.error)
    ])
  }

  return div({ key, hidden: true }) // placeholder
}

const Feedback = () => (state, dispatch) => {
  const Field = FieldComponent(dispatch)

  return div({ class: 'contact feedback' }, [
    div({ class: 'card' }, [
      h(h1, 'Feedback'),
      h(p, 'Send me feedback on how to improve my apps or maybe some cute messages.'),
      Notify({
        data: state.form.data,
        error: state.form.error,
        success: state.form.success
      }),
      form({ name: 'contact' }, [
        Field(input, { type: 'text', name: 'name' }),
        Field(input, { type: 'email', name: 'email' }),
        Field(textarea, { name: 'message' }),
        a({
          class: '_button',
          onclick: () => dispatch(formActions.send)
        }, [
          text('Send')
        ])
      ])
    ])
  ])
}

export default {
  view: (actions, register) => main(Feedback(actions, register)),
  onroute: () => () => {}
}
