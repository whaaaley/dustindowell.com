import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { safe } from '$common/safe.ts'
import { slugify } from '~/utils/content.utils.ts'

type PackageJson = {
  name: string
  version: string
  license?: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

// Matches a license or copying file name in any case.
const licenseFilePattern = /^(licen[cs]e|copying)/i

const clientDir = process.cwd()
const outputDir = join(clientDir, 'src/features/licenses/notices')

// Deno places the workspace node_modules at the repo root, while a client-local install puts it beside package.json.
const packageRoots = [join(clientDir, 'node_modules'), join(clientDir, '..', 'node_modules')]

const readPackageJson = (dir: string): PackageJson | null => {
  const { data } = safe(() => JSON.parse(readFileSync(join(dir, 'package.json'), 'utf-8')))
  return data
}

const findPackageDir = (name: string): string | null => {
  const dir = packageRoots.map(root => join(root, name)).find(candidate => existsSync(join(candidate, 'package.json')))
  return dir ?? null
}

const findLicenseText = (dir: string): string => {
  const [first] = readdirSync(dir).filter(name => licenseFilePattern.test(name))
  if (!first) {
    return ''
  }
  const { data } = safe(() => readFileSync(join(dir, first), 'utf-8'))
  return data?.trim() ?? ''
}

const renderNotice = (name: string): string | null => {
  const dir = findPackageDir(name)
  if (!dir) {
    return null
  }
  const pkg = readPackageJson(dir)
  if (!pkg) {
    return null
  }
  const licenseText = findLicenseText(dir)
  const lines = [
    '---',
    `name: ${JSON.stringify(pkg.name)}`,
    `version: ${JSON.stringify(pkg.version)}`,
    `license: ${JSON.stringify(pkg.license ?? 'License not declared')}`,
    '---',
    '',
  ]
  if (licenseText) {
    lines.push('```', licenseText, '```', '')
  }
  else {
    lines.push('No license file is shipped with this package.', '')
  }
  return lines.join('\n')
}

const root = readPackageJson(clientDir)
if (!root) {
  console.error(`Could not read ${join(clientDir, 'package.json')}`)
  process.exit(1)
}

const names = Object.keys({ ...root.dependencies, ...root.devDependencies }).sort()
const rendered = names.map(name => [name, renderNotice(name)] as const)
const missing = rendered.filter(([, notice]) => notice === null).map(([name]) => name)
if (missing.length > 0) {
  console.error(`Missing installed packages: ${missing.join(', ')}`)
  process.exit(1)
}

rmSync(outputDir, { recursive: true, force: true })
mkdirSync(outputDir, { recursive: true })
for (const [name, notice] of rendered) {
  writeFileSync(join(outputDir, `${slugify(name)}.md`), notice ?? '')
}
console.log(`Wrote ${names.length} package notices to ${outputDir}`)
