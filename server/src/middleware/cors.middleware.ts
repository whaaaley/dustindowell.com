import { getLogger } from '@logtape/logtape'
import { type Context, type Next, Status } from '@oak/oak'
import { env } from '../env.ts'

const log = getLogger(['app', 'middleware', 'cors'])

// Helper function to create origins based on the environment
const createOrigins = (isDevelopment: boolean): string[] => {
  const baseOrigins = [
    'https://dustindowell.com',
    'https://www.dustindowell.com',
  ]

  const devOrigins = [
    'http://asset.localhost',
    'http://localhost:5000',
    'http://localhost:5001',
  ]

  return isDevelopment ? [...baseOrigins, ...devOrigins] : baseOrigins
}

// Helper function to set CORS headers
const setCorsHeaders = (headers: Headers, origin: string) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type, Cache-Control',
    'Access-Control-Expose-Headers': 'Cache-Control',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'true',
  }

  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value)
  })
}

export const corsMiddleware = async (ctx: Context, next: Next) => {
  const { request, response } = ctx
  const requestOrigin = request.headers.get('Origin')

  // Set CORS headers
  if (requestOrigin) {
    const origins = createOrigins(env.ENV === 'development')

    setCorsHeaders(
      response.headers,
      origins.includes(requestOrigin) ? requestOrigin : origins[0],
    )
  }

  // For OPTIONS requests, just return after setting headers
  if (request.method === 'OPTIONS') {
    response.status = Status.OK
  } else {
    // Continue to the next middleware
    await next()
  }
}
