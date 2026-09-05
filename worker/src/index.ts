type Env = {
  ASSETS: Fetcher
}

// The analytics app lives on Fly behind its public hostname; the site proxies it under /umami so the tracker stays first-party.
const umamiOrigin = 'https://dustindowell-umami.fly.dev'
const umamiPrefix = '/umami/'

const proxyUmami = (request: Request, url: URL): Promise<Response> => {
  const target = new URL(url.pathname.slice(umamiPrefix.length - 1), umamiOrigin)
  target.search = url.search
  return fetch(new Request(target, request))
}

export default {
  fetch: (request, env): Promise<Response> => {
    const url = new URL(request.url)
    if (url.pathname.startsWith(umamiPrefix)) {
      return proxyUmami(request, url)
    }
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
