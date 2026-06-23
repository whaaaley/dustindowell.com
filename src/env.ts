import { createEnvReader } from './utils/env.utils.ts'

export const isProd = import.meta.env.PROD
export const isDev = import.meta.env.DEV

const { getEnv, assertComplete } = createEnvReader(isProd)

export const env = {
  DEV: isDev,
  PROD: isProd,

  GTAG_ID: getEnv('VITE_GTAG_ID', 'G-TFQF6XTQLL'),
  CLIENT_DEMOS_URL: getEnv('VITE_CLIENT_DEMOS_URL', 'https://client-demos.fly.dev'),
} as const

assertComplete()
