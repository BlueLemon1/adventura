import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const readText = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')
const readJson = (path) => JSON.parse(readText(path))
const additional = readJson('../src/data/spells/spells-additional.json')
const mechanics = readJson('../src/data/spells/spell-mechanics.json')
const availability = readJson('../src/data/spells/spell-availability.json')
const spells2014 = readJson('../src/data/spells/spells-2014.json')
const spells2024 = readJson('../src/data/spells/spells-2024.json')
const catalogSource = readText('../src/domain/spellCatalog.ts')
const srdSpellIds = new Set([...spells2014, ...spells2024].map((spell) => spell.id))

test('additional spells declare ruleset availability directly', () => {
  assert.equal(additional.length, 171)
  assert.ok(additional.every((spell) => spell.rulesets && !Array.isArray(spell.rulesets)))
  assert.ok(additional.every((spell) => Object.entries(spell.rulesets).every(([ruleset, value]) =>
    ['2014', '2024'].includes(ruleset) && (value === true || value === 'legacy' || typeof value === 'string'),
  )))
  assert.equal(additional.filter((spell) => spell.rulesets['2024'] === 'legacy').length, 118)
  assert.equal(additional.filter((spell) => spell.rulesets['2024'] === true && spell.rulesets['2014'] === true).length, 14)
  assert.equal(additional.filter((spell) => typeof spell.rulesets['2024'] === 'string' && spell.rulesets['2024'] !== 'legacy').length, 19)
})

test('replacement IDs point to selectable 2024 spells', () => {
  const ids = new Set([...spells2024, ...additional.filter((spell) => spell.rulesets['2024'] === true)].map((spell) => spell.id))
  const replaced = additional.filter((spell) => typeof spell.rulesets['2024'] === 'string' && spell.rulesets['2024'] !== 'legacy')
  assert.ok(replaced.every((spell) => ids.has(spell.rulesets['2024'])), 'every replacement target exists in the 2024 catalogue')
})

test('the new PHB 2024 records are represented as 2024-only additions', () => {
  const phbSpells = additional.filter((spell) => spell.contentSourceId === 'phb-2024')
  assert.equal(phbSpells.length, 20)
  assert.ok(phbSpells.every((spell) => spell.rulesets['2024'] === true && !spell.rulesets['2014']))
  assert.ok(phbSpells.every((spell) => spell.descriptionKind === 'original-summary'))
  assert.ok(phbSpells.every((spell) => spell.localized?.name && spell.localized?.description))
})

test('renamed 2014 SRD spell IDs resolve to their 2024 counterparts without editing SRD data', () => {
  assert.ok(spells2014.some((spell) => spell.id === 'srd-2014-branding-smite'))
  assert.ok(spells2014.some((spell) => spell.id === 'srd-2014-feeblemind'))

})

test('legacy records are explicitly marked when selected for 2024', () => {

  assert.ok(catalogSource.includes('damage: mechanicsBySpellId[spell.id]'))
})

test('spell mechanics and availability exceptions are normalized into ID-keyed metadata', () => {
  const ids = new Set(additional.map((spell) => spell.id))
  assert.equal(Object.keys(mechanics).length, 278)
  assert.ok(Object.values(mechanics).flat().every((entry) => !entry.type || entry.type === entry.type.toLowerCase()))
  assert.equal(Object.keys(availability).length, 21)
  const allSpellIds = new Set([...ids, ...spells2014.map((spell) => spell.id), ...spells2024.map((spell) => spell.id)])
  assert.ok(Object.keys(mechanics).every((id) => allSpellIds.has(id)))
  const srdMechanicIds = Object.keys(mechanics).filter((id) => srdSpellIds.has(id))
  assert.equal(srdMechanicIds.length, 192)
  assert.ok(srdMechanicIds.every((id) => mechanics[id]?.length > 0))
  assert.ok([...spells2014, ...spells2024].every((spell) => !('damage' in spell)))
  assert.ok(catalogSource.includes('damage: mechanicsBySpellId[spell.id]'))
  assert.ok(Object.keys(availability).every((id) => ids.has(id)))
  assert.ok(additional.every((spell) => !('damage' in spell)))
  assert.ok(additional.every((spell) => !('rulesetClasses' in spell)))
  assert.ok(additional.every((spell) => !('subclassRestriction' in spell)))
  assert.ok(additional.every((spell) => !('availabilityNote' in spell)))
  assert.ok(additional.every((spell) => !('classes' in (spell.localized ?? {}))))
})

test('spell mechanics model conditional, recurring, and scaled damage separately', () => {
  const toll = mechanics['phb-2024-toll-the-dead']
  assert.deepEqual(toll.map((entry) => entry.dice), ['1d8', '1d12'])
  assert.ok(toll.every((entry) => entry.condition))
  const vitriolic = mechanics['xge-2014-vitriolic-sphere']
  assert.deepEqual(vitriolic.map((entry) => entry.dice), ['10d4', '5d4'])
  assert.deepEqual(vitriolic.map((entry) => entry.timing), ['Initial damage', "End of the target's next turn"])
  assert.ok(vitriolic.every((entry) => entry.scaling?.[0]?.kind === 'spell-slot'))
  assert.equal(mechanics['srd-2014-magic-missile'][0].scaling[0].mode, 'add-instance')
  assert.equal(mechanics['srd-2014-eldritch-blast'][0].scaling[0].kind, 'character-level')
  assert.equal(mechanics['srd-2024-resistance'][0].modifier, 'damage-reduction')
  assert.ok(Object.values(mechanics).flat().every((entry) => !['extra', 'less'].includes(entry.type)))
})
