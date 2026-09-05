import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'

const baseUrl = Deno.env.get('LIGHTHOUSE_BASE_URL') ?? 'http://localhost:8787'
const paths = Deno.args.length > 0 ? Deno.args : ['/', '/work', '/work/compose']
const categories = ['performance', 'accessibility', 'best-practices', 'seo']

const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox'] })

const runPage = async (path: string) => {
  const result = await lighthouse(`${baseUrl}${path}`, {
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
    onlyCategories: categories,
  })
  if (!result) {
    throw new Error(`Lighthouse returned nothing for ${path}`)
  }
  const scores = categories.map((category) => {
    const score = result.lhr.categories[category]?.score
    return `${category} ${score === null || score === undefined ? '-' : Math.round(score * 100)}`
  })
  console.log(`${path.padEnd(16)} ${scores.join('  ')}`)
  return result.lhr
}

let failed = false
try {
  for (const path of paths) {
    const report = await runPage(path)
    const low = categories.filter((category) => (report.categories[category]?.score ?? 1) < 0.9)
    if (low.length > 0) {
      failed = true
      for (const category of low) {
        const audits = Object.values(report.audits).filter((audit) => audit.score !== null && audit.score < 0.9 && report.categories[category]?.auditRefs.some((ref) => ref.id === audit.id))
        for (const audit of audits) {
          console.log(`  ${category}: ${audit.title}`)
        }
      }
    }
  }
} finally {
  await chrome.kill()
}

if (failed) {
  Deno.exit(1)
}
