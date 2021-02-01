
import router from './router'
import actions from '../actions'

const Fetch = (state, dispatch) => data => {
  dispatch(actions.fetch, data)
}

const encode = data => router.lib.encode(data).slice(1)

const send = (state, dispatch) => {
  const { form } = state
  const fetch = Fetch(state, dispatch)

  fetch('/', {
    options: {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: encode({
        'form-name': 'contact',
        'name': form.name,
        'email': form.email,
        'message': form.message
      })
    },
    then: data => ({
      form: {
        data,
        error: undefined,
        loading: undefined,
        success: true
      }
    }),
    catch: error => ({
      form: {
        data: undefined,
        error: error.message,
        loading: undefined,
        success: false
      }
    })
  })

  form.loading = true

  return { form }
}

const update = ({ form }) => ([key, value]) => {
  form[key] = value
  return { form }
}

export default {
  state: {
    data: null,
    error: null,
    loading: null,
    success: null,
    name: '',
    email: '',
    message: ''
  },
  actions: {
    send,
    update
  }
}
