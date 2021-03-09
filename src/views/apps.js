
import { a, div, h1, h2, p, text } from '../lib/vnodes/html'

import main from './_main'
import link from '../plugins/routerLink'

const h = (tag, data) => tag([text(data)])

const Item = data => {
  return a({
    class: 'item',
    href: data.to, // for web crawlers
    onclick: event => {
      event.preventDefault() // prevent href
      link({ to: data.to })
    }
  }, [
    div({ class: 'icon ' + data.iconClass }),
    div({ class: 'body' }, [
      h(h1, data.title),
      h(p, data.body)
    ])
  ])
}

const Apps = (actions, register) => {
  return (state, dispatch) => {
    return div({ class: 'apps' }, [
      div({ class: 'head' }, [
        h(h1, 'Apps'),
        h(h2, 'Welcome to my little web app store.')
      ]),
      Item({
        to: '/insights',
        title: 'Onclick Insights',
        iconClass: '-insights',
        body: 'Connect your Facebook account to view Instagram analytics for business accounts.'
      }),
      Item({
        to: '/resize',
        title: 'Resize.gg',
        iconClass: '-resize',
        body: 'Small utility to cacluate aspect ratio dimensions.'
      }),
      // Item({
      //   to: '/wiki',
      //   title: 'Wiki Editor (wip)',
      //   iconClass: '-resize',
      //   body: 'A simple dashboard and editor to create wiki-like articles using markdown.'
      // }),
      Item({
        to: '/blog',
        title: 'Dustin\'s Blog',
        iconClass: '-blog',
        body: 'You can find all my software rants here. I think I\'m smart sometimes. '
      }),
      Item({
        to: '/feedback',
        title: 'Feedback',
        iconClass: '-feedback',
        body: 'Send me feedback on how to improve my apps or maybe some cute messages.'
      }),
      Item({
        to: '/counter',
        title: 'Counter Demo',
        iconClass: '-calculate',
        body: 'Demo page showcasing the framework all of my apps are built with.'
      }),
      Item({
        to: '/resume',
        title: 'Dustin\'s Resume',
        iconClass: '-resume',
        body: 'I\'m a self taught developer and designer. See all of my skills and experience here.'
      }),
      div({ class: '_footer -span' }, [
        p([
          text('© ' + state.footer.year + ' Dustin Dowell')
        ])
      ])
    ])
  }
}

export default {
  view: register => main(Apps(register)),
  onroute: () => () => {}
}
