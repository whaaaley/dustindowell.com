
import { readFileSync } from 'fs'
import { body, html, link, meta, noscript, script, style, title, main } from './lib/vnodes/html'

const styles = PROD === true
  ? style(readFileSync('./public/main.css', 'utf8'))
  : link({ rel: 'stylesheet', href: '/main.css' })

const scripts = PROD === true
  ? script(readFileSync('./public/app.js', 'utf8'))
  : script({ defer: true, src: '/app.js' })

const render = data => {
  return html({ lang: 'en' }, [
    meta({ charset: 'utf-8' }),
    script('window._ms = Date.now()'),
    title(data.title),
    meta({ name: 'author', content: data.author }),
    meta({ name: 'description', content: data.description }),
    meta({ name: 'viewport', content: data.viewport }),
    link({ rel: 'icon', href: '/cache/favicon.svg' }),
    styles,
    body([
      noscript('Please enable JavaScript and try again.'),
      main({ id: 'app' }),
      scripts
    ])
  ])
}

const options = {
  title: 'Dustin Dowell | Developer + Designer + Artist',
  author: 'Dustin Dowell',
  description: 'My personal website.',
  viewport: 'width=device-width,maximum-scale=5'
}

process.stdout.write('<!DOCTYPE html>' + render(options))
