import type { Character } from './character'
import classFeatures2014 from '../data/srd/2014/class-features.json'
import classFeatures2024 from '../data/srd/2024/class-features.json'
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
  /** Unique progression occurrence ID, suitable for UI keys and saved references. */
  id: string
  definitionId?: string
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
  const base = FEATURE_MECHANICS[feature.definitionId ?? feature.id] ?? {}
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
        definitionId: feature.definitionId ?? feature.id,
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

function abilityModifier(score = 10) {
  return Math.floor((score - 10) / 2)
}

export function getClassResources(character: Character): ClassResourceDefinition[] {
  const { classId, level, ruleset } = character
  const resources: ClassResourceDefinition[] = []
  const subclass = character.subclassId?.toLowerCase().replace(/[^a-z]/g, '') ?? ''
  const add = (
    id: string,
    label: string,
    maximum: number,
    recovery: ClassResourceDefinition['recovery'],
  ) => {
    if (maximum > 0) resources.push({ id, label, maximum, recovery })
  }
  if (classId === 'barbarian' && !(ruleset === '2014' && level >= 20)) {
    const maximum =
      ruleset === '2014'
        ? level >= 12
          ? 5
          : level >= 6
            ? 4
            : level >= 3
              ? 3
              : 2
        : level >= 17
          ? 6
          : level >= 12
            ? 5
            : level >= 6
              ? 4
              : level >= 3
                ? 3
                : 2
    add('rage', 'Kampfrausch', maximum, ruleset === '2014' ? 'long' : 'short-one-or-long')
  }
  if (classId === 'bard') {
    add(
      'bardic-inspiration',
      'Bardeninspiration',
      Math.max(1, abilityModifier(character.abilities?.cha)),
      level >= 5 ? 'short-or-long' : 'long',
    )
  }
  if (classId === 'cleric' && level >= 2) {
    const maximum =
      ruleset === '2024'
        ? level >= 18
          ? 4
          : level >= 6
            ? 3
            : 2
        : level >= 18
          ? 3
          : level >= 6
            ? 2
            : 1
    add(
      'channel-divinity',
      'Kanal göttlicher Energie',
      maximum,
      ruleset === '2024' ? 'short-one-or-long' : 'short-or-long',
    )
  }
  if (classId === 'druid' && level >= 2)
    add(
      'wild-shape',
      'Tiergestalt',
      ruleset === '2024' ? (level >= 17 ? 4 : level >= 6 ? 3 : 2) : 2,
      ruleset === '2024' ? 'short-one-or-long' : 'short-or-long',
    )
  if (classId === 'druid' && subclass === 'land' && level >= (ruleset === '2024' ? 6 : 2))
    add('natural-recovery', 'Natürliche Erholung', 1, 'long')
  if (classId === 'cleric' && level >= 10)
    add('divine-intervention', 'Göttliches Eingreifen', 1, 'long')
  if (classId === 'warlock' && subclass === 'fiend' && level >= 6)
    add('dark-ones-own-luck', 'Dunkler eigener Glücksfall', 1, 'short-or-long')
  if (classId === 'fighter' && level >= 1)
    add(
      'second-wind',
      'Zweites Aufatmen',
      ruleset === '2024' ? (level >= 10 ? 4 : level >= 4 ? 3 : 2) : 1,
      ruleset === '2024' ? 'short-one-or-long' : 'short-or-long',
    )
  if (classId === 'fighter' && level >= 2) {
    add('action-surge', 'Aktionsschub', level >= 17 ? 2 : 1, 'short-or-long')
    add('indomitable', 'Unbeugsam', level >= 17 ? 3 : level >= 13 ? 2 : level >= 9 ? 1 : 0, 'long')
  }
  if (classId === 'monk' && level >= 2)
    add(
      ruleset === '2024' ? 'focus-points' : 'ki-points',
      ruleset === '2024' ? 'Fokus-Punkte' : 'Ki-Punkte',
      level,
      'short-or-long',
    )
  if (classId === 'monk' && level >= 6 && subclass === 'openhand')
    add(
      'wholeness-of-body',
      'Ganzheit des Körpers',
      ruleset === '2024' ? Math.max(1, abilityModifier(character.abilities?.wis)) : 1,
      'long',
    )
  if (classId === 'paladin') {
    add('lay-on-hands', 'Handauflegen', 5 * level, 'long')
    if (ruleset === '2014')
      add(
        'divine-sense',
        'Göttlicher Sinn',
        Math.max(1, abilityModifier(character.abilities?.cha) + 1),
        'long',
      )
    if (ruleset === '2014' && level >= 3 && character.subclassId)
      add('paladin-channel-divinity', 'Kanal göttlicher Energie', 1, 'short-or-long')
  }
  if (classId === 'paladin' && ruleset === '2024' && level >= 3)
    add(
      'channel-divinity-paladin',
      'Kanal göttlicher Energie',
      level >= 11 ? 3 : 2,
      'short-one-or-long',
    )
  if (classId === 'paladin' && ruleset === '2024' && level >= 2)
    add('paladin-smite', 'Paladins Niederstrecken', 1, 'long')
  if (classId === 'paladin' && ruleset === '2024' && level >= 5)
    add('faithful-steed', 'Treues Ross', 1, 'long')
  if (classId === 'paladin' && subclass === 'devotion' && level >= 20)
    add('holy-nimbus', 'Heiliger Nimbus', 1, 'long')
  if (classId === 'warlock' && ruleset === '2024' && level >= 9)
    add('contact-patron', 'Patron kontaktieren', 1, 'long')
  if (classId === 'ranger' && ruleset === '2024')
    add(
      'favored-enemy',
      'Bevorzugter Feind',
      level >= 17 ? 6 : level >= 13 ? 5 : level >= 9 ? 4 : level >= 5 ? 3 : 2,
      'long',
    )
  if (classId === 'warlock' && ruleset === '2024' && level >= 2)
    add('magical-cunning', 'Magische List', 1, 'long')
  if (classId === 'sorcerer' && ruleset === '2024')
    add('innate-sorcery', 'Angeborene Magie', 2, 'long')
  if (classId === 'sorcerer' && level >= 2) add('sorcery-points', 'Zauberpunkte', level, 'long')
  if (classId === 'sorcerer' && ruleset === '2024' && subclass === 'draconic' && level >= 18)
    add('dragon-companion', 'Drachengefährte', 1, 'long')
  if (classId === 'sorcerer' && ruleset === '2024' && subclass === 'draconic' && level >= 14)
    add('dragon-wings', 'Drachenflügel', 1, 'long')
  if (classId === 'sorcerer' && ruleset === '2024' && level >= 5)
    add('sorcerous-restoration', 'Zauberhafte Erneuerung', 1, 'long')
  if (classId === 'paladin' && ruleset === '2014' && level >= 14)
    add(
      'cleansing-touch',
      'Reinigende Berührung',
      Math.max(1, abilityModifier(character.abilities?.cha)),
      'long',
    )
  if (classId === 'wizard' && level >= 1) add('arcane-recovery', 'Arkane Erholung', 1, 'long')
  if (classId === 'rogue' && subclass === 'arcanetrickster' && level >= 17)
    add('spell-thief', 'Zauberdieb', 1, 'long')
  if (classId === 'rogue' && level >= 20) add('stroke-of-luck', 'Glückstreffer', 1, 'short-or-long')
  if (classId === 'sorcerer' && subclass === 'shadowmagic' && level >= 1)
    add('strength-of-grave', 'Stärke des Grabes', 1, 'long')
  if (classId === 'warlock' && subclass === 'fiend' && level >= 14)
    add('hurl-through-hell', 'Durch die Hölle schicken', 1, 'long')
  if (classId === 'warlock' && level >= 20) add('eldritch-master', 'Mystischer Meister', 1, 'long')
  return resources
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
