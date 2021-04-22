
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
      h(h1, data.title),
      h(p, data.body)
    ])
  ])
}

const Apps = (state, dispatch) => {
  return div({ class: 'apps' }, [
    div({ class: 'head' }, [
      h(h1, 'Apps and Demos')
    ]),
    Item({
      href: 'https://onclick-insights.netlify.app/',
      title: 'Insights (Demo)',
      iconClass: '-insights',
      body: 'Connect your Facebook account to view Instagram analytics for business accounts.'
    }),
    Item({
      href: 'https://onclick-notes.netlify.app/',
      title: 'Notes (Demo)',
      iconClass: '-notes',
      body: 'A notes app that compiles markdown live!'
    }),
    Item({
      href: 'https://resize-gg.netlify.app/',
      title: 'Resize.gg',
      iconClass: '-resize',
      body: 'Small utility to cacluate aspect ratio dimensions.'
    }),
    Item({
      href: 'https://discord-message-queue.netlify.app/',
      title: 'Discord Queue',
      iconClass: '-discord',
      body: 'Small app to queue messages before sending them to discord.'
    }),
    Item({
      href: 'https://state-sync-demo.netlify.app/',
      title: 'State Sync Demo',
      iconClass: '-sync',
      body: 'Syncs app state between iframes on a page. Useful for designing responsible mobile layouts.'
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
      h(h1, 'Old Work'),
      h(h2, 'After leaving the quality of these apps, unfortuantely, degraded significantly.')
    ]),
    Item({
      href: 'https://accesstrucks.com/',
      title: 'AccessTrucks',
      iconClass: '-trucks-red',
      body: 'A box truck aggregation site. Potential buyers can browse trucks from dealerships around the country.'
    }),
    Item({
      href: 'https://sleepertrader.com/',
      title: 'SleeperTrader',
      iconClass: '-trucks-blue',
      body: 'A semi truck aggregation site similar to AccessTrucks specifically for semis with sleepers.'
    }),

    Item({
      href: 'https://machineryaccess.com/',
      title: 'MachineryAccess',
      iconClass: '-machines-yellow',
      body: 'A heavy machinery aggregation site that also a aggregates machinery auction events.'
    }),
    // Item({
    //   to: '/wiki',
    //   title: 'Wiki Editor (wip)',
    //   iconClass: '-resize',
    //   body: 'A simple dashboard and editor to create wiki-like articles using markdown.'
    // }),
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
