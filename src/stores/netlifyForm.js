
import router from '../stores/router'

const searchParams = data => router.lib.encode(data).slice(1)

const submit = ({ netlifyForm }) => async data => {
  try {
    const data = await fetch('/', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: searchParams({
        'form-name': 'contact',
        'name': netlifyForm.name,
        'email': netlifyForm.email,
        'message': netlifyForm.message
      })
    })

    return {
      netlifyForm: {
        data: data,
        success: true
      }
    }
  } catch (err) {
    console.log(err)

    return {
      netlifyForm: {
        success: false
      }
    }
  }
}

// const submit = () => () => {
//   return { netlifyForm }
// }

const update = ({ netlifyForm }) => ([key, value]) => {
  netlifyForm[key] = value
  return { netlifyForm }
}

export default {
  state: {
    data: null,
    success: null,
    name: '',
    email: '',
    message: ''
  },
  actions: {
    submit,
    update
  }
}
