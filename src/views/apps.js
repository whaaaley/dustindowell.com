
import { a, div, h1, p, text } from '../lib/vnodes/html'

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
      Item({
        to: '/insights',
        title: 'Onclick Insights',
        iconClass: '-insights', // Until I can make SVG icons for everything
        body: 'Instagram Analytics for Business. Connect your Facebook account to view Instagram analytics.'
      }),
      Item({
        to: '/resize',
        title: 'Resize.gg',
        iconClass: '-resize', // Until I can make SVG icons for everything
        body: 'Small utility to cacluate aspect ratio dimensions.'
      }),
      Item({
        to: '/blog',
        title: 'Dustin\'s Blog',
        iconClass: '-blog', // Until I can make SVG icons for everything
        body: 'You can find all my software rants here. I think I\'m smart sometimes. There might be some useful info.'
      }),
      Item({
        to: '/feedback',
        title: 'Feedback',
        iconClass: '-feedback', // Until I can make SVG icons for everything
        body: 'Send me feedback on how to improve my apps or maybe some cute messages.'
      })
    ])
  }
}

export default {
  view: register => main(Apps(register)),
  onroute: () => () => {}
}
