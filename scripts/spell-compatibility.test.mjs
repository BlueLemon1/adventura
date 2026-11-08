import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const readText = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')
const readJson = (path) => JSON.parse(readText(path))
const normalize = (spell) =>
  (spell.englishName ?? spell.name)
    .normalize('NFKD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

const additional = readJson('../src/data/spells-additional.json')
const spells2014 = readJson('../src/data/spells-2014.json')
const spells2024 = readJson('../src/data/spells-2024.json')
const manifest = readJson('../src/data/spell-compatibility-2024.json')
const compatibilityById = new Map(manifest.entries.map((entry) => [entry.spellId, entry]))
const legacySpells = additional.filter(
  (spell) => compatibilityById.get(spell.id)?.status === 'legacy',
)
const catalogSource = readText('../src/domain/spellCatalog.ts')

test('every supplemental 2014 spell has an explicit 2024 compatibility decision', () => {
  assert.equal(additional.length, 151)
  assert.equal(manifest.entries.length, additional.length + 2)
  assert.ok(additional.every((spell) => compatibilityById.has(spell.id)))
  assert.equal(legacySpells.length, 118)
  assert.ok(legacySpells.every((spell) => !spell.rulesets?.includes('2024')))
  assert.match(catalogSource, /compatibilityBySpellId\.get\(spell\.id\)\?\.status === 'legacy'/)
  assert.match(catalogSource, /legacy: true/)
})

test('shared supplements stay current and PHB 2024 replacements never become Legacy', () => {
  const shared = manifest.entries.filter((entry) => entry.status === 'shared')
  const replaced = manifest.entries.filter((entry) => entry.status === 'replaced')
  assert.equal(shared.length, 14)
  assert.ok(
    shared.every((entry) =>
      additional.find((spell) => spell.id === entry.spellId)?.rulesets?.includes('2024'),
    ),
  )
  assert.equal(replaced.length, 21)
  assert.ok(replaced.every((entry) => !legacySpells.some((spell) => spell.id === entry.spellId)))
  for (const entry of replaced) {
    if (entry.replacementSpellId) {
      assert.ok(spells2024.some((spell) => spell.id === entry.replacementSpellId))
    } else {
      assert.ok(entry.replacementName)
      assert.equal(entry.replacementSource, 'phb-2024')
    }
  }
})

test('renamed 2014 SRD spells resolve to their 2024 SRD replacements', () => {
  const branding = compatibilityById.get('srd-2014-branding-smite')
  const feeblemind = compatibilityById.get('srd-2014-feeblemind')
  assert.equal(branding?.replacementSpellId, 'srd-2024-shining-smite')
  assert.equal(feeblemind?.replacementSpellId, 'srd-2024-befuddlement')
  assert.match(catalogSource, /compatibility\.replacementSpellId/)
})

test('legacy spell IDs from 2014 can resolve for 2024 characters', () => {
  assert.match(catalogSource, /sourceRuleset === '2014'/)
  assert.match(catalogSource, /ruleset === '2024' && sourceRuleset === '2014'/)
})
