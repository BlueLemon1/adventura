import { readFileSync, writeFileSync } from 'node:fs'

const source = readFileSync(new URL('../data/sources/srd-5.1/classes/en.md', import.meta.url), 'utf8')
const sections = source.split(/^<!-- CLASS: (.+) -->$/m)
const classes = sections.slice(1).reduce((result, value, index, all) => {
  if (index % 2 === 0) result.push({ name: value.trim(), content: all[index + 1] ?? '' })
  return result
}, [])
const configs = {
  "barbarian": [
    "Path of the Berserker",
    "berserker",
    {
      "Frenzy": 3,
      "Mindless Rage": 6,
      "Intimidating Presence": 10,
      "Retaliation": 14
    }
  ],
  "bard": [
    "College of Lore",
    "lore",
    {
      "Bonus Proficiencies": 3,
      "Cutting Words": 3,
      "Additional Magical Secrets": 6,
      "Peerless Skill": 14
    }
  ],
  "cleric": [
    "Life Domain",
    "life",
    {
      "Life Domain Spells": 1,
      "Bonus Proficiency": 1,
      "Disciple of Life": 1,
      "Channel Divinity: Preserve Life": 2,
      "Blessed Healer": 6,
      "Divine Strike": 8,
      "Supreme Healing": 17
    }
  ],
  "druid": [
    "Circle of the Land",
    "land",
    {
      "Bonus Cantrip": 2,
      "Natural Recovery": 2,
      "Circle Spells": 3,
      "Land's Stride": 6,
      "Nature's Ward": 10,
      "Nature's Sanctuary": 14
    }
  ],
  "fighter": [
    "Champion",
    "champion",
    {
      "Improved Critical": 3,
      "Remarkable Athlete": 7,
      "Additional Fighting Style": 10,
      "Superior Critical": 15,
      "Survivor": 18
    }
  ],
  "monk": [
    "Way of the Open Hand",
    "openhand",
    {
      "Open Hand Technique": 3,
      "Wholeness of Body": 6,
      "Tranquility": 11,
      "Quivering Palm": 17
    }
  ],
  "paladin": [
    "Oath of Devotion",
    "devotion",
    {
      "Oath Spells": 3,
      "Channel Divinity": 3,
      "Aura of Devotion": 7,
      "Purity of Spirit": 15,
      "Holy Nimbus": 20
    }
  ],
  "ranger": [
    "Hunter",
    "hunter",
    {
      "Hunter's Prey": 3,
      "Defensive Tactics": 7,
      "Multiattack": 11,
      "Superior Hunter's Defense": 15
    }
  ],
  "rogue": [
    "Thief",
    "thief",
    {
      "Fast Hands": 3,
      "Second-Story Work": 3,
      "Supreme Sneak": 9,
      "Use Magic Device": 13,
      "Thief's Reflexes": 17
    }
  ],
  "sorcerer": [
    "Draconic Bloodline",
    "draconic",
    {
      "Dragon Ancestor": 1,
      "Draconic Resilience": 1,
      "Elemental Affinity": 6,
      "Dragon Wings": 14,
      "Draconic Presence": 18
    }
  ],
  "warlock": [
    "The Fiend",
    "fiend",
    {
      "Expanded Spell List": 1,
      "Dark One's Blessing": 1,
      "Dark One's Own Luck": 6,
      "Fiendish Resilience": 10,
      "Hurl Through Hell": 14
    }
  ],
  "wizard": [
    "School of Evocation",
    "evocation",
    {
      "Evocation Savant": 2,
      "Sculpt Spells": 2,
      "Potent Cantrip": 6,
      "Empowered Evocation": 10,
      "Overchannel": 14
    }
  ]
}
const normalize = (value) =>
  value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘']/g, '').replace(/\([^)]*\)/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
const slug = (value) => normalize(value).replace(/ /g, '-')
const records = []

for (const { name: className, content } of classes) {
  const classId = className.toLowerCase()
  const lines = content.split(/\r?\n/)
  const levelMap = {}
  const tableIndex = lines.findIndex((line) => line.startsWith('|') && /Level/i.test(line) && /Features/i.test(line))
  if (tableIndex >= 0) {
    const headers = lines[tableIndex].split('|').map((value) => value.trim()).filter(Boolean)
    const featureIndex = headers.findIndex((value) => /^Features$/i.test(value))
    for (let index = tableIndex + 2; index < lines.length && lines[index].startsWith('|'); index += 1) {
      const cells = lines[index].split('|').map((value) => value.trim()).filter(Boolean)
      const match = cells[0]?.match(/^(\d+)(?:st|nd|rd|th)$/)
      if (!match || featureIndex < 0 || !cells[featureIndex]) continue
      for (const name of cells[featureIndex].split(/,\s*/)) {
        const key = normalize(name)
        ;(levelMap[key] ??= []).push(Number(match[1]))
      }
    }
  }
  if (classId === 'wizard') levelMap[normalize('Signature Spells')] = [20]
  if (classId === 'cleric') levelMap[normalize('Divine Intervention')] = [10, 20]

  let section = ''
  let subclassName = ''
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (line.startsWith('## ')) {
      const heading = line.slice(3).trim()
      section = heading === 'The ' + className
        ? 'class'
        : /Paths|Colleges|Domains|Circles|Archetypes|Traditions|Oaths|Origins|Patrons/i.test(heading)
          ? 'subclasses'
          : ''
      subclassName = ''
      continue
    }
    if (line.startsWith('### ') && section === 'class') {
      const name = line.slice(4).trim()
      if (['Hit Points', 'Proficiencies', 'Equipment'].includes(name)) continue
      let end = index + 1
      while (end < lines.length && !/^#{1,3} /.test(lines[end])) end += 1
      const description = lines.slice(index + 1, end).join('\n').trim()
      for (const level of levelMap[normalize(name)] ?? []) records.push({
        id: 'srd-2014-class-' + classId + '-core-' + level + '-' + slug(name),
        ruleset: '2014', contentSourceId: 'srd-5.1',
        sourceReference: 'classes/' + classId + '.md#' + slug(name),
        classId, featureType: 'class', level, names: { en: name }, descriptions: { en: description },
      })
      index = end - 1
      continue
    }
    if (line.startsWith('### ') && section === 'subclasses') {
      subclassName = line.slice(4).trim()
      continue
    }
    if (line.startsWith('#### ') && section === 'subclasses') {
      const name = line.slice(5).trim()
      const config = configs[classId]
      if (!config || config[0].toLowerCase() !== subclassName.toLowerCase() || config[2][name] === undefined) continue
      let end = index + 1
      while (end < lines.length && !/^#{1,4} /.test(lines[end])) end += 1
      const level = config[2][name]
      const description = lines.slice(index + 1, end).join('\n').trim()
      records.push({
        id: 'srd-2014-subclass-' + classId + '-' + config[1] + '-' + level + '-' + slug(name),
        ruleset: '2014', contentSourceId: 'srd-5.1',
        sourceReference: 'classes/' + classId + '.md#' + slug(subclassName) + '-' + slug(name),
        classId, subclassId: config[1], featureType: 'subclass', level,
        names: { en: name }, descriptions: { en: description },
      })
      index = end - 1
    }
  }
}
const ids = new Set()
for (const record of records) {
  if (ids.has(record.id)) throw new Error('Duplicate feature ID: ' + record.id)
  ids.add(record.id)
  if (!record.descriptions.en) throw new Error('Missing description: ' + record.id)
}
if (records.length !== 262) throw new Error('Expected 262 SRD 5.1 features, found ' + records.length)
writeFileSync(new URL('../src/data/class-features-2014.json', import.meta.url), JSON.stringify(records, null, 2) + '\n')
console.log('Imported ' + records.length + ' SRD 5.1 class and subclass features.')
