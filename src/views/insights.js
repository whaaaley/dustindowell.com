
import { a, div, h1, h2, p, text } from '../lib/vnodes/html'
import * as fb from '../actions/facebook'

const Text = (h, data) => h([text(data)])

// const Login = () => {
//   return div({ class: 'login' }, [
//     text('hello')
//   ])
// }

const Insights = () => () => {
  return div({ class: 'insights' }, [
    div({ class: 'card' }, [
      div({ class: 'graphic' }, [
        div()
      ]),
      div({ class: 'body' }, [
        Text(h1, 'Onclick Insights'),
        Text(h2, 'Instagram Analytics for Business'),
        Text(p, 'First things first! We need access to a Facebook account that\'s connected to a Business Instagram account.')
      ]),
      div({ class: 'button' }, [
        a({ class: '-facebook' }, [
          text('Continue with Facebook')
        ])
      ])
    ])
  ])
}

export default {
  view: Insights,
  onroute: (actions, register) => {
    // <!-- register actions here --->

    return (state, dispatch) => {
      // Facebook SDK
      window.fbAsyncInit = () => {
        FB.init({ appId: '813793032539615', cookie: true, version: 'v10.0' })
        FB.AppEvents.logPageView()
        dispatch(fb.loginStatus)
      }
    }
  }
}
