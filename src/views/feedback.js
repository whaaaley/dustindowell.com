
import * as formActions from '../actions/form'
import main from './_main'

import { html, text } from '@onclick/superstatic'
const { a, div, form, h1, input, textarea } = html

const FieldComponent = dispatch => (xxx, props) => {
  props.placeholder = props.name

  props.oninput = event => {
    dispatch(formActions.update, [
      props.name,
      event.target.value
    ])
  }

  return xxx(props)
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

const Feedback = function (state, dispatch) {
  const Field = FieldComponent(dispatch)

  return function () {
    return div({ class: 'feedback' }, [
      div({ class: 'head' }, [
        h1({}, [
          text(['Feedback'])
        ])
      ]),
      div({ class: 'feedback-card' }, [
        form({ name: 'contact' }, [
          Notify({
            data: state.form.data,
            error: state.form.error,
            success: state.form.success
          }),
          Field(input, { type: 'text', name: 'name' }),
          Field(input, { type: 'email', name: 'email' }),
          Field(textarea, { name: 'message' }),
          div({ class: 'feedback-button' }, [
            a({ onclick: () => dispatch(formActions.send) }, [
              text('Send')
            ])
          ])
        ])
      ])
    ])
  }
}

export default {
  setup: main(Feedback)
}
