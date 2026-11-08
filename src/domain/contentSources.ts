import type { Dnd5eRuleset } from './rules'

export type ContentSourceKind = 'official-srd' | 'supplement' | 'homebrew' | 'character' | 'item'

export type ContentLocale = 'en' | 'de'

export interface ContentSource {
  id: string
  name: string
  abbreviation: string
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
    abbreviation: 'SRD 5.1',
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
    abbreviation: 'SRD 5.2.1',
    kind: 'official-srd',
    ruleset: '2024',
    sourceVersion: '5.2.1',
    publisher: 'Wizards of the Coast',
    license: 'CC-BY-4.0',
    sourceUrl: 'https://www.dndbeyond.com/srd',
    availableLocales: ['en', 'de'],
  },
  phb2014: {
    id: 'phb-2014',
    name: "Player's Handbook (2014)",
    abbreviation: 'PHB',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2014',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/phb-2014',
    availableLocales: ['en', 'de'],
  },
  phb2024: {
    id: 'phb-2024',
    name: "Player's Handbook (2024)",
    abbreviation: 'PHB',
    kind: 'supplement',
    ruleset: '2024',
    sourceVersion: '2024',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/phb',
    availableLocales: ['en'],
  },
  scag2015: {
    id: 'scag-2015',
    name: "Sword Coast Adventurer's Guide",
    abbreviation: 'SCAG',
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
    abbreviation: 'XGE',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2017',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/xgte',
    availableLocales: ['en', 'de'],
  },
  wgte2018: {
    id: 'wgte-2018',
    name: 'Wayfinder’s Guide to Eberron',
    abbreviation: 'WGtE',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2018',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/wgte',
    availableLocales: ['en'],
  },
  erlw2019: {
    id: 'erlw-2019',
    name: 'Eberron: Rising from the Last War',
    abbreviation: 'ERLW',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2019',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/erftlw',
    availableLocales: ['en'],
  },
  tce2020: {
    id: 'tce-2020',
    name: "Tasha's Cauldron of Everything",
    abbreviation: 'TCE',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2020',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/tcoe',
    availableLocales: ['en', 'de'],
  },
  efota2025: {
    id: 'efota-2025',
    name: 'Eberron: Forge of the Artificer',
    abbreviation: 'EFA',
    kind: 'supplement',
    ruleset: '2024',
    sourceVersion: '2025',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/efota',
    availableLocales: ['en'],
  },
  mot2020: {
    id: 'mot-2020',
    name: 'Mythic Odysseys of Theros',
    abbreviation: 'MOoT',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2020',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/moot',
    availableLocales: ['en'],
  },
  vrgtr2021: {
    id: 'vrgtr-2021',
    name: "Van Richten's Guide to Ravenloft",
    abbreviation: 'VRGtR',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2021',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/vrgtr',
    availableLocales: ['en'],
  },
  dmg2014: {
    id: 'dmg-2014',
    name: "Dungeon Master's Guide (2014)",
    abbreviation: 'DMG',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2014',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/dmg-2014',
    availableLocales: ['en', 'de'],
  },
  bigby2023: {
    id: 'bigby-2023',
    name: 'Bigby Presents: Glory of the Giants',
    abbreviation: 'BPGG',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2023',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/bpgotg',
    availableLocales: ['en'],
  },
  dsotdq2022: {
    id: 'dsotdq-2022',
    name: 'Dragonlance: Shadow of the Dragon Queen',
    abbreviation: 'DSotDQ',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2022',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/dsotdq',
    availableLocales: ['en'],
  },
  scc2021: {
    id: 'scc-2021',
    name: 'Strixhaven: A Curriculum of Chaos',
    abbreviation: 'SCC',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2021',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/sacoc',
    availableLocales: ['en', 'de'],
  },
  ftd2021: {
    id: 'ftd-2021',
    name: "Fizban's Treasury of Dragons",
    abbreviation: 'FTD',
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
    abbreviation: 'EGW',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2020',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/egtw',
    availableLocales: ['en'],
  },
  ai2019: {
    id: 'ai-2019',
    name: 'Acquisitions Incorporated',
    abbreviation: 'AI',
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
    abbreviation: 'GGR',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2018',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/ggtr',
    availableLocales: ['en'],
  },
  aag2022: {
    id: 'aag-2022',
    name: "Astral Adventurer's Guide",
    abbreviation: 'AAG',
    kind: 'supplement',
    ruleset: '2014',
    sourceVersion: '2022',
    publisher: 'Wizards of the Coast',
    sourceUrl: 'https://www.dndbeyond.com/sources/dnd/sais/aag',
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

/** Short source label for compact spell lists and spellbook cards. */
export function getContentSourceAbbreviation(sourceId?: string): string | undefined {
  if (!sourceId) return undefined
  return Object.values(CONTENT_SOURCES).find((source) => source.id === sourceId)?.abbreviation
}
