
import { readFileSync } from 'fs'
import { body, html, link, meta, noscript, script, style, title, div } from './lib/vnodes/html'

const styles = PROD === true
  ? style(readFileSync('./public/main.css', 'utf8'))
  : link({ rel: 'stylesheet', href: '/main.css' })

const scripts = PROD === true
  ? script(readFileSync('./public/app.js', 'utf8'))
  : script({ defer: true, src: '/app.js' })

const PreloadFont = props =>
  link({ rel: 'preload', href: props.href, as: 'font', type: 'font/woff2' })

const render = data => {
  return html({ lang: 'en' }, [
    meta({ charset: 'utf-8' }),
    script('window._ms = Date.now()'),

    title(data.title),
    meta({ name: 'author', content: data.author }),
    meta({ name: 'description', content: data.description }),
    meta({ name: 'viewport', content: data.viewport }),

    link({ rel: 'icon', href: '/cache/favicon.svg' }),

    PreloadFont({ href: '/fonts/Goldbill-XLLight.woff2' }),
    PreloadFont({ href: '/fonts/Goldbill-XSExtraBold.woff2' }),
    PreloadFont({ href: '/fonts/MontExtraLightDEMO.woff2' }),
    PreloadFont({ href: '/fonts/MontHeavyDEMO.woff2' }),
    PreloadFont({ href: '/fonts/Inter-3.18/Inter-roman.var.woff2' }),
    PreloadFont({ href: '/fonts/Inter-3.18/Inter-italic.var.woff2' }),

    styles,
    body([
      noscript('Please enable JavaScript and try again.'),
      div({ id: 'app' }),
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
