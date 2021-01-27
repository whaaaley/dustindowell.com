
import router from '../stores/router'

const searchParams = data => router.lib.encode(data).slice(1)

const submit = ({ netlifyForm }) => async data => {
  console.log('>>>', netlifyForm)

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: searchParams({
      name: netlifyForm.name,
      email: netlifyForm.email,
      message: netlifyForm.message
    })
  }

  console.log(options)

  try {
    console.log('Form successfully submitted')

    const data = await fetch('/', options)

    return {
      netlifyForm: {
        data: data,
        success: true
      }
    }
  } catch (err) {
    console.log(err)
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
