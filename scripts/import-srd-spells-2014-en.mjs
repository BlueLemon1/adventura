import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = path.join(root, 'data/sources/srd-5.1/spells-higher-level.en.json')
const targetPath = path.join(root, 'src/data/spells-2014.json')
const source = JSON.parse(await readFile(sourcePath, 'utf8'))
const spells = JSON.parse(await readFile(targetPath, 'utf8'))
const spellsById = new Map(spells.map((spell) => [spell.id, spell]))
let imported = 0

for (const spell of source) {
  if (!spell.index || !Array.isArray(spell.higher_level)) {
    throw new Error('Invalid English SRD 5.1 spell source entry.')
  }

  const text = spell.higher_level.filter(Boolean).join('\n\n')
  const sourceId = 'srd-2014-' + spell.index
  const targetId = sourceId === 'srd-2014-hunters-mark' ? 'srd-2014-hunter-s-mark' : sourceId
  const target = spellsById.get(targetId)
  if (!target) throw new Error('Missing Adventura spell: ' + sourceId)
  if (text) {
    target.higherLevel = text
    imported++
  }
}

if (source.length !== 319 || imported !== 90) {
  throw new Error(
    'English SRD 5.1 higher-level import incomplete: ' +
      imported +
      '/90 spells from ' +
      source.length +
      '/319 source entries.',
  )
}

await writeFile(targetPath, JSON.stringify(spells, null, 2) + '\n', 'utf8')
console.log('Imported English higher-level text for ' + imported + ' SRD 5.1 spells into spells-2014.json.')
