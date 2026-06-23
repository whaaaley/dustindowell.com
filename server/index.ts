import { serveDir, serveFile } from '@std/http/file-server'

const PORT = parseInt(Deno.env.get('PORT') ?? '8080', 10)
const HOSTNAME = Deno.env.get('HOSTNAME') ?? '::'

Deno.serve({ port: PORT, hostname: HOSTNAME }, async (req) => {
  const response = await serveDir(req, { fsRoot: 'dist', quiet: true })

  if (response.status !== 404) {
    return response
  }

  // dustindowell.com is a single-page app, so all unmatched paths fall back to index.html.
  return serveFile(req, 'dist/index.html')
})
