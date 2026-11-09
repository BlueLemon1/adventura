import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const readJson = (path) => JSON.parse(readFileSync(resolve(path), 'utf8'))
const readText = (path) => readFileSync(resolve(path), 'utf8')
const errors = []

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
    if (declaredRulesets && (typeof declaredRulesets !== 'object' || Array.isArray(declaredRulesets))) {
      errors.push(`${location}: invalid rulesets declaration`)
    }
    const sourceRuleset = sourceRulesets.get(spell.contentSourceId)
    if (
      sourceRuleset &&
      sourceRuleset !== ruleset &&
      !declaredRulesets?.[ruleset]
    ) {
      errors.push(`${location}: source belongs to ${sourceRuleset} but is not explicitly shared with ${ruleset}`)
    }
    if (declaredRulesets && !declaredRulesets[ruleset]) {
      errors.push(`${location}: spell is not declared for ruleset ${ruleset}`)
    }
  }
}

function validateDataset(records, ruleset, sourceIds, spellIds) {
  const ids = new Set()

  for (const feature of records) {
    const location = `${ruleset}/${feature.id}`

    if (!feature.id?.trim()) errors.push(`${location}: missing feature id`)
    if (ids.has(feature.id)) errors.push(`${location}: duplicate feature ID`)
    ids.add(feature.id)

    if (feature.rulesets?.[ruleset] !== true && feature.rulesets?.[ruleset] !== 'legacy') {
      errors.push(`${location}: feature is not explicitly available for ${ruleset}`)
    }
    if (!sourceIds.has(feature.contentSourceId)) errors.push(`${location}: unknown source ${feature.contentSourceId}`)
    const sourceRuleset = sourceRulesets.get(feature.contentSourceId)
    if (sourceRuleset && sourceRuleset !== ruleset && !feature.rulesets?.[ruleset]) {
      errors.push(`${location}: source ${feature.contentSourceId} belongs to ${sourceRuleset}`)
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

const sourceSource = readText('src/domain/contentSources.ts')
const sourceIds = new Set([...sourceSource.matchAll(/id: '([^']+)'/g)].map((match) => match[1]))
const sourceRulesets = new Map(
  [...sourceSource.matchAll(/id: '([^']+)'[\\s\\S]*?ruleset: '(2014|2024)'/g)].map((match) => [match[1], match[2]]),
)
const additionalSpellRecords = readJson('src/data/spells/spells-additional.json')
const srdSpellRecords = [readJson('src/data/srd/2014/spells.json'), readJson('src/data/srd/2024/spells.json')].flat()
const spellMechanics = readJson('src/data/spells/spell-mechanics.json')
const spellAvailability = readJson('src/data/spells/spell-availability.json')
const additionalSpellIds = new Set(additionalSpellRecords.map((spell) => spell.id))
const knownSpellIds = new Set([...additionalSpellRecords, ...srdSpellRecords].map((spell) => spell.id))
for (const [spellId, mechanics] of Object.entries(spellMechanics)) {
  if (!knownSpellIds.has(spellId)) errors.push(`spell-mechanics/${spellId}: unknown spell ID`)
  if (!Array.isArray(mechanics) || mechanics.some((entry) =>
    !entry.dice || !Number.isFinite(entry.average) ||
    (entry.scaling && (!Array.isArray(entry.scaling) || entry.scaling.some((scale) =>
      !['spell-slot', 'character-level', 'turn'].includes(scale.kind) ||
      (scale.mode && !['add-dice', 'add-instance', 'set-dice'].includes(scale.mode)) ||
      (scale.kind === 'spell-slot' && (!Number.isInteger(scale.baseLevel) || !Number.isInteger(scale.interval) || !scale.dice)) ||
      (scale.kind === 'character-level' && (!Array.isArray(scale.thresholds) || scale.thresholds.some((threshold) =>
        !Number.isInteger(threshold.level) || !threshold.dice,
      ))),
    ))) ||
    (entry.modifier && !['extra', 'reduced', 'damage-penalty', 'damage-reduction', 'weapon-die'].includes(entry.modifier)) ||
    (entry.typeOptions && (!Array.isArray(entry.typeOptions) || entry.typeOptions.some((type) => typeof type !== 'string' || type !== type.toLowerCase()))) ||
    (entry.activeFromLevel && (!Number.isInteger(entry.activeFromLevel) || entry.activeFromLevel < 1 || entry.activeFromLevel > 20)) ||
    (entry.flatBonus && typeof entry.flatBonus === 'object' && (!Number.isFinite(entry.flatBonus.base ?? 0) || (entry.flatBonus.spellcastingAbility !== undefined && typeof entry.flatBonus.spellcastingAbility !== 'boolean') || (entry.flatBonus.spellSlotLevel !== undefined && typeof entry.flatBonus.spellSlotLevel !== 'boolean'))) ||
    (entry.diceRules && (!Number.isInteger(entry.diceRules.explodeOn) || entry.diceRules.maxAdditionalDice !== 'spellcasting-ability'))
  )) {
    errors.push(`spell-mechanics/${spellId}: invalid damage metadata`)
  }
}
for (const [spellId, metadata] of Object.entries(spellAvailability)) {
  if (!additionalSpellIds.has(spellId)) errors.push(`spell-availability/${spellId}: unknown spell ID`)
  if (metadata.rulesetClasses && Object.keys(metadata.rulesetClasses).some((ruleset) => !['2014', '2024'].includes(ruleset))) {
    errors.push(`spell-availability/${spellId}: unknown ruleset in class restrictions`)
  }
}
for (const spell of additionalSpellRecords) {
  if ('damage' in spell || 'rulesetClasses' in spell || 'subclassRestriction' in spell || 'availabilityNote' in spell) {
    errors.push(`spells/${spell.id}: app-specific metadata must live in ID-keyed metadata files`)
  }
  if (spell.localized && 'classes' in spell.localized) {
    errors.push(`spells/${spell.id}: localized.classes duplicates the canonical class list`)
  }
}
const additionalSpellsById = new Map(additionalSpellRecords.map((spell) => [spell.id, spell]))
for (const spell of additionalSpellRecords) {
  if (!spell.rulesets || typeof spell.rulesets !== 'object' || Array.isArray(spell.rulesets)) {
    errors.push(`2024/${spell.id}: rulesets must be an object keyed by ruleset`)
    continue
  }
  for (const [ruleset, availability] of Object.entries(spell.rulesets)) {
    if (!['2014', '2024'].includes(ruleset)) errors.push(`2024/${spell.id}: unknown ruleset ${ruleset}`)
    if (availability !== true && availability !== 'legacy' && typeof availability !== 'string') {
      errors.push(`2024/${spell.id}: invalid availability value for ${ruleset}`)
    }
    if (availability === 'legacy' && ruleset !== '2024') errors.push(`2024/${spell.id}: Legacy availability is only valid for 2024`)
    if (typeof availability === 'string' && availability !== 'legacy' && ruleset !== '2024') {
      errors.push(`2024/${spell.id}: replacement IDs are only valid for 2024`)
    }
  }
  if (!spell.rulesets['2014'] && sourceRulesets.get(spell.contentSourceId) === '2014') {
    errors.push(`2024/${spell.id}: 2014 source spell must remain available in 2014`)
  }
  if (spell.rulesets['2024'] === 'legacy' && spell.rulesets['2014'] !== true) {
    errors.push(`2024/${spell.id}: Legacy spell must also be available in 2014`)
  }
}

const additionalClassRecords = readJson('src/data/classes/catalog.json')
const additionalFeatureDefinitions = readJson('src/data/classes/features.json')
const classProgressions = readJson('src/data/classes/progressions.json')
const featureDefinitionsById = new Map(additionalFeatureDefinitions.map((feature) => [feature.id, feature]))
const additionalClassFeatures = classProgressions.flatMap((progression) => {
  const feature = featureDefinitionsById.get(progression.featureId)
  if (!feature) return []
  return ['2014', '2024'].flatMap((ruleset) => {
    const availability = progression.rulesets?.[ruleset]
    if (availability !== true && availability !== 'legacy') return []
    return [{
      ...feature,
      id: progression.progressionId ?? progression.featureId,
      definitionId: progression.featureId,
      ...(progression.names ? { names: { ...feature.names, ...progression.names } } : {}),
      ...(progression.contentSourceId ? { contentSourceId: progression.contentSourceId } : {}),
      ...(progression.sourceReference ? { sourceReference: progression.sourceReference } : {}),
      classId: progression.classId,
      ...(progression.subclassId ? { subclassId: progression.subclassId } : {}),
      featureType: progression.subclassId ? 'subclass' : 'class',
      level: progression.levels?.[ruleset],
      grantedSpellIds: progression.grantedSpellIds?.[ruleset],
      rulesets: { [ruleset]: availability },
    }]
  })
})
const classIds = new Set([
  'barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk',
  'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard',
])
const classCatalogIds = new Set()
for (const record of additionalClassRecords) {
  const location = `classes/${record.id}`
  if (!record.id?.trim() || classCatalogIds.has(record.id)) errors.push(`${location}: missing or duplicate id`)
  classCatalogIds.add(record.id)
  if (!['class', 'subclass'].includes(record.type)) errors.push(`${location}: invalid record type`)
  if (!record.classId?.trim()) errors.push(`${location}: missing classId`)
  if (record.type === 'subclass' && !record.subclassId?.trim()) errors.push(`${location}: missing subclassId`)
  if (record.type === 'class') classIds.add(record.classId)
  if (!record.rulesets || typeof record.rulesets !== 'object' || Array.isArray(record.rulesets)) {
    errors.push(`${location}: rulesets must be an object`)
    continue
  }
  for (const [ruleset, availability] of Object.entries(record.rulesets)) {
    if (!['2014', '2024'].includes(ruleset)) errors.push(`${location}: unknown ruleset ${ruleset}`)
    if (availability !== true && availability !== 'legacy' && typeof availability !== 'string') {
      errors.push(`${location}: invalid availability value for ${ruleset}`)
    }
    if (availability === 'legacy' && ruleset !== '2024') errors.push(`${location}: Legacy availability is only valid for 2024`)
    if (typeof availability === 'string' && availability !== 'legacy' && ruleset !== '2024') {
      errors.push(`${location}: replacement IDs are only valid for 2024`)
    }
  }
}
for (const record of additionalClassRecords.filter((item) => item.type === 'subclass')) {
  const replacement = record.rulesets?.['2024']
  if (typeof replacement === 'string' && replacement !== 'legacy') {
    const target = additionalClassRecords.find(
      (candidate) => candidate.type === 'subclass' && candidate.classId === record.classId &&
        candidate.subclassId === replacement && candidate.rulesets?.['2024'] === true,
    )
    if (!target) errors.push(`2024/${record.classId}/${record.subclassId}: unknown replacement subclass ${replacement}`)
  }
}
const definitionIds = new Set()
for (const definition of additionalFeatureDefinitions) {
  if (!definition.id?.trim() || definitionIds.has(definition.id)) errors.push(`features/${definition.id}: missing or duplicate definition id`)
  definitionIds.add(definition.id)
  if (!definition.contentSourceId || !sourceIds.has(definition.contentSourceId)) errors.push(`features/${definition.id}: unknown source ${definition.contentSourceId ?? '(missing)'}`)
  if (!definition.names?.en?.trim() || !definition.descriptions?.en?.trim()) errors.push(`features/${definition.id}: missing English name or description`)
  if (!Array.isArray(definition.sources) || definition.sources.length === 0) errors.push(`features/${definition.id}: missing source references`)
  for (const source of definition.sources ?? []) {
    if (!source.contentSourceId || !sourceIds.has(source.contentSourceId)) errors.push(`features/${definition.id}: unknown source reference ${source.contentSourceId ?? '(missing)'}`)
    if (!source.sourceReference?.trim()) errors.push(`features/${definition.id}: missing source reference path`)
  }
  if (!definition.sources?.some((source) => source.contentSourceId === definition.contentSourceId && source.sourceReference === definition.sourceReference)) {
    errors.push(`features/${definition.id}: primary source is missing from sources`)
  }
}
const progressionIds = new Set()
const usedFeatureIds = new Set()
for (const progression of classProgressions) {
  const location = `progressions/${progression.progressionId ?? progression.featureId}`
  if (!definitionIds.has(progression.featureId)) errors.push(`${location}: unknown feature definition`)
  const progressionId = progression.progressionId ?? progression.featureId
  if (!progressionId?.trim()) errors.push(`${location}: missing progression ID`)
  if (progressionIds.has(progressionId)) errors.push(`${location}: duplicate progression ID`)
  progressionIds.add(progressionId)
  usedFeatureIds.add(progression.featureId)
  if (progression.contentSourceId && !sourceIds.has(progression.contentSourceId)) errors.push(`${location}: unknown progression source ${progression.contentSourceId}`)
  if (progression.names && Object.values(progression.names).some((name) => !name?.trim())) errors.push(`${location}: display-name overrides must be non-empty`)
  const definition = featureDefinitionsById.get(progression.featureId)
  if (progression.contentSourceId && !definition?.sources?.some((source) => source.contentSourceId === progression.contentSourceId && source.sourceReference === progression.sourceReference)) {
    errors.push(`${location}: progression source reference is not recorded on its definition`)
  }
  if (progression.contentSourceId && sourceRulesets.get(progression.contentSourceId) && !progression.rulesets?.[sourceRulesets.get(progression.contentSourceId)]) errors.push(`${location}: source ${progression.contentSourceId} is not explicitly available for the progression ruleset`)
  if (!classIds.has(progression.classId)) errors.push(`${location}: unknown class ${progression.classId}`)
  if (progression.subclassId && !additionalClassRecords.some((record) => record.type === 'subclass' && record.classId === progression.classId && record.subclassId === progression.subclassId)) {
    errors.push(`${location}: unknown subclass ${progression.subclassId}`)
  }
  if (!progression.rulesets || !progression.levels) errors.push(`${location}: missing rulesets or levels`)
  for (const [ruleset, availability] of Object.entries(progression.rulesets ?? {})) {
    if (!['2014', '2024'].includes(ruleset)) errors.push(`${location}: unknown ruleset ${ruleset}`)
    if (availability !== true && typeof availability !== 'string') errors.push(`${location}: invalid availability for ${ruleset}`)
    if (availability === 'legacy') errors.push(`${location}: Legacy availability belongs on the parent class/subclass, not on a feature progression`)
    if (typeof availability === 'string' && availability !== 'legacy' && !definitionIds.has(availability)) {
      errors.push(`${location}: unknown replacement feature ${availability}`)
    }
    if (availability === true && !Number.isInteger(progression.levels?.[ruleset])) {
      errors.push(`${location}: missing integer level for ${ruleset}`)
    }
  }
  for (const [ruleset, level] of Object.entries(progression.levels ?? {})) {
    if (!Number.isInteger(level) || level < 1 || level > 20) errors.push(`${location}: invalid ${ruleset} level`)
    if (progression.rulesets?.[ruleset] !== true) errors.push(`${location}: level declared without an active feature assignment for ${ruleset}`)
  }
}
for (const definition of additionalFeatureDefinitions) {
  if (!usedFeatureIds.has(definition.id)) errors.push(`features/${definition.id}: missing progression record`)
}

const options = Object.fromEntries(['2014', '2024'].map((ruleset) => {
  const byClass = {}
  for (const record of additionalClassRecords) {
    if (record.type !== 'subclass') continue
    const availability = record.rulesets?.[ruleset]
    if (availability !== true && availability !== 'legacy') continue
    if (!byClass[record.classId]) byClass[record.classId] = []
    byClass[record.classId].push(record.subclassId)
  }
  return [ruleset, byClass]
}))

for (const ruleset of ['2014', '2024']) {
  const srd = readJson(`src/data/srd/${ruleset}/class-features.json`)
  const srdSpells = readJson(`src/data/srd/${ruleset}/spells.json`)
  const srdSpellTranslations = readJson(`src/data/srd/${ruleset}/locales/de/spells.json`)
  const srdFeatureTranslations = readJson(`src/data/srd/${ruleset}/locales/de/class-features.json`)
  const supplemental = additionalClassFeatures.filter((feature) =>
    feature.rulesets?.[ruleset] === true || feature.rulesets?.[ruleset] === 'legacy',
  )
  const supplementalSpells = additionalSpellRecords.filter((spell) =>
    spell.rulesets
      ? spell.rulesets[ruleset] === true || spell.rulesets[ruleset] === 'legacy'
      : sourceRulesets.get(spell.contentSourceId) === ruleset,
  )
  const spells = [...srdSpells, ...supplementalSpells]
  validateSpellDataset(spells, ruleset, sourceIds, sourceRulesets)
  const legacySpellIds = ruleset === '2024'
    ? additionalSpellRecords.filter((spell) => spell.rulesets?.['2024'] === 'legacy').map((spell) => spell.id)
    : []
  const spellIds = new Set([...spells.map((spell) => spell.id), ...legacySpellIds])
  const allFeatures = [...srd, ...supplemental]
  const allIds = new Set()
  const expectedSrdSource = ruleset === '2014' ? 'srd-5.1' : 'srd-5.2.1'

  for (const spell of srdSpells) {
    if (spell.contentSourceId !== expectedSrdSource) errors.push(`${ruleset}/${spell.id}: SRD spell has unexpected source ${spell.contentSourceId}`)
  }
  for (const feature of srd) {
    if (feature.contentSourceId !== expectedSrdSource) errors.push(`${ruleset}/${feature.id}: SRD feature has unexpected source ${feature.contentSourceId}`)
  }

  const validateLocaleReferences = (records, translations, kind) => {
    const sourceIds = new Set(records.map((record) => record.id))
    for (const [id, text] of Object.entries(translations)) {
      if (!sourceIds.has(id)) errors.push(`${ruleset}/locales/de/${kind}/${id}: translation references unknown SRD ID`)
      if (!text || typeof text !== 'object' || Array.isArray(text)) {
        errors.push(`${ruleset}/locales/de/${kind}/${id}: translation must be an object`)
      }
    }
  }
  validateLocaleReferences(srdSpells, srdSpellTranslations, 'spells')
  validateLocaleReferences(srd, srdFeatureTranslations, 'class-features')
  for (const spell of srdSpells) {
    const translation = srdSpellTranslations[spell.id]
    if (!translation?.name?.trim() || !translation?.description?.trim()) {
      errors.push(`${ruleset}/locales/de/spells/${spell.id}: missing official German name or description`)
    }
    if (translation && Object.keys(translation).some((key) => ![
      'name', 'school', 'castingTime', 'range', 'components', 'duration', 'description',
      'higherLevel', 'higherLevelLabel',
    ].includes(key))) {
      errors.push(`${ruleset}/locales/de/spells/${spell.id}: unknown localized spell field`)
    }
    if ('localized' in spell) errors.push(`${ruleset}/${spell.id}: locale data must live outside the SRD source record`)
  }
  for (const feature of srd) {
    if (Object.keys(feature.names ?? {}).some((locale) => locale !== 'en') ||
        Object.keys(feature.descriptions ?? {}).some((locale) => locale !== 'en')) {
      errors.push(`${ruleset}/${feature.id}: SRD source feature records must contain English text only`)
    }
    const translation = srdFeatureTranslations[feature.id]
    if (translation && Object.keys(translation).some((key) => !['name', 'description'].includes(key))) {
      errors.push(`${ruleset}/locales/de/class-features/${feature.id}: unknown localized feature field`)
    }
  }

  const duplicateSpells = findPriorityCollisions(srdSpells, supplementalSpells, spellIdentity)
  const duplicateFeatures = findPriorityCollisions(srd, supplemental, featureIdentity)
  console.log(`${ruleset}: SRD priority protects ${duplicateSpells.length} duplicate spells and ${duplicateFeatures.length} duplicate features from supplemental overrides`)

  validateDataset(supplemental, ruleset, sourceIds, spellIds)
  for (const feature of allFeatures) {
    if (allIds.has(feature.id)) errors.push(`${ruleset}/${feature.id}: duplicate ID across SRD and supplemental data`)
    allIds.add(feature.id)
  }

  for (const feature of allFeatures) {
    if (!classIds.has(feature.classId)) errors.push(`${ruleset}/${feature.id}: unknown class ${feature.classId}`)
    const selectableSubclasses = options[ruleset][feature.classId]
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
  console.log(`${ruleset}: ${optionCount} selectable subclasses, ${supplemental.length} supplemental feature records, ${supplemental.filter((feature) => feature.grantedSpellIds?.length).length} spell-grant features`)
}

const spells2014Srd = readJson('src/data/srd/2014/spells.json')
const spells2024Srd = readJson('src/data/srd/2024/spells.json')
const spells2014 = [
  ...spells2014Srd,
  ...additionalSpellRecords.filter((spell) =>
    spell.rulesets
      ? spell.rulesets['2014'] === true
      : sourceRulesets.get(spell.contentSourceId) === '2014',
  ),
]
const spells2024 = [
  ...spells2024Srd,
  ...additionalSpellRecords.filter((spell) =>
    spell.rulesets
      ? spell.rulesets['2024'] === true
      : sourceRulesets.get(spell.contentSourceId) === '2024',
  ),
]
const legacySpells = additionalSpellRecords.filter(
  (spell) => spell.rulesets?.['2024'] === 'legacy',
)
const legacyNames = new Set(legacySpells.map(normalizeSpellName))
for (const spell of spells2024) {
  if (legacyNames.has(normalizeSpellName(spell))) {
    errors.push(`2024/${spell.id}: legacy spell duplicates a current 2024 spell`)
  }
}
for (const spell of additionalSpellRecords) {
  const replacement = spell.rulesets?.['2024']
  if (typeof replacement === 'string' && replacement !== 'legacy') {
    if (!spells2024.some((candidate) => candidate.id === replacement)) {
      errors.push(`2024/${spell.id}: unknown replacement spell ${replacement}`)
    }
    if (spell.rulesets?.['2014'] !== true) {
      errors.push(`2024/${spell.id}: replaced spell must remain available in 2014`)
    }
  }
}
console.log(
  `2024: ${legacySpells.length} explicitly marked Legacy spells from additional data available`,
)

const incomplete2014Translations = [
  ...readJson('src/data/srd/2014/class-features.json').filter((feature) => {
    const translation = readJson('src/data/srd/2014/locales/de/class-features.json')[feature.id]
    return !translation?.name?.trim() || !translation?.description?.trim()
  }),
  ...additionalClassFeatures.filter((feature) => feature.rulesets?.['2014'] === true && (!feature.names?.de?.trim() || !feature.descriptions?.de?.trim())),
]
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
