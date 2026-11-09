import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const readText = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')
const readJson = (path) => JSON.parse(readText(path))

const featureSource = readText('../src/domain/classFeatures.ts')
const classes = readJson('../src/data/classes-additional.json')
const additionalFeatures = readJson('../src/data/class-features-additional.json')

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

test('all selectable subclasses have feature records in their ruleset catalog', () => {
  for (const ruleset of ['2014', '2024']) {
    const records = [
      ...readJson('../src/data/class-features-' + ruleset + '.json'),
      ...additionalFeatures.filter((feature) => feature.rulesets?.[ruleset] === true || feature.rulesets?.[ruleset] === 'legacy'),
    ]
    for (const subclass of subclassOptions(ruleset)) {
      assert.ok(records.some((feature) => feature.classId === subclass.classId && feature.subclassId === subclass.subclassId),
        ruleset + ': missing feature data for ' + subclass.classId + '/' + subclass.subclassId)
    }
  }
})

test('2024 legacy feature copies keep their source and start no earlier than subclass level 3', () => {
  const legacy = additionalFeatures.filter((feature) => feature.rulesets?.['2024'] === 'legacy')
  assert.ok(legacy.length > 0)
  assert.ok(legacy.every((feature) => feature.level >= 3))
  assert.ok(legacy.every((feature) => feature.contentSourceId && feature.sourceReference))
  assert.ok(legacy.every((feature) => feature.names?.en && feature.names?.de))
  assert.ok(legacy.every((feature) => feature.descriptions?.en && feature.descriptions?.de))
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
      ...additionalFeatures.filter((feature) => feature.rulesets?.[ruleset] === true || feature.rulesets?.[ruleset] === 'legacy'),
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
