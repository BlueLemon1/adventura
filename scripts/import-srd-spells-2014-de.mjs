import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = path.join(root, 'data/sources/srd-5.1/spells.de.json')
const targetPath = path.join(root, 'src/data/spells-2014.json')
const source = JSON.parse(await readFile(sourcePath, 'utf8'))
const spells = JSON.parse(await readFile(targetPath, 'utf8'))
const slugAliases = {
  'arcanist-s-magic-aura': 'arcanists-magic-aura',
  'hunter-s-mark': 'hunters-mark',
}

const prefix = 'srd-2014-'
const missing = []
let importedDescriptions = 0

for (const spell of spells) {
  if (!spell.id.startsWith(prefix)) {
    missing.push(spell.id)
    continue
  }

  const rawSlug = spell.id.slice(prefix.length)
  const slug = slugAliases[rawSlug] ?? rawSlug
  const get = (field) => source[slug + '.' + field]
  const name = get('name')
  const description = get('desc')

  if (!name || !description) {
    missing.push(spell.id + ' (name: ' + Boolean(name) + ', description: ' + Boolean(description) + ')')
    continue
  }

  spell.localized = {
    ...(spell.localized ?? {}),
    name,
    description,
    ...(get('higherLevel') ? { higherLevel: get('higherLevel') } : {}),
    ...(get('castingTime') ? { castingTime: get('castingTime') } : {}),
    ...(get('range') ? { range: get('range') } : {}),
    ...(get('duration') ? { duration: get('duration') } : {}),
  }
  importedDescriptions += 1
}

if (missing.length) {
  throw new Error('German SRD 5.1 spell import incomplete: ' + missing.join(', '))
}

await writeFile(targetPath, JSON.stringify(spells, null, 2) + '\n', 'utf8')
console.log('Imported German descriptions for ' + importedDescriptions + '/' + spells.length + ' SRD 5.1 spells.')
