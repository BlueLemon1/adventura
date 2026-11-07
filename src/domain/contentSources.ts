import type { Dnd5eRuleset } from './rules'

export type ContentSourceKind = 'official-srd' | 'supplement' | 'homebrew' | 'character' | 'item'

export type ContentLocale = 'en' | 'de'

export interface ContentSource {
  id: string
  name: string
  kind: ContentSourceKind
  ruleset: Dnd5eRuleset
  sourceVersion: string
  publisher: string
  license?: string
  sourceUrl: string
  availableLocales: ContentLocale[]
}

/**
 * Sources are deliberately explicit. A content record must reference one source;
 * it must never be inferred from its name or from the character's ruleset.
 *
 * Supplement entries are added here only when their provenance and usage rights
 * have been verified. This registry currently contains SRD sources only.
 */
export const CONTENT_SOURCES = {
  srd51: {
    id: 'srd-5.1',
    name: 'System Reference Document 5.1',
    kind: 'official-srd',
    ruleset: '2014',
    sourceVersion: '5.1',
    publisher: 'Wizards of the Coast',
    license: 'CC-BY-4.0',
    sourceUrl: 'https://dnd.wizards.com/resources/systems-reference-document',
    availableLocales: ['en', 'de'],
  },
  srd521: {
    id: 'srd-5.2.1',
    name: 'System Reference Document 5.2.1',
    kind: 'official-srd',
    ruleset: '2024',
    sourceVersion: '5.2.1',
    publisher: 'Wizards of the Coast',
    license: 'CC-BY-4.0',
    sourceUrl: 'https://www.dndbeyond.com/srd',
    availableLocales: ['en', 'de'],
  },
} as const satisfies Record<string, ContentSource>

export type SrdContentSourceId = (typeof CONTENT_SOURCES)[keyof typeof CONTENT_SOURCES]['id']

export interface ContentProvenance {
  /** Stable canonical identifier within the source edition, independent of locale. */
  sourceId: string
  /** The exact source document/release that supplied this record. */
  contentSourceId: string
  ruleset: Dnd5eRuleset
  /** Locale of the source text, not the current UI language. */
  locale: ContentLocale
}

export interface LocalizedContentText {
  name: string
  description?: string
}

/**
 * Content added by a player, item, campaign, or a non-SRD book is not SRD
 * content. Keep its source kind and source reference visible to the UI.
 */
export interface AdditionalContentSource {
  id: string
  name: string
  kind: Exclude<ContentSourceKind, 'official-srd'>
  ruleset: Dnd5eRuleset
  publisher?: string
  sourceUrl?: string
  license?: string
}
