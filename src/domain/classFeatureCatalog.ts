import type {
  ContentLocale,
  ContentProvenance,
  LocalizedContentText,
} from './contentSources'
import type { Dnd5eRuleset } from './rules'

/**
 * A normalized, edition-specific class feature imported from an SRD source.
 * The canonical ID is stable across locales; localized text is stored on the
 * same record so translations can never become duplicate features.
 */
export interface ClassFeatureRecord {
  id: string
  ruleset: Dnd5eRuleset
  contentSourceId: ContentProvenance['contentSourceId']
  sourceReference?: string
  classId: string
  subclassId?: string
  featureType: 'class' | 'subclass'
  level: number
  names: Partial<Record<ContentLocale, string>>
  descriptions: Partial<Record<ContentLocale, string>>
  /** Canonical spell IDs explicitly granted by this feature, if any. */
  grantedSpellIds?: string[]
}

/** A locale-aware text result that preserves missing translations as missing. */
export interface ResolvedClassFeatureText {
  name?: string
  description?: string
  locale: ContentLocale
  isComplete: boolean
}

export function resolveClassFeatureText(
  feature: ClassFeatureRecord,
  locale: ContentLocale,
): ResolvedClassFeatureText {
  const name = feature.names[locale]
  const description = feature.descriptions[locale]

  return {
    name,
    description,
    locale,
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

    if (feature.ruleset !== ruleset) {
      errors.push(`${location}: ruleset ${feature.ruleset} does not match ${ruleset}`)
    }
    if (feature.contentSourceId !== contentSourceId) {
      errors.push(`${location}: source ${feature.contentSourceId} does not match ${contentSourceId}`)
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
  }

  return errors
}
