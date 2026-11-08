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

function normalizeContentName(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function spellIdentity(spell) {
  return normalizeContentName(spell.englishName ?? spell.name)
}

function featureIdentity(feature) {
  return [
    feature.classId,
    feature.subclassId ?? '',
    feature.featureType,
    feature.level,
    normalizeContentName(feature.names?.en ?? feature.id),
  ].join('|')
}

function findPriorityCollisions(primary, supplemental, identity) {
  const primaryByKey = new Map(primary.map((record) => [identity(record), record]))
  return supplemental
    .map((record) => ({ record, preferred: primaryByKey.get(identity(record)) }))
    .filter((entry) => entry.preferred)
}

function normalizeSpellName(spell) {
  return (spell.englishName ?? spell.name)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function validateSpellDataset(records, ruleset, sourceIds, sourceRulesets) {
  const ids = new Set()

  for (const spell of records) {
    const location = `${ruleset}/${spell.id || 'missing id'}`

    if (!spell.id?.trim()) errors.push(`${location}: missing spell id`)
    if (ids.has(spell.id)) errors.push(`${location}: duplicate spell id`)
    ids.add(spell.id)

    if (!spell.name?.trim()) errors.push(`${location}: missing English spell name`)
    if (!Number.isInteger(spell.level) || spell.level < 0 || spell.level > 9) {
      errors.push(`${location}: spell level must be an integer from 0 to 9`)
    }
    if (!spell.contentSourceId || !sourceIds.has(spell.contentSourceId)) {
      errors.push(`${location}: unknown or missing source ${spell.contentSourceId ?? '(missing)'}`)
    }

    const declaredRulesets = spell.rulesets
    if (
      declaredRulesets &&
      (!Array.isArray(declaredRulesets) ||
        declaredRulesets.length === 0 ||
        declaredRulesets.some((value) => !['2014', '2024'].includes(value)))
    ) {
      errors.push(`${location}: invalid rulesets declaration`)
    }
    const sourceRuleset = sourceRulesets.get(spell.contentSourceId)
    if (
      sourceRuleset &&
      sourceRuleset !== ruleset &&
      !declaredRulesets?.includes(ruleset)
    ) {
      errors.push(`${location}: source belongs to ${sourceRuleset} but is not explicitly shared with ${ruleset}`)
    }
    if (declaredRulesets && !declaredRulesets.includes(ruleset)) {
      errors.push(`${location}: spell is not declared for ruleset ${ruleset}`)
    }
    if (!spell.localized?.name?.trim() || !spell.localized?.description?.trim()) {
      errors.push(`${location}: missing German spell name or description`)
    }
  }
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
const additionalSpellRecords = readJson('src/data/spells-additional.json')
const spellCompatibilityManifest = readJson('src/data/spell-compatibility-2024.json')
const compatibilityEntries = spellCompatibilityManifest.entries
const compatibilityBySpellId = new Map(
  compatibilityEntries.map((entry) => [entry.spellId, entry]),
)
const additionalSpellsById = new Map(additionalSpellRecords.map((spell) => [spell.id, spell]))
if (compatibilityBySpellId.size !== compatibilityEntries.length) {
  errors.push('2024 spell compatibility manifest contains duplicate spell IDs')
}
for (const spell of additionalSpellRecords) {
  if (!compatibilityBySpellId.has(spell.id)) {
    errors.push(`2024 spell compatibility manifest is missing ${spell.id}`)
  }
}
for (const entry of compatibilityEntries) {
  if (!['legacy', 'shared', 'replaced', 'new'].includes(entry.status)) {
    errors.push(`2024/${entry.spellId}: invalid compatibility status ${entry.status}`)
  }
  if (!additionalSpellsById.has(entry.spellId) && !entry.spellId.startsWith('srd-2014-')) {
    errors.push(`2024/${entry.spellId}: compatibility entry has no source spell`)
  }
}
const phb2024UpdatedSupplementSpellNames = new Set(
  spellCompatibilityManifest.phb2024UpdatedSupplementSpellNames.map(normalizeContentName),
)
if (!spellCompatibilityManifest.sourceUrl?.includes('dndbeyond.com/posts/1810-')) {
  errors.push('2024 spell compatibility manifest must cite the official PHB 2024 update source')
}
for (const spell of additionalSpellRecords) {
  const entry = compatibilityBySpellId.get(spell.id)
  const appearsInPhb2024 = phb2024UpdatedSupplementSpellNames.has(normalizeContentName(spell.englishName ?? spell.name))
  if (sourceRulesets.get(spell.contentSourceId) === '2014' && appearsInPhb2024 && entry?.status !== 'replaced') {
    errors.push(`2024/${spell.id}: PHB 2024 spell must not be classified as Legacy or shared`)
  }
  if (sourceRulesets.get(spell.contentSourceId) === '2014' && entry?.replacementSource === 'phb-2024') {
    if (!appearsInPhb2024 || entry.replacementCategory !== 'new') {
      errors.push(`2024/${spell.id}: invalid PHB 2024 replacement metadata`)
    }
  }
  if (appearsInPhb2024 && entry?.replacementSource !== 'phb-2024') {
    errors.push(`2024/${spell.id}: missing official PHB 2024 replacement source`)
  }
}
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

const renamed2024Subclasses = {
  barbarian: { totemwarrior: 'wildheart' },
  monk: { four_elements: 'elements' },
  sorcerer: { aberrantmind: 'aberrant' },
  wizard: {
    abjuration: 'abjurer',
    divination: 'diviner',
    illusion: 'illusionist',
  },
}
for (const [classId, replacements] of Object.entries(renamed2024Subclasses)) {
  const currentIds = options['2024'][classId] ?? []
  const legacyIds = options['2014'][classId] ?? []
  for (const [legacyId, currentId] of Object.entries(replacements)) {
    if (!currentIds.includes(currentId)) {
      errors.push(`2024/${classId}: missing replacement subclass ${currentId}`)
    }
    if (legacyIds.includes(legacyId) && currentIds.includes(legacyId)) {
      errors.push(`2024/${classId}: replaced legacy subclass ${legacyId} must not be selectable`)
    }
  }
}

const retained2014PhbExceptions = [
  'cleric/knowledge',
  'cleric/nature',
  'cleric/tempest',
  'wizard/conjuration',
  'wizard/enchantment',
  'wizard/necromancy',
  'wizard/transmutation',
]
for (const subclass of retained2014PhbExceptions) {
  const [classId, subclassId] = subclass.split('/')
  if (!(options['2024'][classId] ?? []).includes(subclassId)) {
    errors.push(`2024/${subclass}: expected 2014 PHB exception is not selectable`)
  }
}

for (const ruleset of ['2014', '2024']) {
  const srd = readJson(`src/data/class-features-${ruleset}.json`)
  const supplemental = readJson(`src/data/class-features-supplemental-${ruleset}.json`)
  const srdSpells = readJson(`src/data/spells-${ruleset}.json`)
  const supplementalSpells = readJson('src/data/spells-additional.json').filter((spell) =>
    spell.rulesets
      ? spell.rulesets.includes(ruleset)
      : sourceRulesets.get(spell.contentSourceId) === ruleset,
  )
  const spells = [...srdSpells, ...supplementalSpells]
  validateSpellDataset(spells, ruleset, sourceIds, sourceRulesets)
  const legacySpellIds =
    ruleset === '2024'
      ? compatibilityEntries.filter((entry) => entry.status === 'legacy').map((entry) => entry.spellId)
      : []
  const spellIds = new Set([...spells.map((spell) => spell.id), ...legacySpellIds])
  const allFeatures = [...srd, ...supplemental]
  const allIds = new Set()
  const expectedSrdSource = ruleset === '2014' ? 'srd-5.1' : 'srd-5.2.1'

  for (const spell of srdSpells) {
    if (spell.contentSourceId !== expectedSrdSource) {
      errors.push(`${ruleset}/${spell.id}: SRD spell has unexpected source ${spell.contentSourceId}`)
    }
  }
  for (const feature of srd) {
    if (feature.contentSourceId !== expectedSrdSource) {
      errors.push(`${ruleset}/${feature.id}: SRD feature has unexpected source ${feature.contentSourceId}`)
    }
  }

  const duplicateSpells = findPriorityCollisions(srdSpells, supplementalSpells, spellIdentity)
  const duplicateFeatures = findPriorityCollisions(srd, supplemental, featureIdentity)
  console.log(
    `${ruleset}: SRD priority protects ${duplicateSpells.length} duplicate spells and ${duplicateFeatures.length} duplicate features from supplemental overrides`,
  )

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

const spells2014Srd = readJson('src/data/spells-2014.json')
const spells2024Srd = readJson('src/data/spells-2024.json')
const spells2014 = [
  ...spells2014Srd,
  ...additionalSpellRecords.filter((spell) =>
    spell.rulesets
      ? spell.rulesets.includes('2014')
      : sourceRulesets.get(spell.contentSourceId) === '2014',
  ),
]
const spells2024 = [
  ...spells2024Srd,
  ...additionalSpellRecords.filter((spell) =>
    spell.rulesets
      ? spell.rulesets.includes('2024')
      : sourceRulesets.get(spell.contentSourceId) === '2024',
  ),
]
const legacySpells = additionalSpellRecords.filter(
  (spell) => compatibilityBySpellId.get(spell.id)?.status === 'legacy',
)
const legacyIds = new Set(legacySpells.map((spell) => spell.id))
const legacyNames = new Set(legacySpells.map(normalizeSpellName))
for (const spell of legacySpells) {
  if (sourceRulesets.get(spell.contentSourceId) !== '2014' || spell.rulesets?.includes('2024')) {
    errors.push(`2024/${spell.id}: Legacy spell must be a 2014-only supplement`)
  }
}
for (const spell of spells2024) {
  if (legacyNames.has(normalizeSpellName(spell))) {
    errors.push(`2024/${spell.id}: legacy spell duplicates a current 2024 spell`)
  }
}
for (const entry of compatibilityEntries) {
  const additionalSpell = additionalSpellsById.get(entry.spellId)
  const srdSpell = spells2014Srd.find((spell) => spell.id === entry.spellId)
  if (entry.status === 'shared' && (!additionalSpell || !additionalSpell.rulesets?.includes('2024'))) {
    errors.push(`2024/${entry.spellId}: shared spell must explicitly include ruleset 2024`)
  }
  if (entry.status === 'replaced') {
    if (entry.replacementSpellId && !spells2024.some((spell) => spell.id === entry.replacementSpellId)) {
      errors.push(`2024/${entry.spellId}: unknown replacement spell ${entry.replacementSpellId}`)
    }
    if (!entry.replacementSpellId && (!entry.replacementName || entry.replacementSource !== 'phb-2024')) {
      errors.push(`2024/${entry.spellId}: replacement must identify its 2024 PHB successor`)
    }
    if (!additionalSpell && !srdSpell) {
      errors.push(`2024/${entry.spellId}: replaced spell must exist in the 2014 dataset`)
    }
    if (entry.spellId.startsWith('srd-2014-')) {
      if (entry.replacementSource !== 'phb-2024' || entry.replacementCategory !== 'renamed') {
        errors.push(`2024/${entry.spellId}: renamed SRD replacement must cite the 2024 PHB`)
      }
    }
  }
}
for (const spell of spells2014) {
  const hasSameNameCurrentSpell = spells2024.some(
    (current) => normalizeSpellName(current) === normalizeSpellName(spell),
  )
  const compatibility = compatibilityBySpellId.get(spell.id)
  if (
    !hasSameNameCurrentSpell &&
    !['legacy', 'shared', 'replaced'].includes(compatibility?.status)
  ) {
    errors.push(`2024: missing compatibility decision for 2014 spell ${spell.id}`)
  }
}
console.log(
  `2024: ${legacySpells.length} explicitly reviewed Legacy spells from additional data available`,
)

const incomplete2014Translations = [
  ...readJson('src/data/class-features-2014.json'),
  ...readJson('src/data/class-features-supplemental-2014.json'),
].filter((feature) => !feature.names?.de?.trim() || !feature.descriptions?.de?.trim())
if (incomplete2014Translations.length) {
  console.warn(
    `2014: ${incomplete2014Translations.length} features use English fallback for missing German text`,
  )
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} issue(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log('Content validation passed.')
}
