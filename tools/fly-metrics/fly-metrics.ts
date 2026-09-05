import { parseArgs } from '@std/cli/parse-args'
import { z } from 'zod'
import { handleCliError, unwrap } from '../utils/cli.utils.ts'
import { CliError } from '../utils/error.utils.ts'
import { safeAsync } from '$common/safe.ts'
import { loadConfigSlice } from '../utils/config.utils.ts'

// Queries Fly's hosted Prometheus for the org, the same store the fly-metrics.net Grafana reads.
// The endpoint is `GET https://api.fly.io/prometheus/<org>/api/v1/query`, authenticated with a Fly token
// passed RAW in the Authorization header (a `Bearer ` prefix returns 401). Named queries cover the
// sizing checks in docs/fly-sizing.md; --query runs any PromQL expression as-is.

const configSchema = z.object({
  org: z.string().default('personal'),
})

const config = await loadConfigSlice({ key: 'fly-metrics', schema: configSchema })
const ORG = config.org
const PROMETHEUS_API = `https://api.fly.io/prometheus/${ORG}/api/v1`

const NAMED_QUERIES: Record<string, string> = {
  // Kernel estimate of memory the app needs after reclaimable cache is subtracted, peak over the window.
  'memory-peak': 'max_over_time((fly_instance_memory_mem_total - fly_instance_memory_mem_available)[WINDOW:])',
  // Memory currently in use by the same measure.
  'memory-used': 'fly_instance_memory_mem_total - fly_instance_memory_mem_available',
  // Machine memory size, so a peak can be read against its ceiling.
  'memory-total': 'fly_instance_memory_mem_total',
  // Fraction of time every process was stalled waiting for memory; anything above zero means the app is starved.
  'memory-pressure': 'max_over_time(fly_instance_memory_pressure_full[WINDOW])',
  'cpu': 'max_over_time(fly_instance_cpu[WINDOW])',
  'up': 'fly_instance_up',
}

// Matches each Fly metric name so an app label can be attached to it.
const metricNamePattern = /(fly_instance_\w+)/g

const resultSchema = z.object({
  status: z.string(),
  data: z.object({
    result: z.array(z.object({
      metric: z.record(z.string(), z.string()),
      value: z.tuple([z.number(), z.string()]),
    })),
  }),
})

const args = parseArgs(Deno.args, {
  string: ['query', 'app', 'window', 'token'],
  boolean: ['help', 'json', 'bytes'],
  alias: { h: 'help', q: 'query', a: 'app', w: 'window' },
  default: { window: '7d' },
})

const printHelp = (): void => {
  const lines = [
    'Usage: fly-metrics <name | --query <promql>> [--app <name>] [--window <range>]',
    '',
    "Queries Fly's hosted Prometheus for the org and prints one line per series: `<app> <value>`.",
    'Memory values print in MB unless --bytes is set.',
    '',
    'Named queries:',
    ...Object.keys(NAMED_QUERIES).map(name => `  ${name}`),
    '',
    'Options:',
    '  --query,  -q <promql>  Run a raw PromQL expression instead of a named query',
    '  --app,    -a <name>    Filter to one Fly app',
    '  --window, -w <range>   Range for max_over_time queries, like 7d, 24h, 30m (default: 7d)',
    '  --json                 Emit the raw result series as JSON',
    '  --bytes                Print memory values in bytes instead of MB',
    '  --token <token>        Fly token to use (prefer FLY_METRICS_TOKEN env; falls back to `flyctl auth token`)',
    '  --help,   -h           Show this help',
    '',
    'Token resolution order: --token, then FLY_METRICS_TOKEN, then `flyctl auth token`. Prefer the env var',
    'so the token is not echoed by `deno task`. A read-only org token is enough:',
    `  flyctl tokens create readonly --org ${ORG} --name fly-metrics --expiry 1h`,
  ]

  console.log(lines.join('\n'))
}

if (args.help) {
  printHelp()
  Deno.exit(0)
}

const resolveToken = async (): Promise<string> => {
  if (args.token) {
    return args.token.trim()
  }

  const fromEnv = Deno.env.get('FLY_METRICS_TOKEN')
  if (fromEnv) {
    return fromEnv.trim()
  }

  const command = new Deno.Command('flyctl', { args: ['auth', 'token'], stdout: 'piped', stderr: 'piped' })
  const output = unwrap(await safeAsync(() => command.output()))

  if (!output.success) {
    throw new CliError('Could not read a Fly token from `flyctl auth token`', ['Run `flyctl auth login` first', 'Or pass a token with --token'])
  }

  const token = new TextDecoder().decode(output.stdout).trim()
  if (!token) {
    throw new CliError('`flyctl auth token` returned an empty token', ['Run `flyctl auth login` first'])
  }

  return token
}

const resolveQuery = (): string => {
  if (args.query) {
    return args.query
  }

  const [name] = args._
  const template = typeof name === 'string' ? NAMED_QUERIES[name] : undefined
  if (!template) {
    throw new CliError('No query given', [`Pass a named query (${Object.keys(NAMED_QUERIES).join(', ')}) or --query <promql>`])
  }

  const query = template.replaceAll('WINDOW', args.window)
  return args.app ? query.replace(metricNamePattern, `$1{app="${args.app}"}`) : query
}

const isMemoryQuery = (query: string): boolean => query.includes('memory_mem') || query.includes('memory_active')

const format = (query: string, value: string): string => {
  const number = Number(value)
  if (!args.bytes && isMemoryQuery(query) && number > 1000) {
    return `${Math.round(number / 1048576)} MB`
  }
  return value
}

const run = async (): Promise<void> => {
  const query = resolveQuery()
  const token = await resolveToken()
  const url = new URL(`${PROMETHEUS_API}/query`)
  url.searchParams.set('query', query)

  const response = unwrap(await safeAsync(() => fetch(url, { headers: { Authorization: token } })))
  if (!response.ok) {
    throw new CliError(`Prometheus returned ${response.status}`, ['A 401 usually means the token is not an org read-only token, or was sent with a Bearer prefix'])
  }

  const body = resultSchema.safeParse(await response.json())
  if (!body.success) {
    throw new CliError('Unexpected Prometheus response shape', ['Run with --json against a simpler query to inspect it'])
  }

  const series = body.data.data.result
  if (args.json) {
    console.log(JSON.stringify(series))
    return
  }

  for (const entry of series) {
    const app = entry.metric.app ?? entry.metric.instance ?? '?'
    console.log(`${app.padEnd(22)} ${format(query, entry.value[1])}`)
  }
}

const result = await safeAsync(run)
if (result.error) {
  handleCliError(result.error)
}
