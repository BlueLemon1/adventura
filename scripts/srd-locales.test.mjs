import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))

for (const ruleset of ['2014', '2024']) {
  test(`${ruleset} SRD locale data stays separate and joins by canonical ID`, () => {
    const spells = readJson(`../src/data/srd/${ruleset}/spells.json`)
    const spellTranslations = readJson(`../src/data/srd/${ruleset}/locales/de/spells.json`)
    const features = readJson(`../src/data/srd/${ruleset}/class-features.json`)
    const featureTranslations = readJson(`../src/data/srd/${ruleset}/locales/de/class-features.json`)
    const spellIds = new Set(spells.map((spell) => spell.id))
    const featureIds = new Set(features.map((feature) => feature.id))

    assert.equal(spellIds.size, spells.length, 'SRD spell IDs must be unique')
    assert.equal(featureIds.size, features.length, 'SRD feature IDs must be unique')
    assert.ok(spells.every((spell) => !('localized' in spell)), 'English SRD spells must not embed locale fields')
    assert.ok(features.every((feature) =>
      Object.keys(feature.names).every((locale) => locale === 'en') &&
      Object.keys(feature.descriptions).every((locale) => locale === 'en'),
    ), 'English SRD features must contain English text only')

    for (const [id, translation] of Object.entries(spellTranslations)) {
      assert.ok(spellIds.has(id), `German spell translation references unknown ID: ${id}`)
      assert.equal(typeof translation.name, 'string')
      assert.ok(translation.name.trim())
      assert.equal(typeof translation.description, 'string')
      assert.ok(translation.description.trim())
      assert.ok(!('classes' in translation), 'Class lists belong to the canonical spell record')
    }

    for (const [id, translation] of Object.entries(featureTranslations)) {
      assert.ok(featureIds.has(id), `German feature translation references unknown ID: ${id}`)
      assert.ok(Object.keys(translation).every((key) => ['name', 'description'].includes(key)))
    }

    assert.equal(Object.keys(spellTranslations).length, spells.length, 'Every SRD spell must have official German text')
  })
}
