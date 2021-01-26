
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

const writeHandler = function (res) {
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

const fileHandler = url => {
  switch (url) {
    case '/':
      return path.join(directory, 'index.html')
    case '/reload.js':
      return path.join(__dirname, '../reload.js')
    default:
      return path.join(directory, url)
  }
}

const handler = function (req, res) {
  const write = writeHandler(res)
  const file = fileHandler(req.url)
  const ext = path.extname(file)

  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('content-type', mime[ext] || 'text/plain')

  write(file)
}

module.exports = { handler }
