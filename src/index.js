
// TODO
// + Inline favicon.svg and manifest.webmanifest as data URLs
// + Optimize gtm.js

import { readFileSync } from 'fs'
import { body, html, link, meta, noscript, script, style, title, div } from './lib/vnodes/html'

const render = data => {
  return html({ lang: 'en' }, [
    script('window._bench = Date.now()'),
    meta({ charset: 'utf-8' }),
    title(data.title),
    meta({ name: 'author', content: data.author }),
    meta({ name: 'description', content: data.description }),
    meta({ name: 'theme-color', content: '#202225' }),
    meta({ name: 'viewport', content: 'width=device-width,maximum-scale=1' }),
    link({ rel: 'icon', href: '/favicon.svg' }),
    link({ rel: 'manifest', href: '/manifest.webmanifest' }),
    data.styles,
    body([
      noscript('Please enable JavaScript and try again.'),
      div({ id: 'app' }),
      data.scripts
    ]),
    script('window._bench = Date.now() - window._bench')
  ])
}

const options = {
  title: 'Dustin Dowell | Personal Website',
  author: 'Dustin Dowell',
  description: 'My personal website.',
  styles: PROD
    ? style(readFileSync('./public/main.min.css', 'utf8'))
    : link({ rel: 'stylesheet', href: '/main.css' }),
  scripts: PROD
    ? [
        script(readFileSync('./public/app.min.js', 'utf8')),
        script({ defer: true, src: '//googletagmanager.com/gtm.js?id=GTM-KW3BBQZ' })
      ]
    : [
        script({ defer: true, src: '/app.js' }),
        script({ defer: true, src: '/reload.js' })
      ]
}

process.stdout.write('<!DOCTYPE html>' + render(options))
