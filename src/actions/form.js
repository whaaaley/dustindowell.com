
import * as router from '../plugins/routerLib'

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

  console.log(options)

  fetch('/', options)
    .then(res => res.json())
    .then(data => {
      dispatch(replace, {
        data,
        error: undefined,
        loading: undefined,
        success: true
      })
    })
    .catch(error => {
      dispatch(replace, {
        data: undefined,
        error: error.message,
        loading: undefined,
        success: false
      })
    })

  dispatch(replace, {
    data: undefined,
    error: undefined,
    loading: true,
    success: undefined
  })
}
