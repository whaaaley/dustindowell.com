
import { readFileSync } from 'fs'
import { html } from '@onclick/superstatic'

const styles = process.env.PROD === true
  ? html.style(readFileSync('./public/main.css', 'utf8'))
  : <link rel='stylesheet' href='/main.css'/>

const scripts = process.env.PROD === true
  ? html.script(readFileSync('./public/app.js', 'utf8'))
  : <script src='/app.js' defer></script>

const PreloadFont = function (props) {
  return html.link({
    rel: 'preload',
    href: props.href,
    as: 'font',
    type: 'font/woff2',
    crossorigin: true // Netlify hosts assets on their CDN
  })
}

const render = function (props) {
  return (
    <html lang='en'>
      <meta charset='utf-8'/>
      {html.script('window._ms = Date.now()')}
      <title>{props.title}</title>
      <meta name='author' content={props.author}/>
      <meta name='description' content={props.description}/>
      <meta name='viewport' content={props.viewport}/>
      <link rel='icon' href='/cache/favicon.svg'/>
      {PreloadFont({ href: '/fonts/Goldbill-XLLight.woff2' })}
      {PreloadFont({ href: '/fonts/Goldbill-XSExtraBold.woff2' })}
      {PreloadFont({ href: '/fonts/MontExtraLightDEMO.woff2' })}
      {PreloadFont({ href: '/fonts/MontHeavyDEMO.woff2' })}
      {PreloadFont({ href: '/fonts/Inter-3.18/Inter-roman.var.woff2' })}
      {PreloadFont({ href: '/fonts/Inter-3.18/Inter-italic.var.woff2' })}
      {[styles]}
      <body>
        <noscript>Please enable JavaScript and try again.</noscript>
        <div id='app'></div>
        {[scripts]}
      </body>
    </html>
  )
}

const options = {
  title: 'Dustin Dowell | Developer + Designer + Artist',
  author: 'Dustin Dowell',
  description: 'My personal website.',
  viewport: 'width=device-width,maximum-scale=5'
}

process.stdout.write('<!DOCTYPE html>' + render(options))
