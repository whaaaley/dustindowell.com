import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

type PackageJson = {
  name: string
  version: string
  license?: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

const clientDir = process.cwd()
const outputPath = join(clientDir, 'src/features/licenses/third-party.md')

const readPackageJson = (dir: string): PackageJson => {
  return JSON.parse(readFileSync(join(dir, 'package.json'), 'utf-8'))
}

const findLicenseText = (dir: string): string => {
  const names = readdirSync(dir).filter(name => /^(licen[cs]e|copying)/i.test(name))
  const [first] = names

  if (!first) {
    return ''
  }

  return readFileSync(join(dir, first), 'utf-8').trim()
}

const renderPackage = (name: string): string[] => {
  const dir = join(clientDir, 'node_modules', name)

  if (!existsSync(join(dir, 'package.json'))) {
    throw new Error(`Missing installed package for ${name}`)
  }

  const pkg = readPackageJson(dir)
  const licenseText = findLicenseText(dir)
  const lines = [`### ${pkg.name} ${pkg.version}`, '', pkg.license ?? 'License not declared', '']

  if (licenseText) {
    lines.push('```', licenseText, '```', '')
  }

  return lines
}

const root = readPackageJson(clientDir)
const names = Object.keys({ ...root.dependencies, ...root.devDependencies }).sort()
const body = names.flatMap(renderPackage)
const header = ['## LICENSES', '', 'Third-party packages used to build this site, with their license notices.', '']

writeFileSync(outputPath, [...header, ...body].join('\n'))
console.log(`Wrote ${names.length} package notices to ${outputPath}`)
