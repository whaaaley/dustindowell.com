import { serveDir, serveFile } from '@std/http/file-server'

// Serves the vite-ssg build from dist/. vite-ssg uses dirStyle: 'nested', so every route is
// pre-rendered to <route>/index.html and serveDir resolves it directly. Unmatched paths fall
// back to the pre-rendered /not-found/index.html with a real 404 status, so the SPA's catch-all
// NotFound route renders and the client router takes over.

const PORT = parseInt(Deno.env.get('PORT') ?? '8080', 10)
const HOSTNAME = Deno.env.get('HOSTNAME') ?? '::'

Deno.serve({ port: PORT, hostname: HOSTNAME }, async (req) => {
  const response = await serveDir(req, { fsRoot: 'dist', quiet: true })

  if (response.status !== 404) {
    return response
  }

  const notFound = await serveFile(req, 'dist/not-found/index.html')

  return new Response(notFound.body, { status: 404, headers: notFound.headers })
})
