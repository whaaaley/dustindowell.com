
import { a, div, h1, h2, p, text } from '../lib/vnodes/html'

import main from './_main'
import link from '../lib/routerLink'

const h = (tag, data) => tag([text(data)])

const Item = data => {
  const onclick = event => {
    event.preventDefault() // prevent href
    link({ to: data.to })
  }

  const props = typeof data.href === 'string'
    ? { href: data.href, target: '_blank' }
    : { href: data.to, onclick }

  return a({ class: 'portfolio-item', ...props }, [
    div({ class: 'icon ' + data.iconClass }),
    div({ class: 'portfolio-item-body' }, [
      div({ style: 'display: flex; align-items: center; justify-content: space-between; flex: 1 0 auto; gap: 16px;' }, [
        h(h1, data.title),
        data.published && h(p, data.published)
      ]),
      h(p, data.body)
    ])
  ])
}

const Apps = (state, dispatch) => {
  return div({ class: 'apps' }, [
    div({ class: 'head' }, [
      h(h1, 'Professional Work')
    ]),
    Item({
      href: 'https://app.compose.co/',
      title: 'Compose App',
      published: 'Aug 23, 2023',
      iconClass: '-code-purple',
      body: 'The newest solution for conversion rate optimization and A/B testing.'
    }),
    Item({
      href: 'https://compose.co/',
      title: 'Compose Website',
      published: 'Aug 23, 2023',
      iconClass: '-code-purple',
      body: 'The newest solution for conversion rate optimization and A/B testing.'
    }),
    Item({
      href: 'https://udundi.com/',
      title: 'Udundi',
      published: 'Aug 23, 2023',
      iconClass: '-code-blue',
      body: 'Custom Web Design & Development Agency specializing in Shopify.'
    }),
    Item({
      // href: 'https://alqen.io/',
      href: 'https://marketplace.walmart.com/alqen/',
      title: 'Alqen',
      published: 'June 1, 2022',
      iconClass: '-code-red',
      body: 'Alqen provides a suite of tools for Walmart Marketplace sellers.'
    }),
    Item({
      href: 'https://accesstrucks.com/',
      title: 'AccessTrucks',
      published: 'Nov, 1 2019',
      iconClass: '-trucks-red',
      body: 'A box truck aggregation site. Potential buyers can browse trucks from dealerships around the country.'
    }),
    Item({
      href: 'https://sleepertrader.com/',
      title: 'SleeperTrader',
      published: 'Nov, 1 2019',
      iconClass: '-trucks-blue',
      body: 'A semi truck aggregation site similar to AccessTrucks specifically for semis with sleepers.'
    }),
    Item({
      href: 'https://machineryaccess.com/',
      title: 'MachineryAccess',
      published: 'Nov, 1 2019',
      iconClass: '-machines-yellow',
      body: 'A heavy machinery aggregation site that also a aggregates machinery auction events.'
    }),

    // div({ class: 'head' }, [
    //   h(h1, 'Old Work'),
    //   // h(h2, 'After leaving the quality of these apps, unfortuantely, degraded significantly.')
    //   h(h2, 'These are sites I started but are now managed by other developers.')
    // ]),

    // Item({
    //   to: '/wiki',
    //   title: 'Wiki Editor (wip)',
    //   iconClass: '-resize',
    //   body: 'A simple dashboard and editor to create wiki-like articles using markdown.'
    // }),

    div({ class: 'head' }, [
      h(h1, 'Apps for Fun')
    ]),
    Item({
      href: 'https://onclick-notes.netlify.app/',
      title: 'Markdown Notes',
      published: 'Jul 18, 2021',
      iconClass: '-notes',
      body: 'A notes app that compiles markdown live!'
    }),
    Item({
      href: 'https://onclick-insights.netlify.app/',
      title: 'Insights for Insta',
      published: 'Jun 7, 2021',
      iconClass: '-insights',
      body: 'Connect your Facebook account to view Instagram analytics for business accounts.'
    }),
    Item({
      href: 'https://thedarktimes.news',
      title: 'The Dark Times',
      published: 'Aug 23, 2023',
      iconClass: '-code-blue',
      body: 'A news aggregator that researches current events and uses generative ai to write articles.'
    }),
    Item({
      href: 'https://pocket.deno.dev',
      title: 'Pocket Website',
      published: 'Jan 22, 2023',
      iconClass: '-code-red',
      body: 'A web component, shadow dom focused, JavaScript framework inspired by Hyperapp.'
    }),
    Item({
      href: 'https://amazon-price-check.netlify.app/',
      title: 'Amazon Price',
      published: 'Aug 25, 2021',
      iconClass: '-code-orange',
      body: 'Check the price of an item on Amazon using the product\'s ASIN.'
    }),
    Item({
      href: 'https://resize-gg.netlify.app/',
      title: 'Resize.gg',
      published: 'Jun 2, 2021',
      iconClass: '-resize',
      body: 'Small utility to cacluate aspect ratio dimensions.'
    }),
    Item({
      href: 'https://currency-challenge.netlify.app/',
      title: 'Currency Challenge',
      published: 'May 4, 2021',
      iconClass: '-code-green',
      body: 'A currency conversion app that uses a public api to get the latest exchange rates.'
    }),
    Item({
      href: 'https://discord-message-queue.netlify.app/',
      title: 'Discord Queue',
      published: 'Dec 28, 2020',
      iconClass: '-discord',
      body: 'Small app to queue messages before sending them to discord.'
    }),

    div({ class: 'head' }, [
      h(h1, 'Misc + Demos')
    ]),
    Item({
      href: 'https://valorant-editor.netlify.app/editor',
      title: 'Valorant Editor',
      published: 'Mar 26, 2021',
      iconClass: '-code-red',
      body: 'A drag and drop editor interface. Made for an old friend for fun.'
    }),
    Item({
      href: 'https://almost-realtime.netlify.com/',
      title: 'Almost Realtime',
      published: 'Jun 1, 2021',
      iconClass: '-message',
      body: 'A chat app using HTTP to send messanges and SSE to sync messages from server to client.'
    }),
    Item({
      href: 'https://creativedevelopers.netlify.app',
      title: 'Creative Developers',
      published: 'Aug 4, 2019',
      iconClass: '-code-blue',
      body: 'A simple landing page for a Discord community.'
    }),
    Item({
      href: 'https://state-sync-demo.netlify.app/',
      title: 'State Sync Demo',
      published: 'Feb 10, 2021',
      iconClass: '-sync',
      body: 'Syncs app state between iframes on a page. Useful for designing responsible mobile layouts.'
    }),
    Item({
      href: 'https://dvd-video.netlify.app/',
      title: 'DVD Video',
      published: 'Feb 1, 2019',
      iconClass: '-code-purple',
      body: 'Nostalgia'
    }),

    div({ class: 'head' }, [
      h(h1, 'Open Source')
    ]),
    Item({
      href: 'https://github.com/whaaaley/material-icons-scss',
      title: 'material-icons-scss',
      iconClass: '-code-purple',
      body: 'A project that compiles all material design icons into SVG data URLs to be used from SCSS functions.'
    }),
    Item({
      href: 'https://github.com/whaaaley/npm-update-force',
      title: 'npm-update-force',
      iconClass: '-code-blue',
      body: 'A small cli utilitiy that will force update all packages in your package.json to the latest version.'
    }),
    Item({
      href: 'https://github.com/whaaaley/parcel-source-map-cli',
      title: 'parcel-source-map-cli',
      iconClass: '-code-orange',
      body: 'A small cli wrapper around parcel-source-map that combines sourcemaps.'
    }),
    Item({
      href: 'https://www.npmjs.com/package/balanced-match',
      title: 'balanced-match',
      iconClass: '-code-red',
      body: 'I wrote the implimentation for regex matches for the popular balanced-match package on npm.'
    }),

    div({ class: 'head' }, [
      h(h1, 'Other')
    ]),
    Item({
      to: '/blog',
      title: 'Dustin\'s Blog (WIP)',
      iconClass: '-blog',
      body: 'You can find all my software rants here. I think I\'m smart sometimes. '
    }),
    Item({
      to: '/resume',
      title: 'Dustin\'s Resume',
      iconClass: '-resume',
      body: 'I\'m a self taught developer and designer. See all of my skills and experience here.'
    }),
    Item({
      to: '/feedback',
      title: 'Feedback',
      iconClass: '-feedback',
      body: 'Send me feedback on how to improve my apps or maybe something cute.'
    })
    // Item({
    //   to: '/counter',
    //   title: 'Counter Demo',
    //   iconClass: '-calculate',
    //   body: 'Demo page showcasing the framework all of my apps are built with.'
    // }),
    // div({ class: '_footer -span' }, [
    //   p([
    //     text('© ' + state.footer.year + ' Dustin Dowell')
    //   ])
    // ])
  ])
}

export default {
  view: main(Apps),
  onroute: () => {}
}
