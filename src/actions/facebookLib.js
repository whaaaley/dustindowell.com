
/**
 * Promise wrapper around Facebook FB.api
 * @function fbFetch
 */

export const fbFetch = (path, params) => new Promise(resolve => {
  FB.api(path, res => {
    resolve(res)
  }, params)
})

/**
 * Promise wrapper around Facebook FB.login
 * @function fbLogin
 */

export const fbLoginStatus = params => new Promise(resolve => {
  FB.getLoginStatus(res => {
    resolve(res)
  }, params)
})

/**
 * Promise wrapper around Facebook FB.login
 * @function fbLogin
 */

export const fbLogin = params => new Promise(resolve => {
  FB.login(res => {
    resolve(res)
  }, params)
})

/**
 * Promise wrapper around Facebook FB.logout
 * @function fbLogout
 */

export const fbLogout = () => new Promise(resolve => {
  FB.logout(res => {
    resolve(res)
  })
})
