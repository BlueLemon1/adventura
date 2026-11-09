import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const readText = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')
const readJson = (path) => JSON.parse(readText(path))

const featureSource = readText('../src/domain/classFeatures.ts')
const classes = readJson('../src/data/classes-additional.json')
const featureDefinitions = readJson('../src/data/features-additional.json')
const progressions = readJson('../src/data/class-progressions.json')
const definitionsById = new Map(featureDefinitions.map((feature) => [feature.id, feature]))

function featureRecords(ruleset) {
  return progressions.flatMap((progression) => {
    const availability = progression.rulesets?.[ruleset]
    if (availability !== true && availability !== 'legacy') return []
    return [{
      ...definitionsById.get(progression.featureId),
      id: progression.featureId,
      classId: progression.classId,
      subclassId: progression.subclassId,
      featureType: progression.subclassId ? 'subclass' : 'class',
      level: progression.levels?.[ruleset],
      grantedSpellIds: progression.grantedSpellIds?.[ruleset],
      rulesets: { [ruleset]: availability },
    }]
  })
}

function subclassOptions(ruleset) {
  return classes.filter((record) => record.type === 'subclass' &&
    (record.rulesets?.[ruleset] === true || record.rulesets?.[ruleset] === 'legacy'))
}

test('class and subclass availability is declared in the shared catalog', () => {
  assert.ok(classes.some((record) => record.type === 'class' && record.classId === 'artificer'))
  assert.ok(subclassOptions('2014').some((record) => record.classId === 'sorcerer' && record.subclassId === 'shadowmagic'))
  assert.ok(subclassOptions('2024').some((record) => record.classId === 'sorcerer' && record.subclassId === 'shadowmagic' && record.rulesets['2024'] === 'legacy'))
  assert.ok(subclassOptions('2014').some((record) => record.classId === 'sorcerer' && record.subclassId === 'aberrantmind'))
  assert.ok(!subclassOptions('2024').some((record) => record.classId === 'sorcerer' && record.subclassId === 'aberrantmind'))
  assert.ok(subclassOptions('2024').some((record) => record.classId === 'sorcerer' && record.subclassId === 'aberrant'))
  assert.ok(subclassOptions('2024').some((record) => record.classId === 'wizard' && record.subclassId === 'conjuration'))
  assert.ok(!subclassOptions('2024').some((record) => record.classId === 'wizard' && record.subclassId === 'abjuration'))
  assert.ok(classes.some((record) => record.classId === 'wizard' && record.subclassId === 'abjuration' && record.rulesets['2024'] === 'abjurer'))
})

test('Legacy feature definitions are reused with ruleset-specific progression levels', () => {
  const feature = (id) => progressions.find((record) => record.featureId === id)
  const conjurationSavant = feature('2014-wizard-conjuration-conjuration-savant')
  assert.equal(conjurationSavant?.rulesets?.['2014'], true)
  assert.equal(conjurationSavant?.rulesets?.['2024'], 'legacy')
  assert.equal(conjurationSavant?.levels?.['2014'], 2)
  assert.equal(conjurationSavant?.levels?.['2024'], 3)
  assert.equal(featureDefinitions.filter((record) => record.id === '2014-wizard-conjuration-conjuration-savant').length, 1)

  const replaced = feature('2014-barbarian-totemwarrior-totem-spirit')
  assert.equal(replaced?.rulesets?.['2024'], undefined)
  assert.equal(classes.find((record) => record.classId === 'barbarian' && record.subclassId === 'totemwarrior')?.rulesets?.['2024'], 'wildheart')
})

test('all selectable subclasses have feature records in their ruleset catalog', () => {
  for (const ruleset of ['2014', '2024']) {
    const records = [
      ...readJson('../src/data/class-features-' + ruleset + '.json'),
      ...featureRecords(ruleset),
    ]
    for (const subclass of subclassOptions(ruleset)) {
      assert.ok(records.some((feature) => feature.classId === subclass.classId && feature.subclassId === subclass.subclassId),
        ruleset + ': missing feature data for ' + subclass.classId + '/' + subclass.subclassId)
    }
  }
})

test('Legacy subclass features reuse one definition and inherit compatibility from the subclass', () => {
  const legacySubclasses = subclassOptions('2024').filter((record) => record.rulesets?.['2024'] === 'legacy')
  const legacyFeatureProgressions = progressions.filter((record) =>
    record.subclassId && legacySubclasses.some((subclass) =>
      subclass.classId === record.classId && subclass.subclassId === record.subclassId &&
      record.rulesets?.['2024'] === true,
    ),
  )
  const conjurationSavant = progressions.find((record) => record.featureId === '2014-wizard-conjuration-conjuration-savant')
  assert.equal(legacyFeatureProgressions.length, 357)
  assert.ok(legacyFeatureProgressions.every((record) => record.levels?.['2024'] >= 3))
  assert.ok(legacyFeatureProgressions.every((record) => definitionsById.has(record.featureId)))
  assert.equal(conjurationSavant?.levels?.['2014'], 2)
  assert.equal(conjurationSavant?.levels?.['2024'], 3)
  assert.equal(conjurationSavant?.rulesets?.['2024'], true)
  assert.ok(progressions.every((record) => Object.values(record.rulesets ?? {}).every((value) => value !== 'legacy')))
  assert.equal(featureDefinitions.some((feature) => feature.id.startsWith('2024-legacy-')), false)
})

test('every granted spell exists in the matching ruleset spell catalog', () => {
  const sourceText = readText('../src/domain/contentSources.ts')
  const sourceRulesets = new Map(
    [...sourceText.matchAll(/id: '([^']+)'[\s\S]*?ruleset: '(2014|2024)'/g)].map((match) => [
      match[1],
      match[2],
    ]),
  )
  for (const ruleset of ['2014', '2024']) {
    const spells = [
      ...readJson('../src/data/spells-' + ruleset + '.json'),
      ...readJson('../src/data/spells-additional.json').filter((spell) =>
        spell.rulesets
          ? spell.rulesets[ruleset] === true || spell.rulesets[ruleset] === 'legacy'
          : sourceRulesets.get(spell.contentSourceId) === ruleset,
      ),
    ]
    const spellIds = new Set(spells.map((spell) => spell.id))
    const features = [
      ...readJson('../src/data/class-features-' + ruleset + '.json'),
      ...featureRecords(ruleset),
    ]
    for (const feature of features) {
      for (const spellId of feature.grantedSpellIds ?? []) {
        assert.ok(spellIds.has(spellId), ruleset + '/' + feature.id + ': missing spell ' + spellId)
      }
    }
  }
})

test('runtime feature lookup preserves underscore subclass IDs and only adds unlocked feature spells', () => {
  assert.match(featureSource, /const selectedSubclass = character\.subclassId\?\.toLowerCase\(\) \?\? ''/)
  assert.match(featureSource, /feature\.subclassId === selectedSubclass/)
  assert.match(featureSource, /if \(!feature\.unlocked\) return \[\]/)
  assert.match(featureSource, /unlocked: feature\.level <= character\.level/)
})
