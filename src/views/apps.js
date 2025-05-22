import { a, div, h1, h2, p, text, img } from '../lib/vnodes/html'
import main from './_main'
import link from '../lib/routerLink'

const h = (tag, data) => tag([text(data)])

// New Featured Project card component
const FeaturedProject = data => {
  const onclick = event => {
    event.preventDefault() // prevent href
    link({ to: data.to })
  }

  return a({ class: 'featured-project', href: data.to, onclick }, [
    div({ class: 'featured-project-image-container' }, [
      img({
        src: data.image,
        alt: data.title,
        class: 'featured-project-image',
        loading: 'lazy'
      })
    ]),
    div({ class: 'featured-project-content' }, [
      h(h2, data.title),
      data.published && div({ class: 'featured-project-date' }, [
        text(data.published)
      ]),
      h(p, data.description)
    ])
  ])
}

const Item = data => {
  const onclick = event => {
    event.preventDefault() // prevent href
    link({ to: data.to })
  }

  const props = typeof data.href === 'string'
    ? { href: data.href, target: '_blank' }
    : { href: data.to, onclick }

  return a({ class: 'work-item', ...props }, [
    div({ class: 'icon ' + data.iconClass }),
    div({ class: 'work-item-body' }, [
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
      h(h1, 'Featured Projects'),
      div({ class: 'featured-projects-heading' }, [
        text('Full-stack applications I\'ve built from concept to production')
      ])
    ]),
    div({ class: 'featured-projects-container' }, [
      div({ class: 'featured-projects-grid' }, [
        FeaturedProject({
          to: '/compose',
          title: 'Compose - A/B Testing Platform',
          published: 'May 2022 - Current',
          image: '/screenshots/compose/33_experiment_report_calendar.png',
          description: 'A/B testing platform with industry-first pay-as-you-go pricing and no contracts. Enables no-code split testing while automatically tracking revenue, engagement, and conversion rates with statistical significance calculations.'
        }),
        FeaturedProject({
          to: '/alqen',
          title: 'Alqen - E-Comm Automation Platform',
          published: 'June 2021 - June 2022',
          image: '/screenshots/alqen/02_statistics_overview.png',
          description: 'E-commerce automation platform for Amazon and Walmart sellers handling inventory management, order fulfillment, and payment processing. Helps sellers find profitable products while reducing manual intervention across multiple channels.'
        }),
        FeaturedProject({
          to: '/access',
          title: 'Access Publishing - Vehicle Marketplaces',
          published: 'Feb 2016 - Nov 2019',
          image: '/screenshots/access/01_accesspublishing_thumbnail.png',
          description: 'Suite of specialized vehicle and equipment marketplaces including AccessTrucks, SleeperTrader, and MachineryAccess. These platforms aggregate inventory from truck and machinery dealers nationwide for potential buyers.'
        })
      ])
    ]),

    div({ class: 'head' }, [
      h(h1, 'Other Professional Work')
    ]),
    // Item({
    //   to: '/compose',
    //   title: 'Compose Platform',
    //   published: 'Aug 23, 2023',
    //   iconClass: '-code-purple',
    //   body: 'The newest solution for conversion rate optimization and A/B testing for Shopify stores.'
    // }),
    Item({
      to: '/compose',
      title: 'Compose Website',
      published: 'Aug 23, 2023',
      iconClass: '-code-purple',
      body: 'Marketing site for the Compose A/B testing platform with product information and pricing.'
    }),
    Item({
      href: 'https://udundi.com/',
      title: 'Udundi',
      published: 'Aug 23, 2023',
      iconClass: '-code-blue',
      body: 'Custom Web Design & Development Agency specializing in Shopify.'
    }),
    // Item({
    //   to: '/alqen',
    //   title: 'Alqen',
    //   published: 'June 1, 2022',
    //   iconClass: '-code-red',
    //   body: 'Alqen provides a suite of tools for Walmart Marketplace sellers.'
    // }),
    // Item({
    //   href: 'https://accesstrucks.com/',
    //   title: 'AccessTrucks',
    //   published: 'Nov 1, 2019',
    //   iconClass: '-trucks-red',
    //   body: 'A box truck aggregation site. Potential buyers can browse trucks from dealerships around the country.'
    // }),
    // Item({
    //   href: 'https://sleepertrader.com/',
    //   title: 'SleeperTrader',
    //   published: 'Nov 1, 2019',
    //   iconClass: '-trucks-blue',
    //   body: 'A semi truck aggregation site similar to AccessTrucks specifically for semis with sleepers.'
    // }),
    // Item({
    //   href: 'https://machineryaccess.com/',
    //   title: 'MachineryAccess',
    //   published: 'Nov 1, 2019',
    //   iconClass: '-machines-yellow',
    //   body: 'A heavy machinery aggregation site that also a aggregates machinery auction events.'
    // }),

    // div({ class: 'head' }, [
    //   h(h1, 'Old Work'),
    //   // h(h2, 'After leaving the quality of these apps, unfortunately, degraded significantly.')
    //   h(h2, 'These are sites I started but are now managed by other developers.')
    // ]),

    // Item({
    //   to: '/wiki',
    //   title: 'Wiki Editor (wip)',
    //   iconClass: '-resize',
    //   body: 'A simple dashboard and editor to create wiki-like articles using markdown.'
    // }),

    div({ class: 'head' }, [
      h(h1, 'In Progress')
    ]),
    Item({
      title: 'Governance',
      iconClass: '-code-blue',
      body: 'A platform for small businesses to manage their agendas, events, voting processes, and documents.'
    }),
    Item({
      title: 'Schema Harbor',
      iconClass: '-code-purple',
      body: 'A tool for converting web pages into structured API endpoints using AI.'
    }),
    Item({
      title: 'Perdition',
      iconClass: '-code-red',
      body: 'A text-based RPG with a dark atmosphere and narrative-driven gameplay.'
    }),
    Item({
      title: 'Reasonable',
      iconClass: '-code-green',
      body: 'A visual interface for building logical reasoning processes using AI.'
    }),
    Item({
      title: 'Paper Prism',
      iconClass: '-code-orange',
      body: 'A writing tool that suggests and validates sources for claims in documents.'
    }),
    Item({
      href: 'https://thedarktimes.news',
      title: 'The Dark Times',
      published: 'Aug 23, 2023',
      iconClass: '-code-blue',
      body: 'A news aggregator that collects current events and presents them in article format.'
    }),

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
      body: 'Small utility to calculate aspect ratio dimensions.'
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
      body: 'A chat app using HTTP to send messages and SSE to sync messages from server to client.'
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
      href: 'https://github.com/whaaaley/cynthia',
      title: 'Cynthia',
      iconClass: '-code-green',
      body: 'A proof of concept code synthesis command line tool that explores automated pattern-based generation.'
    }),
    Item({
      href: 'https://www.npmjs.com/package/balanced-match',
      title: 'balanced-match',
      iconClass: '-code-red',
      body: 'I wrote the implementation for regex matches for the popular balanced-match package on npm.'
    }),
    Item({
      href: 'https://github.com/whaaaley/material-icons-scss',
      title: 'material-icons-scss',
      iconClass: '-code-purple',
      body: 'Material design icon functions for SCSS that output SVG Data URLs optimized with SVGO.'
    }),
    Item({
      href: 'https://github.com/whaaaley/esbuild-plugin-glob-import',
      title: 'esbuild-plugin-glob-import',
      iconClass: '-code-blue',
      body: 'An esbuild plugin that allows using globs to import multiple files.'
    }),
    Item({
      href: 'https://github.com/whaaaley/parcel-source-map-cli',
      title: 'parcel-source-map-cli',
      iconClass: '-code-orange',
      body: 'A CLI wrapper for @parcel/source-map that makes it easier to merge source maps together.'
    }),
    Item({
      href: 'https://github.com/whaaaley/npm-update-force',
      title: 'npm-update-force',
      iconClass: '-code-red',
      body: 'A small cli utility that will force update all packages in your package.json to the latest version.'
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
