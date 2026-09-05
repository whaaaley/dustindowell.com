import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { safe } from '$common/safe.ts'

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
const outputPath = join(clientDir, 'src/features/licenses/third-party.md')

const readPackageJson = (dir: string): PackageJson | null => {
  const { data } = safe(() => JSON.parse(readFileSync(join(dir, 'package.json'), 'utf-8')))
  return data
}

const findLicenseText = (dir: string): string => {
  const [first] = readdirSync(dir).filter(name => licenseFilePattern.test(name))
  if (!first) {
    return ''
  }
  const { data } = safe(() => readFileSync(join(dir, first), 'utf-8'))
  return data?.trim() ?? ''
}

const renderPackage = (name: string): string[] | null => {
  const dir = join(clientDir, 'node_modules', name)
  if (!existsSync(join(dir, 'package.json'))) {
    return null
  }
  const pkg = readPackageJson(dir)
  if (!pkg) {
    return null
  }
  const licenseText = findLicenseText(dir)
  const lines = [`### ${pkg.name} ${pkg.version}`, '', pkg.license ?? 'License not declared', '']
  if (licenseText) {
    lines.push('```', licenseText, '```', '')
  }
  return lines
}

const root = readPackageJson(clientDir)
if (!root) {
  console.error(`Could not read ${join(clientDir, 'package.json')}`)
  process.exit(1)
}

const names = Object.keys({ ...root.dependencies, ...root.devDependencies }).sort()
const rendered = names.map(name => [name, renderPackage(name)] as const)
const missing = rendered.filter(([, lines]) => lines === null).map(([name]) => name)
if (missing.length > 0) {
  console.error(`Missing installed packages: ${missing.join(', ')}`)
  process.exit(1)
}

const body = rendered.flatMap(([, lines]) => lines ?? [])
const header = ['## LICENSES', '', 'Third-party packages used to build this site, with their license notices.', '']
writeFileSync(outputPath, [...header, ...body].join('\n'))
console.log(`Wrote ${names.length} package notices to ${outputPath}`)
