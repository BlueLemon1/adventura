import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const englishPath = path.join(root, 'data/sources/srd-5.2.1/spells/en.json')
const bilingualPath = path.join(root, 'data/sources/srd-5.2.1/spells/de-en.json')
const targetPath = path.join(root, 'src/data/spells-2024.json')

const english = JSON.parse(await readFile(englishPath, 'utf8'))
const bilingualSource = JSON.parse(await readFile(bilingualPath, 'utf8'))
const bilingual = bilingualSource.spells
const spells = JSON.parse(await readFile(targetPath, 'utf8'))
const spellsById = new Map(spells.map((spell) => [spell.id, spell]))
const bilingualById = new Map(bilingual.map((spell) => [spell.id, spell]))

if (
  english.length !== 339 ||
  bilingualSource.meta?.count !== 339 ||
  bilingual.length !== 339 ||
  spells.length !== 339
) {
  throw new Error('Expected exactly 339 SRD 5.2.1 spells in both sources and the target.')
}

for (const source of english) {
  const id = source.index
  const target = spellsById.get('srd-2024-' + id)
  const localized = bilingualById.get(id)

  if (!target || !localized) {
    throw new Error('Missing SRD 5.2.1 spell mapping: ' + id)
  }
  if (localized.source !== 'SRD 5.2.1' || localized.custom) {
    throw new Error('Non-SRD spell found in bilingual source: ' + id)
  }
  if (!localized.name?.de || !localized.description?.de) {
    throw new Error('Missing German spell name or description: ' + id)
  }

  target.name = source.name
  target.level = source.level
  target.school = source.school?.name ?? target.school
  target.castingTime = source.casting_time
  target.range = source.range
  target.components = (source.components ?? []).join(', ')
  target.material = source.material ?? ''
  target.duration = source.duration
  target.concentration = Boolean(source.concentration)
  target.ritual = Boolean(source.ritual)
  target.classes = (source.classes ?? []).map((entry) => entry.index)
  target.description = source.description

  const higherLevel = source.higher_level?.trim()
  if (higherLevel) target.higherLevel = higherLevel
  else delete target.higherLevel

  target.localized = {
    ...(target.localized ?? {}),
    name: localized.name.de,
    school: localized.school?.de ?? target.localized?.school,
    castingTime: localized.castingTime?.de ?? target.localized?.castingTime,
    range: localized.range?.de ?? target.localized?.range,
    components: localized.components?.de ?? target.localized?.components,
    duration: localized.duration?.de ?? target.localized?.duration,
    description: localized.description.de,
  }

  const germanHigherLevel = localized.higherLevels?.de?.trim()
  if (germanHigherLevel) target.localized.higherLevel = germanHigherLevel
  else delete target.localized.higherLevel
}

await writeFile(targetPath, JSON.stringify(spells, null, 2) + '\n', 'utf8')
console.log('Imported English and German SRD 5.2.1 fields for ' + spells.length + ' spells.')
