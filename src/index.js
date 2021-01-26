
// TODO
// + Inline favicon.svg and manifest.webmanifest as data URLs
// + Optimize gtm.js

import { readFileSync } from 'fs'
import { body, html, link, meta, noscript, script, style, title, div } from './lib/vnodes/html'

const render = data => {
  return html({ lang: 'en' }, [
    meta({ charset: 'utf-8' }),
    script('window._ms = Date.now()'),
    title(data.title),
    meta({ name: 'author', content: data.author }),
    meta({ name: 'description', content: data.description }),
    meta({ name: 'viewport', content: 'width=device-width,maximum-scale=1' }),
    link({ rel: 'icon', href: '/cache/favicon.svg' }),
    data.styles,
    body([
      noscript('Please enable JavaScript and try again.'),
      div({ id: 'app' }),
      data.scripts,
      data.reload
    ])
  ])
}

const options = {
  title: 'Dustin Dowell | Personal Website',
  author: 'Dustin Dowell',
  description: 'My personal website.',
  styles: PROD === true
    ? style(readFileSync('./public/main.min.css', 'utf8'))
    : link({ rel: 'stylesheet', href: '/main.css' }),
  scripts: PROD === true
    ? script(readFileSync('./public/app.min.js', 'utf8'))
    : script({ defer: true, src: '/app.js' }),
  reload: PROD === true
    ? undefined
    : script({ defer: true, src: '/reload.js' })
}

process.stdout.write('<!DOCTYPE html>' + render(options))
