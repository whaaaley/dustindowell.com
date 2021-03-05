
import * as lib from './facebookLib'
import * as router from '../plugins/routerLib'

/**
 * A helper function to create status objects.
 * @function status
 */

const status = (data, error, loading, success) =>
  ({ data, error, loading, success })

/**
 *
 * @function login
 */

const loginLoading = status(null, null, true, null)

const scopes = [
  'instagram_basic',
  'instagram_manage_insights',
  'pages_read_engagement'
]

const scope = scopes.join(',')

export const login = () => async dispatch => {
  dispatch(() => ({ fbLogin: loginLoading }))

  const res = await lib.fbLogin({ scope })
  console.log('login >>>>>>', res)

  if (res.error) {
    return {
      fbLogin: status(null, res.error, false, false)
    }
  }

  return {
    fbLogin: status(res, null, false, true)
  }
}

/**
 *
 * @function loginStatus
 */

export const loginStatus = () => async dispatch => {
  dispatch(() => ({
    fbMe: meLoading,
    fbLogin: loginLoading
  }))

  const loginResponse = await lib.fbLoginStatus()
  const meResponse = await lib.fbFetch('/me', { fields: 'first_name,picture' })

  if (loginResponse.error || meResponse.error) {
    return {
      fbme: status(null, meResponse.error, false, false),
      fbLogin: status(null, loginResponse.error, false, false)
    }
  }

  return {
    fbMe: status(meResponse, null, false, true),
    fbLogin: status(loginResponse, null, false, true)
  }
}

/**
 *
 * @function logout
 */

export const logout = () => async () => {
  const res = await lib.fbLogout()
  console.log('logout >>>>>>', res)

  if (res.error) console.log(res.error)

  // Temporary solution
  // However it's the easiest way to reset state
  location.reload()
}

/**
 *
 * @function me
 */

const meLoading = status(null, null, true, null)

export const me = () => async dispatch => {
  dispatch(() => ({ fbMe: meLoading }))

  const res = await lib.fbFetch('me/?fields=first_name,picture')
  console.log('me >>>>>>', res)

  if (res.error) {
    return {
      fbMe: status(null, res.error, false, false)
    }
  }

  return {
    fbMe: status(res, null, false, true)
  }
}

/**
 *
 * @function accounts
 */

const accountsLoading = status(null, null, true, null)

export const accounts = () => async dispatch => {
  dispatch(() => ({ fbAccounts: accountsLoading }))

  const res = await lib.fbFetch('me/accounts?fields=category_list,name')
  console.log('accounts >>>>>>', res)

  if (res.error) {
    return {
      fbAccounts: status(null, res.error, false, false)
    }
  }

  return {
    fbAccounts: status(res, null, false, true)
  }
}

/**
 *
 * @function accounts
 */

const igAccountLoading = status(null, null, true, null)

export const igAccount = state => async dispatch => {
  dispatch(() => ({ igAccount: igAccountLoading }))

  const id = state.prompt.active
  const res = await lib.fbFetch(`${id}?fields=instagram_business_account`)

  console.log('igAccount >>>>>>', res)

  if (res.error) {
    return {
      igAccount: status(null, res.error, false, false)
    }
  }

  return {
    igAccount: status(res, null, false, true)
  }
}

/**
 *
 * @function media
 */

const getMedia = async data => {
  const res = await lib.fbFetch(`${data.id}/media${data.query}`)
  const paging = res.paging

  // TODO: Fix this mess of a condition
  if (paging && paging.cursors && paging.cursors.after) {
    return await getMedia({
      id: data.id,
      query: `?after=${res.paging.cursors.after}`,
      media: data.media.concat(res.data)
    })
  }

  return data.media
}

// const mediaLoading = status(null, null, true, null)
//
// export const media = (x, data) => async dispatch => {
//   dispatch(() => ({ media: mediaLoading }))
//
//   const media = await getMedia({
//     id: data.id,
//     query: '',
//     media: []
//   })
//
//   // TODO: Handle errors somehow?
//   // if (res.error) {
//   //   return { media: status(null, error, false, false) }
//   // }
//
//   console.log('media >>>>>>', media)
//
//   return {
//     media: status(media, null, false, true)
//   }
// }

/**
 *
 * @function insights
 */

const getInsights = async data => {
  const media = await getMedia({
    id: data.id,
    query: '',
    media: []
  })

  const insights = []
  const promises = {}

  const query = router.encode({
    fields: 'name,values',
    metric: 'engagement,impressions,reach,saved'
  })

  // make all the requests
  for (let i = media.length; i--;) {
    const id = media[i].id
    promises[id] = lib.fbFetch(`${id}/insights${query}`)
  }

  // format the data
  for (const key in promises) {
    const res = await promises[key]

    // skip errors
    if (res.error) continue

    const post = {}

    for (let i = res.data.length; i--;) {
      const stat = res.data[i]

      post.id = key
      post[stat.name] = stat.values[0].value
    }

    insights.push(post)
  }

  return insights
}

const insightsLoading = status(null, null, true, null)

export const insights = (x, data) => async dispatch => {
  dispatch(() => ({ insights: insightsLoading }))

  const insights = await getInsights(data)
  console.log('insights >>>>>>', insights)

  // if (res.error) {
  //   return { insights: status(null, res.error, false, false) }
  // }

  return {
    insights: status(insights, null, false, true)
  }
}
