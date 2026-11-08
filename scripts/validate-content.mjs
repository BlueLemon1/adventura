import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const readJson = (path) => JSON.parse(readFileSync(resolve(path), 'utf8'))
const readText = (path) => readFileSync(resolve(path), 'utf8')
const errors = []

function extractSubclassOptions(source, ruleset, nextRuleset) {
  const start = source.indexOf(`'${ruleset}': {`)
  const endMarker = nextRuleset
    ? `\n  },\n  '${nextRuleset}':`
    : '\n  },\n}'
  const end = source.indexOf(endMarker, start)
  if (start < 0 || end < 0) {
    errors.push(`Could not locate ${ruleset} subclass options in src/domain/classes.ts`)
    return {}
  }

  const block = source.slice(start, end)
  const matches = [...block.matchAll(/^\s{4}([a-z_]+): \[/gm)]
  const result = {}

  for (let index = 0; index < matches.length; index += 1) {
    const classId = matches[index][1]
    const sectionStart = matches[index].index
    const sectionEnd = matches[index + 1]?.index ?? block.length
    const section = block.slice(sectionStart, sectionEnd)
    result[classId] = [...section.matchAll(/\{ value: '([^']+)'/g)].map((match) => match[1])
  }

  return result
}

function validateDataset(records, ruleset, sourceIds, spellIds) {
  const ids = new Set()

  for (const feature of records) {
    const location = `${ruleset}/${feature.id}`

    if (ids.has(feature.id)) errors.push(`${location}: duplicate feature ID`)
    ids.add(feature.id)

    if (feature.ruleset !== ruleset) errors.push(`${location}: wrong ruleset`)
    if (!sourceIds.has(feature.contentSourceId)) errors.push(`${location}: unknown source ${feature.contentSourceId}`)
    const isLegacy2024CompatibilityFeature =
      ruleset === '2024' &&
      feature.id.startsWith('2024-legacy-') &&
      sourceRulesets.get(feature.contentSourceId) === '2014'
    if (
      sourceRulesets.get(feature.contentSourceId) &&
      sourceRulesets.get(feature.contentSourceId) !== ruleset &&
      !isLegacy2024CompatibilityFeature
    ) {
      errors.push(`${location}: source ${feature.contentSourceId} belongs to ${sourceRulesets.get(feature.contentSourceId)}`)
    }
    if (!feature.classId) errors.push(`${location}: missing classId`)
    if (!Number.isInteger(feature.level) || feature.level < 1 || feature.level > 20) {
      errors.push(`${location}: invalid feature level`)
    }
    if (!feature.names?.en?.trim() || !feature.names?.de?.trim()) {
      errors.push(`${location}: missing English or German feature name`)
    }
    if (!feature.descriptions?.en?.trim() || !feature.descriptions?.de?.trim()) {
      errors.push(`${location}: missing English or German description`)
    }
    if (feature.names?.en === feature.descriptions?.en || feature.names?.de === feature.descriptions?.de) {
      errors.push(`${location}: feature name duplicates its description`)
    }
    if (feature.translationStatus?.de !== 'unofficial') {
      errors.push(`${location}: German supplemental text must be labelled unofficial`)
    }
    if (!feature.sourceReference?.trim()) errors.push(`${location}: missing source reference`)

    const granted = feature.grantedSpellIds ?? []
    if (new Set(granted).size !== granted.length) errors.push(`${location}: duplicate granted spell IDs`)
    for (const spellId of granted) {
      if (!spellId.trim()) errors.push(`${location}: empty granted spell ID`)
      if (!spellIds.has(spellId)) errors.push(`${location}: unknown granted spell ID ${spellId}`)
    }
  }
}

const classSource = readText('src/domain/classes.ts')
const sourceSource = readText('src/domain/contentSources.ts')
const sourceIds = new Set([...sourceSource.matchAll(/id: '([^']+)'/g)].map((match) => match[1]))
const sourceRulesets = new Map(
  [...sourceSource.matchAll(/id: '([^']+)'[\s\S]*?ruleset: '(2014|2024)'/g)].map((match) => [match[1], match[2]]),
)
const options = {
  '2014': extractSubclassOptions(classSource, '2014', '2024'),
  '2024': extractSubclassOptions(classSource, '2024'),
}

// Mirror getSubclassOptions(): older official subclasses remain available in
// 2024 unless a 2024 PHB subclass replaces them (including renamed IDs).
const replacedLegacySubclasses = {
  barbarian: ['totemwarrior'],
  monk: ['four_elements'],
  sorcerer: ['aberrantmind'],
  wizard: ['abjuration', 'divination', 'illusion'],
}
for (const [classId, legacyIds] of Object.entries(options['2014'])) {
  const currentIds = options['2024'][classId] ?? []
  const replacedIds = new Set(replacedLegacySubclasses[classId] ?? [])
  const compatibleLegacyIds = legacyIds.filter(
    (id) => !currentIds.includes(id) && !replacedIds.has(id),
  )
  options['2024'][classId] = [...currentIds, ...compatibleLegacyIds]
}

for (const ruleset of ['2014', '2024']) {
  const srd = readJson(`src/data/class-features-${ruleset}.json`)
  const supplemental = readJson(`src/data/class-features-supplemental-${ruleset}.json`)
  const spells = [
    ...readJson(`src/data/spells-${ruleset}.json`),
    ...readJson('src/data/spells-additional.json').filter((spell) =>
      spell.rulesets
        ? spell.rulesets.includes(ruleset)
        : sourceRulesets.get(spell.contentSourceId) === ruleset,
    ),
  ]
  const spellIds = new Set(spells.map((spell) => spell.id))
  const allFeatures = [...srd, ...supplemental]
  const allIds = new Set()

  validateDataset(supplemental, ruleset, sourceIds, spellIds)

  for (const feature of allFeatures) {
    if (allIds.has(feature.id)) errors.push(`${ruleset}/${feature.id}: duplicate ID across SRD and supplemental data`)
    allIds.add(feature.id)
  }

  for (const feature of allFeatures) {
    const selectableSubclasses = options[ruleset][feature.classId]
    if (!selectableSubclasses) errors.push(`${ruleset}/${feature.id}: unknown class ${feature.classId}`)
    if (feature.subclassId && !selectableSubclasses?.includes(feature.subclassId)) {
      errors.push(`${ruleset}/${feature.id}: subclass ${feature.subclassId} is not selectable for ${feature.classId}`)
    }
    if (feature.featureType === 'subclass' && !feature.subclassId) {
      errors.push(`${ruleset}/${feature.id}: subclass feature is missing subclassId`)
    }
  }

  for (const [classId, subclassIds] of Object.entries(options[ruleset])) {
    const classFeatures = allFeatures.filter((feature) => feature.classId === classId)
    if (!classFeatures.some((feature) => feature.featureType === 'class')) {
      errors.push(`${ruleset}/${classId}: no class progression records`)
    }

    for (const subclassId of subclassIds) {
      if (!allFeatures.some((feature) => feature.classId === classId && feature.subclassId === subclassId)) {
        errors.push(`${ruleset}/${classId}/${subclassId}: no subclass feature records`)
      }
    }
  }

  const optionCount = Object.values(options[ruleset]).reduce((sum, ids) => sum + ids.length, 0)
  console.log(
    `${ruleset}: ${optionCount} selectable subclasses, ${supplemental.length} supplemental feature records, ${supplemental.filter((feature) => feature.grantedSpellIds?.length).length} spell-grant features`,
  )
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} issue(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log('Content validation passed.')
}
