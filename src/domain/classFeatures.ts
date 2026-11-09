[36;1mnpm run format && cat src/domain/classFeatureCatalog.ts && printf '\n---CLASSFEATURES---\n' && cat src/domain/classFeatures.ts[0m
shell: /usr/bin/bash -e {0}
##[endgroup]

> adventura@0.1.0 format
> prettier --write "src/**/*.{ts,tsx,css}"

[90msrc/app/App.tsx[39m 177ms (unchanged)
[90msrc/app/CharacterSheet.tsx[39m 110ms (unchanged)
[90msrc/app/CreateCharacterDialog.tsx[39m 23ms (unchanged)
[90msrc/app/FeaturesPage.tsx[39m 42ms (unchanged)
[90msrc/app/i18n.ts[39m 143ms (unchanged)
[90msrc/app/InstallAppButton.tsx[39m 11ms (unchanged)
[90msrc/app/InventoryPage.tsx[39m 59ms (unchanged)
[90msrc/app/LevelUpPage.tsx[39m 7ms (unchanged)
[90msrc/app/OverviewPage.tsx[39m 20ms (unchanged)
[90msrc/app/SpellbookList.tsx[39m 38ms (unchanged)
[90msrc/app/SpellbookPage.tsx[39m 46ms (unchanged)
[90msrc/app/SpellCatalog.tsx[39m 57ms (unchanged)
[90msrc/app/SpellHigherLevel.tsx[39m 4ms (unchanged)
[90msrc/app/SpellSlotTracker.tsx[39m 27ms (unchanged)
[90msrc/app/useAppPreferences.ts[39m 3ms (unchanged)
[90msrc/app/useCharacterCollection.ts[39m 7ms (unchanged)
[90msrc/components/ui/button.tsx[39m 6ms (unchanged)
[90msrc/components/ui/field.tsx[39m 3ms (unchanged)
[90msrc/components/ui/form-field.tsx[39m 4ms (unchanged)
[90msrc/components/ui/page-intro.tsx[39m 2ms (unchanged)
[90msrc/components/ui/panel-header.tsx[39m 3ms (unchanged)
[90msrc/components/ui/segmented-tabs.tsx[39m 4ms (unchanged)
[90msrc/components/ui/select.tsx[39m 7ms (unchanged)
[90msrc/domain/character.ts[39m 9ms (unchanged)
[90msrc/domain/classes.ts[39m 6ms (unchanged)
src/domain/classFeatureCatalog.ts 14ms
src/domain/classFeatures.ts 15ms
[90msrc/domain/contentSources.ts[39m 19ms (unchanged)
[90msrc/domain/rules.ts[39m 5ms (unchanged)
[90msrc/domain/spellcasting.ts[39m 32ms (unchanged)
[90msrc/domain/spellCatalog.ts[39m 21ms (unchanged)
[90msrc/domain/spellLimits.ts[39m 28ms (unchanged)
[90msrc/domain/text.ts[39m 3ms (unchanged)
[90msrc/main.tsx[39m 5ms (unchanged)
[90msrc/storage/backup.ts[39m 40ms (unchanged)
[90msrc/storage/database.ts[39m 22ms (unchanged)
[90msrc/styles/globals.css[39m 291ms (unchanged)
import type { ContentLocale, ContentProvenance } from './contentSources'
import type { Dnd5eRuleset } from './rules'

/**
 * A normalized, edition-specific class feature from an official or custom source.
 * The canonical ID is stable across locales; localized text is stored on the
 * same record so translations can never become duplicate features.
 */
export interface ClassFeatureRecord {
  id: string
  rulesets?: Partial<Record<Dnd5eRuleset, true | 'legacy' | string>>
  contentSourceId: ContentProvenance['contentSourceId']
  sourceReference?: string
  classId: string
  subclassId?: string
  featureType: 'class' | 'subclass'
  level: number
  names: Partial<Record<ContentLocale, string>>
  descriptions: Partial<Record<ContentLocale, string>>
  /** Translation status for non-source locales; omitted means official/source-verified. */
  translationStatus?: Partial<Record<ContentLocale, 'official' | 'unofficial'>>
  /** Canonical spell IDs explicitly granted by this feature, if any. */
  grantedSpellIds?: string[]
}

export interface ClassFeatureDefinition {
  id: string
  contentSourceId: ContentProvenance['contentSourceId']
  sourceReference?: string
  names: Partial<Record<ContentLocale, string>>
  descriptions: Partial<Record<ContentLocale, string>>
  translationStatus?: Partial<Record<ContentLocale, 'official' | 'unofficial'>>
}

/** A feature's placement in a class or subclass progression, independent of its text. */
export interface ClassFeatureProgression {
  featureId: string
  classId: string
  subclassId?: string
  rulesets: Partial<Record<Dnd5eRuleset, true | 'legacy' | string>>
  levels: Partial<Record<Dnd5eRuleset, number>>
  grantedSpellIds?: Partial<Record<Dnd5eRuleset, string[]>>
}

export function buildClassFeatureRecords(
  definitions: readonly ClassFeatureDefinition[],
  progressions: readonly ClassFeatureProgression[],
  ruleset: Dnd5eRuleset,
): ClassFeatureRecord[] {
  const byId = new Map(definitions.map((definition) => [definition.id, definition]))

  return progressions.flatMap((progression) => {
    const availability = progression.rulesets[ruleset]
    const level = progression.levels[ruleset]
    const definition = byId.get(progression.featureId)
    if ((availability !== true && availability !== 'legacy') || !definition || !level) return []

    return [
      {
        ...definition,
        rulesets: { [ruleset]: availability },
        classId: progression.classId,
        ...(progression.subclassId ? { subclassId: progression.subclassId } : {}),
        featureType: progression.subclassId ? ('subclass' as const) : ('class' as const),
        level,
        ...(progression.grantedSpellIds?.[ruleset]?.length
          ? { grantedSpellIds: progression.grantedSpellIds[ruleset] }
          : {}),
      },
    ]
  })
}

/** Text is resolved independently so a missing German field can use English. */
export interface ResolvedClassFeatureText {
  name?: string
  description?: string
  locale: ContentLocale
  nameIsFallback: boolean
  descriptionIsFallback: boolean
  usedFallback: boolean
  isComplete: boolean
}

export function resolveClassFeatureText(
  feature: ClassFeatureRecord,
  locale: ContentLocale,
): ResolvedClassFeatureText {
  const localizedName = feature.names[locale]
  const localizedDescription = feature.descriptions[locale]
  const nameIsFallback = !localizedName && locale !== 'en' && Boolean(feature.names.en)
  const descriptionIsFallback =
    !localizedDescription && locale !== 'en' && Boolean(feature.descriptions.en)
  const name = localizedName ?? (nameIsFallback ? feature.names.en : undefined)
  const description =
    localizedDescription ?? (descriptionIsFallback ? feature.descriptions.en : undefined)

  return {
    name,
    description,
    locale,
    nameIsFallback,
    descriptionIsFallback,
    usedFallback: nameIsFallback || descriptionIsFallback,
    isComplete: Boolean(name && description),
  }
}

/**
 * Validate invariants shared by every imported feature dataset. Source-specific
 * importers should additionally validate the original document structure.
 */
export function validateClassFeatureRecords(
  records: readonly ClassFeatureRecord[],
  ruleset: Dnd5eRuleset,
  contentSourceId: string,
): string[] {
  const errors: string[] = []
  const ids = new Set<string>()

  for (const [index, feature] of records.entries()) {
    const location = `record ${index + 1} (${feature.id || 'missing id'})`

    if (!feature.id.trim()) errors.push(`${location}: missing canonical id`)
    if (ids.has(feature.id)) errors.push(`${location}: duplicate canonical id`)
    ids.add(feature.id)

    if (feature.contentSourceId !== contentSourceId) {
      errors.push(
        `${location}: source ${feature.contentSourceId} does not match ${contentSourceId}`,
      )
    }
    if (!feature.classId.trim()) errors.push(`${location}: missing class id`)
    if (!Number.isInteger(feature.level) || feature.level < 1 || feature.level > 20) {
      errors.push(`${location}: level must be an integer from 1 to 20`)
    }
    if (feature.featureType === 'subclass' && !feature.subclassId?.trim()) {
      errors.push(`${location}: subclass feature is missing subclass id`)
    }
    if (feature.featureType === 'class' && feature.subclassId) {
      errors.push(`${location}: class feature must not specify a subclass id`)
    }
    if (!Object.values(feature.names).some((value) => value?.trim())) {
      errors.push(`${location}: missing localized name`)
    }
    if (!Object.values(feature.descriptions).some((value) => value?.trim())) {
      errors.push(`${location}: missing localized description`)
    }
    if (feature.grantedSpellIds?.some((spellId) => !spellId.trim())) {
      errors.push(`${location}: granted spell IDs must be non-empty strings`)
    }
    if (
      feature.grantedSpellIds &&
      new Set(feature.grantedSpellIds).size !== feature.grantedSpellIds.length
    ) {
      errors.push(`${location}: duplicate granted spell IDs`)
    }
  }

  return errors
}

/**
 * Merge SRD features before supplemental features and keep only the first
 * record for the same class/subclass feature at the same level. This makes
 * SRD text and provenance authoritative whenever a book repeats a feature.
 */
export function mergeClassFeatureRecords(
  srdRecords: readonly ClassFeatureRecord[],
  supplementalRecords: readonly ClassFeatureRecord[],
): ClassFeatureRecord[] {
  const seen = new Set<string>()
  return [...srdRecords, ...supplementalRecords].filter((feature) => {
    const normalizedName = (feature.names.en ?? feature.id)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
    const key = [
      feature.classId,
      feature.subclassId ?? '',
      feature.featureType,
      feature.level,
      normalizedName,
    ].join('|')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

---CLASSFEATURES---
import type { Character } from './character'
import classFeatures2014 from '../data/class-features-2014.json'
import classFeatures2024 from '../data/class-features-2024.json'
import additionalClassFeatureDefinitions from '../data/features-additional.json'
import classProgressions from '../data/class-progressions.json'
import {
  buildClassFeatureRecords,
  mergeClassFeatureRecords,
  resolveClassFeatureText,
  type ClassFeatureDefinition,
  type ClassFeatureProgression,
  type ClassFeatureRecord,
} from './classFeatureCatalog'
import type { ContentLocale } from './contentSources'
import type { Dnd5eRuleset } from './rules'
import featureMechanics from '../data/feature-mechanics.json'

export interface ClassResourceDefinition {
  id: string
  label: string
  maximum: number
  recovery: 'short' | 'long' | 'short-or-long' | 'short-one-or-long'
}

export interface AutomaticClassFeature {
  id: string
  name: string
  localizedName?: string
  level: number
  source: 'class' | 'subclass'
  description?: string
  nameIsFallback?: boolean
  descriptionIsFallback?: boolean
  translationStatus?: 'official' | 'unofficial'
  usedFallback?: boolean
  contentSourceId?: string
  activation?: 'action' | 'bonusAction' | 'reaction' | 'special'
  resourceId?: string
  resourceCost?: number
  spellbookSpellId?: string
  spellbookSpellIds?: string[]
  unlocked: boolean
}

const ADDITIONAL_CLASS_FEATURES = {
  '2014': buildClassFeatureRecords(
    additionalClassFeatureDefinitions as ClassFeatureDefinition[],
    classProgressions as ClassFeatureProgression[],
    '2014',
  ),
  '2024': buildClassFeatureRecords(
    additionalClassFeatureDefinitions as ClassFeatureDefinition[],
    classProgressions as ClassFeatureProgression[],
    '2024',
  ),
}

const CLASS_FEATURE_CATALOGS: Record<Dnd5eRuleset, ClassFeatureRecord[]> = {
  '2014': mergeClassFeatureRecords(
    classFeatures2014 as unknown as ClassFeatureRecord[],
    ADDITIONAL_CLASS_FEATURES['2014'],
  ),
  '2024': mergeClassFeatureRecords(
    classFeatures2024 as unknown as ClassFeatureRecord[],
    ADDITIONAL_CLASS_FEATURES['2024'],
  ),
}

interface FeatureMechanicsRecord {
  activation?: NonNullable<AutomaticClassFeature['activation']>
  resourceId?: string
  resourceCost?: number
  spellbookSpellIdsByRuleset?: Partial<Record<Dnd5eRuleset, string[]>>
}

const FEATURE_MECHANICS = featureMechanics as Record<string, FeatureMechanicsRecord>

function getFeatureMechanics(
  feature: ClassFeatureRecord,
  character: Character,
): FeatureMechanicsRecord & { spellbookSpellIds?: string[] } {
  const name = feature.names.en ?? ''
  const base = FEATURE_MECHANICS[feature.id] ?? {}
  let activation = base.activation
  let resourceId = base.resourceId
  let resourceCost = base.resourceCost

  if (
    (name === 'Frenzy' && character.ruleset === '2024') ||
    (name === 'Favored Enemy' && character.ruleset === '2014')
  ) {
    activation = undefined
    resourceId = undefined
    resourceCost = undefined
  }
  if (name === 'Channel Divinity' && character.classId === 'paladin') {
    resourceId =
      character.ruleset === '2024' ? 'channel-divinity-paladin' : 'paladin-channel-divinity'
  }
  if (name === 'Sacred Weapon' && character.ruleset === '2014') {
    resourceId = 'paladin-channel-divinity'
  }
  if (name === 'Turn the Unholy') resourceId = 'paladin-channel-divinity'
  if (name === 'Flurry of Blows') {
    resourceId = character.ruleset === '2024' ? 'focus-points' : 'ki-points'
  }
  if (name === 'Patient Defense' || name === 'Step of the Wind') {
    resourceId = character.ruleset === '2014' ? 'ki-points' : undefined
  }
  if (name === 'Divine Sense' && character.classId === 'paladin' && character.ruleset === '2024') {
    activation = 'bonusAction'
    resourceId = 'channel-divinity-paladin'
  }
  if (name === 'Dragon Wings') {
    resourceId = character.ruleset === '2024' ? 'dragon-wings' : undefined
  }
  if (name === 'Holy Nimbus') {
    activation = character.ruleset === '2024' ? 'bonusAction' : 'action'
    resourceId = 'holy-nimbus'
  }
  if (name === 'Faithful Steed') {
    activation = 'action'
    resourceId = 'faithful-steed'
  }
  if (name === 'Wild Shape') {
    activation = character.ruleset === '2014' ? 'action' : 'bonusAction'
  }
  if (name === 'Stunning Strike') {
    resourceId = character.ruleset === '2024' ? 'focus-points' : 'ki-points'
  }
  if (name === 'Lay on Hands') {
    activation = character.ruleset === '2014' ? 'action' : 'bonusAction'
  }
  if (name === 'Wholeness of Body') {
    activation = character.ruleset === '2024' ? 'bonusAction' : 'action'
    resourceId = 'wholeness-of-body'
  }
  if (name === 'Quivering Palm') {
    resourceId = character.ruleset === '2024' ? 'focus-points' : 'ki-points'
    resourceCost = character.ruleset === '2024' ? 4 : 3
  }

  return {
    activation,
    resourceId,
    resourceCost,
    spellbookSpellIds: base.spellbookSpellIdsByRuleset?.[character.ruleset],
  }
}

function getImportedClassFeatures(
  character: Character,
  locale: ContentLocale,
  catalog: ClassFeatureRecord[],
): AutomaticClassFeature[] {
  const selectedSubclass = character.subclassId?.toLowerCase() ?? ''

  return catalog
    .filter(
      (feature) =>
        feature.classId === character.classId &&
        (feature.featureType === 'class' ||
          (Boolean(selectedSubclass) && feature.subclassId === selectedSubclass)),
    )
    .map((feature): AutomaticClassFeature => {
      const text = resolveClassFeatureText(feature, locale)
      const mechanics = getFeatureMechanics(feature, character)
      const spellbookSpellIds = [
        ...new Set([...(feature.grantedSpellIds ?? []), ...(mechanics.spellbookSpellIds ?? [])]),
      ]

      return {
        id: feature.id,
        name: feature.names.en ?? feature.id,
        localizedName: text.name,
        level: feature.level,
        source: feature.featureType,
        description: text.description,
        translationStatus: feature.translationStatus?.[locale],
        nameIsFallback: text.nameIsFallback,
        descriptionIsFallback: text.descriptionIsFallback,
        usedFallback: text.usedFallback,
        contentSourceId: feature.contentSourceId,
        activation: mechanics.activation,
        resourceId: mechanics.resourceId,
        resourceCost: mechanics.resourceCost,
        spellbookSpellIds: spellbookSpellIds.length ? spellbookSpellIds : undefined,
        unlocked: feature.level <= character.level,
      }
    })
    .sort((left, right) => left.level - right.level || left.name.localeCompare(right.name))
}

export function getAutomaticClassFeatures(
  character: Character,
  locale: ContentLocale = 'de',
): AutomaticClassFeature[] {
  return getImportedClassFeatures(character, locale, CLASS_FEATURE_CATALOGS[character.ruleset])
}

export function getSpellbookFeatureSpells(
  character: Character,
  locale: ContentLocale = 'de',
): AutomaticClassFeature[] {
  return getAutomaticClassFeatures(character, locale).flatMap((feature) => {
    if (!feature.unlocked) return []
    const spellIds =
      feature.spellbookSpellIds ?? (feature.spellbookSpellId ? [feature.spellbookSpellId] : [])
    return spellIds.map((spellbookSpellId) => ({
      ...feature,
      id: `${feature.id}-${spellbookSpellId}`,
      spellbookSpellId,
    }))
  })
}
