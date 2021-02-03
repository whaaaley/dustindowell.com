
export const state = {
  data: null,
  error: null,
  loading: null,
  success: null
}

const yep = () => data => {
  const resume = {
    data,
    error: null,
    loading: null,
    success: true
  }

  return { resume }
}

const nop = () => data => {
  const resume = {
    data: null,
    error: data.message,
    loading: null,
    success: false
  }

  return { resume }
}

export const fetchResume = (state, dispatch) => {
  fetch('/resume-vnodes.json', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      dispatch(yep, data)
    })
    .catch(err => {
      dispatch(nop, err)
    })

  const resume = {
    data: null,
    error: null,
    loading: true,
    success: null
  }

  return { resume }
}
