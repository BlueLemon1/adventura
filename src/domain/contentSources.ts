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
 * have been checked. Their source texts remain copyrighted; Adventura stores
 * factual metadata and independently written summaries, not copied descriptions.
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
  scag2015: {
    id: 'scag-2015',
    name: "Sword Coast Adventurer's Guide",
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2015',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/scag',
    availableLocales: ['en', 'de'],
  },
  xge2017: {
    id: 'xge-2017',
    name: "Xanathar's Guide to Everything",
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2017',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/xgte',
    availableLocales: ['en', 'de'],
  },
  tce2020: {
    id: 'tce-2020',
    name: "Tasha's Cauldron of Everything",
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2020',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/tce',
    availableLocales: ['en', 'de'],
  },
  scc2021: {
    id: 'scc-2021',
    name: 'Strixhaven: A Curriculum of Chaos',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2021',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/scc',
    availableLocales: ['en'],
  },
  ftd2021: {
    id: 'ftd-2021',
    name: "Fizban's Treasury of Dragons",
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2021',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/ftod',
    availableLocales: ['en'],
  },
  egw2020: {
    id: 'egw-2020',
    name: "Explorer's Guide to Wildemount",
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2020',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/egw',
    availableLocales: ['en'],
  },
  ai2019: {
    id: 'ai-2019',
    name: 'Acquisitions Incorporated',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2019',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/ai',
    availableLocales: ['en'],
  },
  ggr2018: {
    id: 'ggr-2018',
    name: "Guildmasters' Guide to Ravnica",
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2018',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/ggr',
    availableLocales: ['en'],
  },
  aag2022: {
    id: 'aag-2022',
    name: "Astral Adventurer's Guide",
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2022',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/aag',
    availableLocales: ['en'],
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
