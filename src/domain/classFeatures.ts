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
