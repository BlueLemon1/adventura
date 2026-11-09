import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const readText = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')
const readJson = (path) => JSON.parse(readText(path))
const additional = readJson('../src/data/spells-additional.json')
const mechanics = readJson('../src/data/spell-mechanics.json')
const availability = readJson('../src/data/spell-availability.json')
const spells2014 = readJson('../src/data/spells-2014.json')
const spells2024 = readJson('../src/data/spells-2024.json')
const catalogSource = readText('../src/domain/spellCatalog.ts')
const srdSpellsWithDamage = [...spells2014, ...spells2024].filter((spell) => spell.damage?.length)
const damageTypeNames = {
  Säure: 'acid', Wucht: 'bludgeoning', Kälte: 'cold', Feuer: 'fire', Energie: 'force',
  Blitz: 'lightning', Nekrotisch: 'necrotic', Stich: 'piercing', Gift: 'poison',
  Psychisch: 'psychic', Strahlend: 'radiant', Hieb: 'slashing', Schall: 'thunder',
}
const normalizeSrdDamage = (damage) => damage.map((part) => ({
  dice: part.dice.replace(/(\d)W(?=\d)/gi, '$1d'),
  average: part.average,
  ...(part.type ? { type: damageTypeNames[part.type] ?? part.type.toLowerCase() } : {}),
}))

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
  assert.ok(catalogSource.includes('damage: mechanicsBySpellId[spell.id] ?? spell.damage'))
  assert.ok(catalogSource.includes('damage: mechanicsBySpellId[spell.id] ?? spell.damage'))
})

test('legacy records are explicitly marked when selected for 2024', () => {
  assert.ok(catalogSource.includes('damage: mechanicsBySpellId[spell.id] ?? spell.damage'))
  assert.ok(catalogSource.includes('damage: mechanicsBySpellId[spell.id] ?? spell.damage'))
})

test('spell mechanics and availability exceptions are normalized into ID-keyed metadata', () => {
  const ids = new Set(additional.map((spell) => spell.id))
  assert.equal(Object.keys(mechanics).length, 254)
  assert.ok(Object.values(mechanics).flat().every((entry) => !entry.type || entry.type === entry.type.toLowerCase()))
  assert.equal(Object.keys(availability).length, 21)
  const allSpellIds = new Set([...ids, ...spells2014.map((spell) => spell.id), ...spells2024.map((spell) => spell.id)])
  assert.ok(Object.keys(mechanics).every((id) => allSpellIds.has(id)))
  assert.equal(srdSpellsWithDamage.length, 170)
  assert.ok(srdSpellsWithDamage.every((spell) => mechanics[spell.id]))
  for (const spell of srdSpellsWithDamage) {
    assert.deepEqual(mechanics[spell.id], normalizeSrdDamage(spell.damage), `${spell.id} damage metadata matches its SRD description data`)
  }
  assert.ok(catalogSource.includes('damage: mechanicsBySpellId[spell.id] ?? spell.damage'))
  assert.ok(Object.keys(availability).every((id) => ids.has(id)))
  assert.ok(additional.every((spell) => !('damage' in spell)))
  assert.ok(additional.every((spell) => !('rulesetClasses' in spell)))
  assert.ok(additional.every((spell) => !('subclassRestriction' in spell)))
  assert.ok(additional.every((spell) => !('availabilityNote' in spell)))
  assert.ok(additional.every((spell) => !('classes' in (spell.localized ?? {}))))
})
