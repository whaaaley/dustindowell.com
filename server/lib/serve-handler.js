
const fs = require('fs')
const path = require('path')

const directory = path.join(process.cwd(), 'public')

const mime = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

function writeHandler (res) {
  return function (file) {
    const stream = fs.createReadStream(file)

    stream.on('error', err => {
      console.log(err.message)
      res.writeHead(404)
      res.end()
    })

    res.writeHead(200)
    stream.pipe(res)
  }
}

function fileRewrites (url) {
  switch (url) {
    case '/reload.js':
      return path.join(__dirname, '../reload.js')
    default:
      return path.join(directory, url)
  }
}

function urlHandler (url) {
  const ext = path.extname(url)

  if (ext === '') {
    return {
      file: path.join(directory, 'index.html'),
      ext: '.html'
    }
  }

  return {
    file: fileRewrites(url),
    ext: ext
  }
}

function handler (req, res) {
  const write = writeHandler(res)
  const url = urlHandler(req.url)

  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('content-type', mime[url.ext] || 'text/plain')

  write(url.file)
}

module.exports = { handler }
