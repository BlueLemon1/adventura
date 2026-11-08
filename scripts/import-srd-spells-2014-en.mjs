import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = path.join(root, 'data/sources/srd-5.1/spells/en.json')
const targetPath = path.join(root, 'src/data/spells-2014.json')
const source = JSON.parse(await readFile(sourcePath, 'utf8'))
const spells = JSON.parse(await readFile(targetPath, 'utf8'))
const spellsById = new Map(spells.map((spell) => [spell.id, spell]))

for (const spell of source) {
  if (!spell.index || !Array.isArray(spell.desc) || (spell.higher_level !== undefined && !Array.isArray(spell.higher_level))) {
    throw new Error('Invalid English SRD 5.1 spell source entry.')
  }

  const sourceId = 'srd-2014-' + spell.index
  const targetId =
    sourceId === 'srd-2014-hunters-mark'\n      ? 'srd-2014-hunter-s-mark'\n      : sourceId === 'srd-2014-arcanists-magic-aura'\n        ? 'srd-2014-arcanist-s-magic-aura'\n        : sourceId
  const target = spellsById.get(targetId)
  if (!target) throw new Error('Missing Adventura spell: ' + sourceId)

  target.name = spell.name
  target.level = spell.level
  target.school = spell.school?.name ?? target.school
  target.castingTime = spell.casting_time
  target.range = spell.range
  target.components = (spell.components ?? []).join(', ')
  target.material = spell.material ?? ''
  target.duration = spell.duration
  target.concentration = Boolean(spell.concentration)
  target.ritual = Boolean(spell.ritual)
  target.classes = (spell.classes ?? []).map((entry) => entry.index)
  target.description = spell.desc.filter(Boolean).join('\n\n')

  const higherLevel = (spell.higher_level ?? []).filter(Boolean).join('\n\n')
  if (higherLevel) target.higherLevel = higherLevel
  else delete target.higherLevel
}

if (source.length !== 319 || spells.length !== 319) {
  throw new Error(
    'English SRD 5.1 spell import incomplete: ' +
      source.length +
      ' source entries, ' +
      spells.length +
      ' Adventura records.',
  )
}

await writeFile(targetPath, JSON.stringify(spells, null, 2) + '\n', 'utf8')
console.log('Imported English SRD 5.1 fields for ' + spells.length + ' spells.')
