import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataPath = path.join(root, 'src/data/class-features-2014.json')
const sourcePath = path.join(root, 'data/sources/srd-5.1/classes/de')
const records = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
const features = JSON.parse(fs.readFileSync(path.join(sourcePath, 'features.json'), 'utf8'))
const classes = JSON.parse(fs.readFileSync(path.join(sourcePath, 'classes.json'), 'utf8'))
const index = JSON.parse(fs.readFileSync(path.join(sourcePath, 'feature-index.json'), 'utf8'))
const rageText = fs.readFileSync(path.join(sourcePath, 'rage.md'), 'utf8').trim()
const subclassAliases = { openhand: 'open-hand' }
const nameAliases = { 'Signature Spells': 'Signature Spell' }
const normalize = (value) => String(value ?? '').toLowerCase().replace(/\([^)]*\)/g, '').replace(/[^a-z0-9]+/g, ' ').trim()

let imported = 0
const missing = []
for (const feature of records) {
  if (feature.id === 'srd-2014-class-barbarian-core-1-rage') {
    feature.names.de = 'Kampfrausch'
    feature.descriptions.de = rageText
    imported += 1
    continue
  }
  const subclassId = subclassAliases[feature.subclassId] ?? feature.subclassId
  const source = index.find((item) =>
    item.classId === feature.classId &&
    item.level === feature.level &&
    Boolean(item.subclassId) === (feature.featureType === 'subclass') &&
    (!item.subclassId || item.subclassId === subclassId) &&
    normalize(item.name) === normalize(nameAliases[feature.names.en] ?? feature.names.en),
  )

  if (source) {
    const name = features[source.slug + '.name']
    const description = features[source.slug + '.desc']
    if (name) feature.names.de = name
    if (description) feature.descriptions.de = description
    if (name || description) imported += 1
    if (feature.names.en !== 'Spellcasting' && feature.names.en !== 'Pact Magic') {
      if (!name && !description) missing.push(feature.id)
      continue
    }
  }

  if (feature.names.en === 'Spellcasting' || feature.names.en === 'Pact Magic') {
    const parts = []
    for (let level = 1; level <= 12; level += 1) {
      const name = classes[feature.classId + '.spellcasting.' + level + '.name']
      const description = classes[feature.classId + '.spellcasting.' + level + '.desc']
      if (!name && !description) break
      if (name || description) parts.push((name ? '**' + name + '**\n\n' : '') + (description || ''))
    }
    if (parts.length) {
      feature.names.de = feature.names.en === 'Pact Magic' ? 'Paktmagie' : 'Zauberwirken'
      feature.descriptions.de = parts.join('\n\n')
      imported += 1
      continue
    }
  }

  missing.push(feature.id)
}
fs.writeFileSync(dataPath, JSON.stringify(records, null, 2) + '\n')
console.log('Imported German text for ' + imported + ' of ' + records.length + ' class features. Missing translations: ' + missing.length + '.')
if (missing.length) console.log(missing.join('\n'))
