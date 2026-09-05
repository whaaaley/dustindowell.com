import { launch } from 'chrome-launcher'
import lighthouse, { type Result } from 'lighthouse'
import { safeAsync } from '$common/safe.ts'

type Category = 'performance' | 'accessibility' | 'best-practices' | 'seo'

const baseUrl = Deno.env.get('LIGHTHOUSE_BASE_URL') ?? 'http://localhost:8787'
const paths = Deno.args.length > 0 ? Deno.args : ['/', '/work', '/work/compose']
const categories: Category[] = ['performance', 'accessibility', 'best-practices', 'seo']
const passingScore = 0.9

const scoreOf = (report: Result, category: Category): number | null => report.categories[category]?.score ?? null

const formatScore = (score: number | null): string => (score === null ? '-' : String(Math.round(score * 100)))

const failingAudits = (report: Result, category: Category): string[] => {
  const refs = report.categories[category]?.auditRefs ?? []
  return refs
    .map(ref => report.audits[ref.id])
    .filter(audit => audit !== undefined && audit.score !== null && audit.score < passingScore)
    .map(audit => audit.title)
}

const printReport = (path: string, report: Result): boolean => {
  const scores = categories.map(category => `${category} ${formatScore(scoreOf(report, category))}`)
  console.log(`${path.padEnd(16)} ${scores.join('  ')}`)

  const low = categories.filter(category => (scoreOf(report, category) ?? 1) < passingScore)
  for (const category of low) {
    for (const title of failingAudits(report, category)) {
      console.log(`  ${category}: ${title}`)
    }
  }
  return low.length === 0
}

const auditPage = async (port: number, path: string): Promise<Result | null> => {
  const { data, error } = await safeAsync(() => lighthouse(`${baseUrl}${path}`, { port, output: 'json', logLevel: 'error', onlyCategories: categories }))
  if (error || !data) {
    console.log(`${path.padEnd(16)} failed: ${error?.message ?? 'no result'}`)
    return null
  }
  return data.lhr
}

const { data: chrome, error: launchError } = await safeAsync(() => launch({ chromeFlags: ['--headless=new', '--no-sandbox'] }))
if (!chrome) {
  console.error(`Could not launch Chrome: ${launchError.message}`)
  Deno.exit(1)
}

const results = []
for (const path of paths) {
  const report = await auditPage(chrome.port, path)
  results.push(report !== null && printReport(path, report))
}
await chrome.kill()

if (results.some(passed => !passed)) {
  Deno.exit(1)
}
