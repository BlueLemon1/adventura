import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const sourcePath = new URL('../data/sources/srd-5.2.1/classes.en.md', import.meta.url)
const outputPath = new URL('../src/data/class-features-2024.json', import.meta.url)
const source = readFileSync(sourcePath, 'utf8')
const lines = source.split(/\\r?\\n/)

const classIds = {
  Barbarian: 'barbarian',
  Bard: 'bard',
  Cleric: 'cleric',
  Druid: 'druid',
  Fighter: 'fighter',
  Monk: 'monk',
  Paladin: 'paladin',
  Ranger: 'ranger',
  Rogue: 'rogue',
  Sorcerer: 'sorcerer',
  Warlock: 'warlock',
  Wizard: 'wizard',
}
const subclassIds = {
  'barbarian:path of the berserker': 'berserker',
  'bard:college of lore': 'lore',
  'cleric:life domain': 'life',
  'druid:circle of the land': 'land',
  'fighter:champion': 'champion',
  'monk:warrior of the open hand': 'openhand',
  'paladin:oath of devotion': 'devotion',
  'ranger:hunter': 'hunter',
  'rogue:thief': 'thief',
  'sorcerer:draconic sorcery': 'draconic',
  'warlock:fiend patron': 'fiend',
  'wizard:evoker': 'evocation',
}
const slug = (value) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const records = []
let currentClass = ''
let section = ''
let subclass = ''

for (let index = 0; index < lines.length; index += 1) {
  const line = lines[index]
  if (line.startsWith('## ')) {
    currentClass = line.slice(3).trim()
    section = ''
    subclass = ''
    continue
  }
  if (line.startsWith('### ')) {
    const heading = line.slice(4).trim()
    if (heading.endsWith(' Class Features')) {
      section = 'class'
      subclass = ''
    } else {
      const match = heading.match(/^.+ Subclass: (.+)$/)
      if (match) {
        section = 'subclass'
        subclass = match[1].trim()
      } else {
        section = ''
      }
    }
    continue
  }

  const match = line.match(/^#### Level (\\d+): (.+)$/)
  if (!match || !['class', 'subclass'].includes(section)) continue

  const level = Number(match[1])
  const name = match[2].trim()
  let end = index + 1
  while (end < lines.length && !/^#{1,6} /.test(lines[end])) end += 1
  const description = lines.slice(index + 1, end).join('\\n').trim()
  const classId = classIds[currentClass]
  if (!classId || !description) {
    throw new Error(`Invalid source section: ${currentClass} ${name}`)
  }

  const subclassId =
    section === 'subclass'
      ? subclassIds[`${classId}:${subclass.toLowerCase()}`]
      : undefined
  if (section === 'subclass' && !subclassId) {
    throw new Error(`Unmapped subclass: ${currentClass}: ${subclass}`)
  }

  const featureType = section
  records.push({
    id: `srd-2024-${featureType}-${classId}-${subclassId ?? 'core'}-${level}-${slug(name)}`,
    ruleset: '2024',
    contentSourceId: 'srd-5.2.1',
    sourceReference: `classes.md#${slug(currentClass)}-${featureType}-${slug(subclass || 'core')}-level-${level}-${slug(name)}`,
    classId,
    ...(subclassId ? { subclassId } : {}),
    featureType,
    level,
    names: { en: name },
    descriptions: { en: description },
  })
  index = end - 1
}

const ids = new Set()
for (const record of records) {
  if (ids.has(record.id)) throw new Error(`Duplicate feature ID: ${record.id}`)
  ids.add(record.id)
}
if (records.length !== 232) {
  throw new Error(`Expected 232 SRD 5.2.1 class features, found ${records.length}`)
}

writeFileSync(outputPath, `${JSON.stringify(records, null, 2)}\\n`)
console.log(`Imported ${records.length} SRD 5.2.1 class and subclass features.`)
