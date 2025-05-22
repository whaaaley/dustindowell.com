
import * as router from '../lib/routerLib'

const encode = data => router.encode(data).slice(1)

export const update = ({ formData }, [key, value]) => {
  formData[key] = value
  return { formData }
}

const replace = (x, data) => ({ form: data })

export const send = ({ formData }, x) => dispatch => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: encode({
      'form-name': 'contact',
      'name': formData.name,
      'email': formData.email,
      'message': formData.message
    })
  }

  fetch('/', options)
    .then(() => {
      dispatch(replace, {
        data: 'You did it! Thanks!',
        error: null,
        loading: false,
        success: true
      })
    })
    .catch(error => {
      dispatch(replace, {
        data: null,
        error: error.message,
        loading: false,
        success: false
      })
    })

  dispatch(replace, {
    data: null,
    error: null,
    loading: true,
    success: null
  })
}
