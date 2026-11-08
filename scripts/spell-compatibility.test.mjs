import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const readText = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')
const readJson = (path) => JSON.parse(readText(path))
const normalize = (spell) =>
  (spell.englishName ?? spell.name)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

const sourceText = readText('../src/domain/contentSources.ts')
const sourceRulesets = new Map(
  [...sourceText.matchAll(/id: '([^']+)'[\s\S]*?ruleset: '(2014|2024)'/g)].map((match) => [
    match[1],
    match[2],
  ]),
)
const additional = readJson('../src/data/spells-additional.json')
const spells2014 = [
  ...readJson('../src/data/spells-2014.json'),
  ...additional.filter((spell) =>
    spell.rulesets
      ? spell.rulesets.includes('2014')
      : sourceRulesets.get(spell.contentSourceId) === '2014',
  ),
]
const spells2024 = [
  ...readJson('../src/data/spells-2024.json'),
  ...additional.filter((spell) =>
    spell.rulesets
      ? spell.rulesets.includes('2024')
      : sourceRulesets.get(spell.contentSourceId) === '2024',
  ),
]
const currentNames = new Set(spells2024.map(normalize))
const replacedNames = new Set(['brandingsmite', 'feeblemind'])
const legacySpells = spells2014.filter((spell) => {
  const name = normalize(spell)
  return !currentNames.has(name) && !replacedNames.has(name)
})
const catalogSource = readText('../src/domain/spellCatalog.ts')

test('2024 catalog includes unrevised 2014 spells without duplicating current spells', () => {
  assert.ok(legacySpells.length > 0)
  assert.ok(legacySpells.every((spell) => !currentNames.has(normalize(spell))))
  assert.ok(legacySpells.every((spell) => sourceRulesets.get(spell.contentSourceId) === '2014'))
  assert.match(catalogSource, /getSpellCatalog\('2014'\)/)
  assert.match(catalogSource, /legacy: true/)
  assert.match(catalogSource, /replacedLegacySpellNames/)
})

test('2014 spells replaced by new 2024 names are not carried forward unchanged', () => {
  assert.ok(!legacySpells.some((spell) => replacedNames.has(normalize(spell))))
  assert.ok(spells2024.some((spell) => normalize(spell) === 'shiningsmite'))
  assert.ok(spells2024.some((spell) => normalize(spell) === 'befuddlement'))
})

test('legacy spell IDs from 2014 can resolve for 2024 characters', () => {
  assert.match(catalogSource, /sourceRuleset === '2014'/)
  assert.match(catalogSource, /ruleset === '2024' && sourceRuleset === '2014'/)
})
