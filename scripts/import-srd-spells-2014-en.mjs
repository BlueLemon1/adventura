import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = path.join(root, 'data/sources/srd-5.1/spells-higher-level.en.json')
const targetPath = path.join(root, 'src/data/spell-higher-level-2014.en.json')
const source = JSON.parse(await readFile(sourcePath, 'utf8'))
const higherLevels = {}

for (const spell of source) {
  if (!spell.index || !Array.isArray(spell.higher_level)) {
    throw new Error('Invalid English SRD 5.1 spell source entry.')
  }

  const text = spell.higher_level.filter(Boolean).join('\n\n')
  if (text) higherLevels['srd-2014-' + spell.index] = text
}

if (source.length !== 319 || Object.keys(higherLevels).length !== 90) {
  throw new Error(
    'English SRD 5.1 higher-level import incomplete: ' +
      Object.keys(higherLevels).length +
      '/90 spells from ' +
      source.length +
      '/319 source entries.',
  )
}

await writeFile(targetPath, JSON.stringify(higherLevels, null, 2) + '\n', 'utf8')
console.log('Imported English higher-level text for ' + Object.keys(higherLevels).length + ' SRD 5.1 spells.')
