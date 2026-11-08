import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const readText = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')
const readJson = (path) => JSON.parse(readText(path))

function extractSubclassOptions(source, ruleset, nextRuleset) {
  const start = source.indexOf("'" + ruleset + "': {")
  const endMarker = nextRuleset ? "\n  },\n  '" + nextRuleset + "':" : '\n  },\n}'
  const end = source.indexOf(endMarker, start)
  assert.notEqual(start, -1, 'missing ' + ruleset + ' options block')
  assert.notEqual(end, -1, 'unterminated ' + ruleset + ' options block')

  const block = source.slice(start, end)
  const matches = [...block.matchAll(/^\s{4}([a-z_]+): \[/gm)]
  return Object.fromEntries(
    matches.map((match, index) => {
      const section = block.slice(match.index, matches[index + 1]?.index ?? block.length)
      return [match[1], [...section.matchAll(/\{ value: '([^']+)'/g)].map((item) => item[1])]
    }),
  )
}

const classSource = readText('../src/domain/classes.ts')
const featureSource = readText('../src/domain/classFeatures.ts')
const options2014 = extractSubclassOptions(classSource, '2014', '2024')
const options2024Native = extractSubclassOptions(classSource, '2024')
const replacements = {
  barbarian: ['totemwarrior'],
  monk: ['four_elements'],
  sorcerer: ['aberrantmind'],
  wizard: ['abjuration', 'divination', 'illusion'],
}
const options2024 = Object.fromEntries(
  Object.entries(options2024Native).map(([classId, current]) => {
    const replaced = new Set(replacements[classId] ?? [])
    const legacy = (options2014[classId] ?? []).filter(
      (id) => !current.includes(id) && !replaced.has(id),
    )
    return [classId, [...current, ...legacy]]
  }),
)

test('2014 and 2024 subclass catalogs stay distinct, with compatible legacy choices in 2024', () => {
  assert.ok(options2014.sorcerer.includes('shadowmagic'))
  assert.ok(options2024.sorcerer.includes('shadowmagic'))
  assert.ok(options2014.sorcerer.includes('aberrantmind'))
  assert.ok(!options2024.sorcerer.includes('aberrantmind'))
  assert.ok(options2024.sorcerer.includes('aberrant'))
  assert.ok(options2024.wizard.includes('conjuration'))
  assert.ok(!options2024.wizard.includes('abjuration'))
  assert.ok(options2014.wizard.includes('abjuration'))
})

test('all selectable subclasses have feature records in their own ruleset catalog', () => {
  for (const ruleset of ['2014', '2024']) {
    const records = [
      ...readJson('../src/data/class-features-' + ruleset + '.json'),
      ...readJson('../src/data/class-features-supplemental-' + ruleset + '.json'),
    ]
    for (const [classId, subclassIds] of Object.entries(
      ruleset === '2014' ? options2014 : options2024,
    )) {
      for (const subclassId of subclassIds) {
        assert.ok(
          records.some(
            (feature) => feature.classId === classId && feature.subclassId === subclassId,
          ),
          ruleset + ': missing feature data for ' + classId + '/' + subclassId,
        )
      }
    }
  }
})

test('2024 legacy feature copies keep their source and start no earlier than subclass level 3', () => {
  const legacy = readJson('../src/data/class-features-supplemental-2024.json').filter((feature) =>
    feature.id.startsWith('2024-legacy-'),
  )
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
          ? spell.rulesets.includes(ruleset)
          : sourceRulesets.get(spell.contentSourceId) === ruleset,
      ),
    ]
    const spellIds = new Set(spells.map((spell) => spell.id))
    const features = [
      ...readJson('../src/data/class-features-' + ruleset + '.json'),
      ...readJson('../src/data/class-features-supplemental-' + ruleset + '.json'),
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
