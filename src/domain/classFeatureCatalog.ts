import type { ContentLocale, ContentProvenance } from './contentSources'
import type { Dnd5eRuleset } from './rules'

/**
 * A normalized, edition-specific class feature from an official or custom source.
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
  /** Translation status for non-source locales; omitted means official/source-verified. */
  translationStatus?: Partial<Record<ContentLocale, 'official' | 'unofficial'>>
  /** Canonical spell IDs explicitly granted by this feature, if any. */
  grantedSpellIds?: string[]
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

    if (feature.ruleset !== ruleset) {
      errors.push(`${location}: ruleset ${feature.ruleset} does not match ${ruleset}`)
    }
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
